import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Seo } from "./components/Seo";
import type { DisplayMode } from "./types";

const MODES: { id: DisplayMode; label: string; description: string }[] = [
  { id: "crt", label: "CRT", description: "Retro phosphor display with scanlines and glow" },
  { id: "bw", label: "B/W TERMINAL", description: "Clean terminal, no phosphor effects" },
  { id: "plain", label: "ACCESSIBLE", description: "Standard layout with system fonts" },
];

function App() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    () => (localStorage.getItem("displayMode") as DisplayMode | null) ?? "crt"
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", displayMode);
  }, [displayMode]);

  useEffect(() => {
    if (!settingsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSettingsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settingsOpen]);

  const applyMode = (mode: DisplayMode) => {
    localStorage.setItem("displayMode", mode);
    setDisplayMode(mode);
    setSettingsOpen(false);
  };

  const isCrt = displayMode === "crt";
  const isPlain = displayMode === "plain";

  const shellWrapClass = isCrt
    ? "min-h-dvh bg-[radial-gradient(circle_at_20%_15%,rgba(22,45,24,0.45),transparent_52%),radial-gradient(circle_at_80%_90%,rgba(14,38,29,0.38),transparent_60%),var(--crt-shell-bg)] font-dos flex items-center justify-center py-4"
    : isPlain
    ? "min-h-dvh bg-white font-sans"
    : "min-h-dvh bg-black font-dos flex items-start justify-center py-0 sm:items-center sm:py-4";

  const bezelClass = isCrt
    ? "w-[min(980px,calc(100%-2rem))] my-4 p-[clamp(0.7rem,2.5vw,1.2rem)] rounded-[1.8rem] bg-[linear-gradient(140deg,var(--crt-bezel-start)_0%,var(--crt-bezel-mid)_42%,var(--crt-bezel-end)_100%)] border border-(--crt-bezel-border) shadow-[0_1.2rem_2rem_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(250,255,249,0.12),inset_0_-0.6rem_1rem_rgba(0,0,0,0.35)] max-sm:w-full max-sm:m-0 max-sm:p-0 max-sm:border-none max-sm:rounded-none max-sm:bg-none max-sm:shadow-none"
    : isPlain
    ? "w-full max-w-2xl mx-auto"
    : "w-full";

  const screenClass = isCrt
    ? "relative overflow-hidden rounded-[2.2rem] border-2 border-[rgba(141,255,162,0.36)] bg-[radial-gradient(ellipse_at_center,rgba(20,45,23,0.18)_0%,rgba(2,8,2,0.96)_68%),var(--crt-screen-base)] shadow-[inset_0_0_2.6rem_rgba(37,255,105,0.14),inset_0_0_0.9rem_rgba(0,0,0,0.82),0_0.2rem_0.7rem_rgba(0,0,0,0.6)] transform-[perspective(1200px)_rotateX(0.8deg)] animate-crt-wobble before:content-[''] before:absolute before:inset-0 before:z-20 before:pointer-events-none before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.01)_48%,rgba(0,0,0,0.25)_100%),repeating-linear-gradient(to_bottom,rgba(181,255,188,0.08)_0px,rgba(181,255,188,0.08)_1px,transparent_1px,transparent_4px),repeating-linear-gradient(to_right,rgba(255,0,0,0.03)_0px,rgba(255,0,0,0.03)_1px,rgba(0,255,255,0.02)_1px,rgba(0,255,255,0.02)_2px,transparent_2px,transparent_3px)] before:mix-blend-screen before:animate-scanline-drift after:content-[''] after:absolute after:inset-0 after:z-30 after:pointer-events-none after:bg-[radial-gradient(circle_at_50%_45%,transparent_35%,rgba(0,0,0,0.38)_100%),radial-gradient(circle_at_8%_0%,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_92%_100%,rgba(255,255,255,0.06),transparent_20%)] max-sm:border-none max-sm:rounded-none max-sm:transform-none max-sm:animate-none max-sm:shadow-none"
    : "relative overflow-hidden rounded-none border-none bg-none shadow-none";

  const contentClass = isCrt
    ? "relative z-10 min-h-[min(78vh,760px)] max-h-[min(78vh,760px)] overflow-y-auto overflow-x-hidden p-[clamp(1rem,3vw,1.7rem)] text-(--crt-text) [text-shadow:0_0_0.35rem_rgba(132,255,143,0.62),0_0_0.08rem_rgba(70,222,98,0.95)] transform-[scaleX(1.015)_scaleY(0.985)] animate-crt-content-warp max-sm:min-h-dvh max-sm:max-h-dvh max-sm:p-4 max-sm:transform-none max-sm:animate-none"
    : isPlain
    ? "relative z-10 px-6 py-10 text-base leading-relaxed text-gray-900"
    : "relative z-10 min-h-dvh max-h-dvh overflow-y-auto overflow-x-hidden p-4 text-white";

  const terminalChildStyles =
    "text-base leading-[1.35] **:text-base **:leading-[1.35] [&_h1]:font-normal [&_h2]:font-normal [&_h3]:font-normal [&_h4]:font-normal [&_h5]:font-normal [&_h6]:font-normal [&_ul]:my-[0.9rem] [&_ul]:list-none [&_ul]:pl-0 [&_li]:my-1 [&_li]:before:content-['>_']";

  const aStyles = isCrt
    ? "[&_a]:inline-block [&_a]:mx-[0.12rem] [&_a]:px-[0.28rem] [&_a]:border [&_a]:border-(--crt-border-75) [&_a]:bg-(--crt-text) [&_a]:text-black [&_a]:no-underline [&_a]:shadow-[0_0_0.25rem_rgba(124,255,145,0.28)] [&_a]:transition-[background-color,color,box-shadow,transform] [&_a]:duration-150 [&_a]:ease-linear [&_a:hover]:bg-black [&_a:hover]:text-(--crt-text) [&_a:hover]:shadow-[0_0_0.42rem_rgba(124,255,145,0.45)] [&_a:focus-visible]:bg-black [&_a:focus-visible]:text-(--crt-text) [&_a:focus-visible]:shadow-[0_0_0.42rem_rgba(124,255,145,0.45)] [&_a:focus-visible]:outline-none [&_a:active]:translate-y-px"
    : isPlain
    ? "[&_a]:text-blue-700 [&_a]:underline [&_a:hover]:text-blue-900 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-blue-600 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_li]:my-1"
    : "[&_a]:inline-block [&_a]:mx-[0.12rem] [&_a]:px-[0.28rem] [&_a]:border [&_a]:border-white [&_a]:bg-white [&_a]:text-black [&_a]:no-underline [&_a:hover]:bg-black [&_a:hover]:text-white [&_a:focus-visible]:bg-black [&_a:focus-visible]:text-white [&_a:focus-visible]:outline-none [&_button]:border-white [&_input]:border-white [&_textarea]:border-white [&_input]:bg-black [&_textarea]:bg-black [&_input]:text-white [&_textarea]:text-white";

  const cogClass = isCrt
    ? "border-(--crt-cog-border) bg-(--crt-cog-bg) text-(--crt-cog-text) [text-shadow:0_0_0.3rem_rgba(132,255,143,0.55)] shadow-[0_0_0.45rem_rgba(83,255,110,0.25),inset_0_0_0.2rem_rgba(118,255,138,0.35)] hover:bg-(--crt-cog-bg-hover) focus-visible:outline-(--crt-cog-text)"
    : isPlain
    ? "border-gray-400 bg-white text-gray-700 shadow-sm hover:bg-gray-100 focus-visible:outline-gray-500"
    : "border-(--bw-cog-border) bg-black text-(--bw-cog-text) shadow-none hover:bg-(--bw-cog-bg-hover) focus-visible:outline-(--bw-cog-text)";

  const modalPanelClass = isCrt
    ? "border-(--crt-border-75) bg-[rgba(2,8,3,0.98)] text-(--crt-text) shadow-[0_0_0.5rem_rgba(112,255,137,0.35)]"
    : isPlain
    ? "border-gray-300 bg-white text-black shadow-xl"
    : "border-white/50 bg-black text-white";

  const optionClass = (id: DisplayMode): string => {
    const selected = displayMode === id;
    if (isCrt)
      return selected
        ? "border-(--crt-text) bg-(--crt-text) text-black"
        : "border-(--crt-border-40) hover:border-(--crt-text)";
    if (isPlain)
      return selected
        ? "border-black bg-black text-white"
        : "border-gray-300 text-black hover:border-black";
    return selected
      ? "border-white bg-white text-black"
      : "border-white/30 text-white hover:border-white";
  };

  const closeBtnClass = isCrt
    ? "border-(--crt-border-40) text-(--crt-text-60) hover:border-(--crt-text) hover:text-(--crt-text)"
    : isPlain
    ? "border-gray-300 text-gray-500 hover:border-black hover:text-black"
    : "border-white/30 text-white/60 hover:border-white hover:text-white";

  return (
    <Router>
      <Seo />
      <div className={shellWrapClass}>
        <div className={bezelClass}>
          <div className={screenClass}>
            <div
              className={`${contentClass} ${
                isPlain
                  ? ""
                  : `mx-auto w-full max-w-3xl px-4 text-left ${terminalChildStyles}`
              } ${aStyles}`}
            >
              {isPlain ? (
                <h1 className="mb-1 text-3xl font-bold tracking-tight text-gray-900">Area3001</h1>
              ) : (
                <>
                  <h1>Welcome back, hackerman</h1>
                  <span className="animate-blink">_</span>
                </>
              )}
              <nav className={isPlain ? "flex flex-col gap-0.5 mb-8 mt-3" : "flex flex-col items-start"}>
                <Button text="home" hotkey="h" path="/" displayMode={displayMode} />
                <Button text="projects" hotkey="p" path="/projects" displayMode={displayMode} />
                <Button text="about" hotkey="a" path="/about" displayMode={displayMode} />
                <Button text="contact" hotkey="c" path="/contact" displayMode={displayMode} />
              </nav>
              <Routes>
                <Route path="/" element={<Home displayMode={displayMode} />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact displayMode={displayMode} />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Display settings"
        className={`fixed z-40 right-4 bottom-4 max-sm:right-2.5 max-sm:bottom-2.5 cursor-pointer rounded-full border w-10 h-10 flex items-center justify-center text-lg leading-none focus-visible:outline-2 focus-visible:outline-offset-2 ${cogClass}`}
        onClick={() => setSettingsOpen(true)}
      >
        ⚙
      </button>

      {settingsOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-[2px]"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className={`w-full max-w-sm border p-5 ${modalPanelClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 font-bold tracking-wider">DISPLAY SETTINGS</p>
            {MODES.map(({ id, label, description }) => (
              <button
                key={id}
                type="button"
                onClick={() => applyMode(id)}
                className={`mb-2 w-full cursor-pointer border px-3 py-2.5 text-left last:mb-0 ${optionClass(id)}`}
              >
                <span className="block font-bold tracking-wide">{label}</span>
                <span className="mt-0.5 block text-sm opacity-70">{description}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className={`mt-3 w-full cursor-pointer border px-3 py-1.5 text-sm tracking-wider ${closeBtnClass}`}
            >
              CLOSE
            </button>
          </div>
        </div>
      ) : null}
    </Router>
  );
}

export default App;
