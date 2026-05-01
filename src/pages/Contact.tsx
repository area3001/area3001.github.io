import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";

type DumpCell =
  | { id: string; type: "junk"; value: string }
  | { id: string; type: "word"; value: string }
  | { id: string; type: "pair"; value: string; effect: "dud" | "reset" };

type DumpColumn = {
  baseAddress: number;
  lines: DumpCell[][];
};

type Puzzle = {
  words: string[];
  password: string;
  left: DumpColumn;
  right: DumpColumn;
};

type LogEntry = {
  id: string;
  text: string;
};

const WORD_POOL = [
  "CAPTURE",
  "NETWORK",
  "KERNELS",
  "PACKETS",
  "PROCESS",
  "BINARYS",
  "FIRMWARE",
  "EXPLOITS",
  "OVERRIDE",
  "PROTOCOL",
  "MONITOR",
  "HARDENED",
  "FIREWALL",
  "SCRIPTER",
  "DECRYPTS",
  "PAYLOADS",
  "BACKDOOR",
  "SANDBOX",
  "FORENSIC",
  "MALWARES",
  "OPERATOR",
  "TERMINAL",
  "NETHUNTS",
  "LOCKPICK",
  "DATALINK",
  "SCANNERS",
  "KEYFRAME",
  "CHIPSETS",
];

const ATTEMPTS_MAX = 4;
const WORD_LENGTH = 8;
const DUMP_LINES = 10;
const CELLS_PER_LINE = 4;
const PAIR_COUNT = 8;
const BOOT_DELAY_MS = 280;
const BOOT_LINES = [
  "> INITIALIZING MEMORY MAP...",
  "> SYNCING TERMLINK PROTOCOL...",
  "> READY",
];

const JUNK_CHARS = "!@#$%^&*-+=?/|:;.,_~";
const OPENERS = ["(", "[", "{", "<"] as const;
const CLOSERS: Record<(typeof OPENERS)[number], string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function likenessFor(guess: string, password: string): number {
  let score = 0;
  for (let i = 0; i < guess.length; i += 1) {
    if (guess[i] === password[i]) {
      score += 1;
    }
  }
  return score;
}

function randomInt(maxExclusive: number): number {
  return Math.floor(Math.random() * maxExclusive);
}

function junkString(minLength = 3, maxLength = 6): string {
  const length = minLength + randomInt(maxLength - minLength + 1);
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += JUNK_CHARS[randomInt(JUNK_CHARS.length)];
  }
  return result;
}

function buildPair(index: number): DumpCell {
  const opener = OPENERS[randomInt(OPENERS.length)];
  const closer = CLOSERS[opener];
  const payload = junkString(1, 4);
  return {
    id: `pair-${index}`,
    type: "pair",
    value: `${opener}${payload}${closer}`,
    effect: Math.random() < 0.5 ? "dud" : "reset",
  };
}

function toColumn(cells: DumpCell[], baseAddress: number): DumpColumn {
  const lines: DumpCell[][] = [];
  for (let line = 0; line < DUMP_LINES; line += 1) {
    const start = line * CELLS_PER_LINE;
    lines.push(cells.slice(start, start + CELLS_PER_LINE));
  }

  return { baseAddress, lines };
}

function buildPuzzle(): Puzzle {
  const words = shuffle(WORD_POOL.filter((word) => word.length === WORD_LENGTH)).slice(
    0,
    12
  );
  const password = words[Math.floor(Math.random() * words.length)];

  const pairCells = Array.from({ length: PAIR_COUNT }, (_, index) =>
    buildPair(index)
  );
  const wordCells: DumpCell[] = words.map((word, index) => ({
    id: `word-${index}`,
    type: "word",
    value: word,
  }));

  const totalCells = DUMP_LINES * CELLS_PER_LINE * 2;
  const junkCount = totalCells - wordCells.length - pairCells.length;
  const junkCells: DumpCell[] = Array.from({ length: junkCount }, (_, index) => ({
    id: `junk-${index}`,
    type: "junk",
    value: junkString(),
  }));

  const allCells = shuffle([...wordCells, ...pairCells, ...junkCells]);
  const mid = allCells.length / 2;
  const leftCells = allCells.slice(0, mid);
  const rightCells = allCells.slice(mid);

  return {
    words,
    password,
    left: toColumn(leftCells, 0xf430),
    right: toColumn(rightCells, 0xf4f8),
  };
}

function formatAddress(baseAddress: number, line: number): string {
  return `0x${(baseAddress + line * 0x10).toString(16).toUpperCase()}`;
}

function splitPairValue(value: string): [string, string, string] {
  return [value[0], value.slice(1, -1), value[value.length - 1]];
}

export default function Contact() {
  const [puzzle, setPuzzle] = useState(buildPuzzle);
  const [attemptsLeft, setAttemptsLeft] = useState(ATTEMPTS_MAX);
  const [logs, setLogs] = useState<LogEntry[]>([{ id: "boot", text: "> BOOTING TERMINAL..." }]);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [removedWords, setRemovedWords] = useState<string[]>([]);
  const [usedPairs, setUsedPairs] = useState<string[]>([]);
  const [bootCycle, setBootCycle] = useState(0);
  const [inputReady, setInputReady] = useState(false);
  const [cursorToken, setCursorToken] = useState("_");
  const [activePairId, setActivePairId] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const gameOver = attemptsLeft <= 0 && !unlocked;

  const appendLog = useCallback((text: string) => {
    setLogs((current) => [
      { id: `${Date.now()}-${current.length}`, text },
      ...current,
    ].slice(0, 9));
  }, []);

  const resetGame = () => {
    setPuzzle(buildPuzzle());
    setAttemptsLeft(ATTEMPTS_MAX);
    setLogs([{ id: "boot", text: "> BOOTING TERMINAL..." }]);
    setUsedWords([]);
    setRemovedWords([]);
    setUsedPairs([]);
    setCursorToken("_");
    setActivePairId(null);
    setBootCycle((current) => current + 1);
    setUnlocked(false);
    setSubmitted(false);
  };

  useEffect(() => {
    setInputReady(false);
    setLogs([{ id: `boot-${bootCycle}`, text: "> BOOTING TERMINAL..." }]);

    const timeoutIds: number[] = [];

    BOOT_LINES.forEach((line, index) => {
      const timeoutId = window.setTimeout(() => {
        appendLog(line);
      }, BOOT_DELAY_MS * (index + 1));
      timeoutIds.push(timeoutId);
    });

    const unlockId = window.setTimeout(() => {
      appendLog("> ENTER PASSWORD");
      setInputReady(true);
    }, BOOT_DELAY_MS * (BOOT_LINES.length + 1));
    timeoutIds.push(unlockId);

    return () => {
      for (const id of timeoutIds) {
        window.clearTimeout(id);
      }
    };
  }, [appendLog, bootCycle]);

  const handleGuess = (word: string) => {
    if (
      !inputReady ||
      unlocked ||
      gameOver ||
      usedWords.includes(word) ||
      removedWords.includes(word)
    ) {
      return;
    }

    setUsedWords((current) => [...current, word]);

    if (word === puzzle.password) {
      setUnlocked(true);
      appendLog(`> ${word} / LIKENESS=${WORD_LENGTH}`);
      appendLog("> PASSWORD ACCEPTED. ACCESS GRANTED");
      return;
    }

    const likeness = likenessFor(word, puzzle.password);
    appendLog(`> ${word} / LIKENESS=${likeness}`);
    setAttemptsLeft((current) => Math.max(0, current - 1));
  };

  const handlePair = (pair: Extract<DumpCell, { type: "pair" }>) => {
    if (!inputReady || unlocked || gameOver || usedPairs.includes(pair.id)) {
      return;
    }

    setUsedPairs((current) => [...current, pair.id]);

    if (pair.effect === "reset") {
      setAttemptsLeft(ATTEMPTS_MAX);
      appendLog("> ALLOWANCE REPLENISHED");
      return;
    }

    const candidates = puzzle.words.filter(
      (word) =>
        word !== puzzle.password &&
        !usedWords.includes(word) &&
        !removedWords.includes(word)
    );

    if (candidates.length === 0) {
      appendLog("> NO DUD FOUND");
      return;
    }

    const removed = candidates[randomInt(candidates.length)];
    setRemovedWords((current) => [...current, removed]);
    appendLog("> DUD REMOVED");
  };

  const renderCell = (cell: DumpCell) => {
    if (cell.type === "junk") {
      return <span key={cell.id}>{cell.value}</span>;
    }

    if (cell.type === "word") {
      const isRemoved = removedWords.includes(cell.value);
      const isDisabled =
        isRemoved || usedWords.includes(cell.value) || unlocked || gameOver || !inputReady;

      return (
        <button
          key={cell.id}
          type="button"
          disabled={isDisabled}
          onClick={() => handleGuess(cell.value)}
          onMouseEnter={() => setCursorToken(cell.value)}
          onMouseLeave={() => setCursorToken("_")}
          onFocus={() => setCursorToken(cell.value)}
          onBlur={() => setCursorToken("_")}
          className="cursor-pointer text-left disabled:cursor-not-allowed"
        >
          <span className={isRemoved ? "opacity-40 line-through" : "hover:underline"}>
            {cell.value}
          </span>
        </button>
      );
    }

    const [open, middle, close] = splitPairValue(cell.value);
    const isActivePair = activePairId === cell.id;

    return (
      <button
        key={cell.id}
        type="button"
        disabled={usedPairs.includes(cell.id) || unlocked || gameOver || !inputReady}
        onClick={() => handlePair(cell)}
        onMouseEnter={() => {
          setCursorToken(cell.value);
          setActivePairId(cell.id);
        }}
        onMouseLeave={() => {
          setCursorToken("_");
          setActivePairId(null);
        }}
        onFocus={() => {
          setCursorToken(cell.value);
          setActivePairId(cell.id);
        }}
        onBlur={() => {
          setCursorToken("_");
          setActivePairId(null);
        }}
        className="cursor-pointer text-left hover:underline disabled:cursor-not-allowed disabled:opacity-45"
      >
        <span className={isActivePair ? "hack-bracket-active" : "hack-bracket"}>{open}</span>
        <span>{middle}</span>
        <span className={isActivePair ? "hack-bracket-active" : "hack-bracket"}>{close}</span>
      </button>
    );
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section>
      <h1>Contact Terminal</h1>
      <p>Bypass vault security to unlock the contact form.</p>

      <div className="mt-4 border border-[#7ee089] p-3">
        <p>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</p>
        <p>ATTEMPTS LEFT: {attemptsLeft}</p>
        <p>
          {!inputReady
            ? "STATUS: BOOTING"
            : unlocked
            ? "STATUS: ACCESS GRANTED"
            : gameOver
              ? "STATUS: TERMINAL LOCKED"
              : "STATUS: PASSWORD REQUIRED"}
        </p>
        <p>{">"} CURSOR: {cursorToken}</p>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1">
            {puzzle.left.lines.map((line, lineIndex) => (
              <p key={formatAddress(puzzle.left.baseAddress, lineIndex)} className="flex gap-2">
                <span className="w-20 shrink-0">
                  {formatAddress(puzzle.left.baseAddress, lineIndex)}
                </span>
                <span className="flex flex-wrap gap-x-2">{line.map((cell) => renderCell(cell))}</span>
              </p>
            ))}
          </div>
          <div className="grid gap-1">
            {puzzle.right.lines.map((line, lineIndex) => (
              <p key={formatAddress(puzzle.right.baseAddress, lineIndex)} className="flex gap-2">
                <span className="w-20 shrink-0">
                  {formatAddress(puzzle.right.baseAddress, lineIndex)}
                </span>
                <span className="flex flex-wrap gap-x-2">{line.map((cell) => renderCell(cell))}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-4 border border-[#7ee089]/50 p-2">
          <p>{">"} ATTEMPT LOG</p>
          {logs.map((entry) => (
            <p key={entry.id}>{entry.text}</p>
          ))}
        </div>

        {gameOver ? (
          <button
            type="button"
            onClick={resetGame}
            className="mt-3 cursor-pointer border border-[#7ee089] px-2 py-1"
          >
            RESET TERMINAL
          </button>
        ) : null}
      </div>

      {unlocked ? (
        <form onSubmit={submitForm} className="mt-4 flex flex-col gap-2">
          <label className="flex flex-col gap-1">
            Name
            <input
              required
              name="name"
              type="text"
              className="border border-[#7ee089] bg-black px-2 py-1 text-[#a8ffb5]"
            />
          </label>
          <label className="flex flex-col gap-1">
            Email
            <input
              required
              name="email"
              type="email"
              className="border border-[#7ee089] bg-black px-2 py-1 text-[#a8ffb5]"
            />
          </label>
          <label className="flex flex-col gap-1">
            Message
            <textarea
              required
              name="message"
              rows={5}
              className="border border-[#7ee089] bg-black px-2 py-1 text-[#a8ffb5]"
            />
          </label>
          <button
            type="submit"
            className="w-fit cursor-pointer border border-[#7ee089] px-3 py-1"
          >
            SEND MESSAGE
          </button>
          {submitted ? <p>Message queued. We will get back to you soon.</p> : null}
        </form>
      ) : null}
    </section>
  );
}