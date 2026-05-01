import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { DisplayMode } from "../types";

export function Button({
  text,
  hotkey,
  path,
  displayMode,
  onClick,
}: {
  text: string;
  hotkey: string;
  path: string;
  displayMode: DisplayMode;
  onClick?: () => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key.toLowerCase() === hotkey.toLowerCase()) {
        navigate(path);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [hotkey, navigate, path]);

  const isCrt = displayMode === "crt";
  const isPlain = displayMode === "plain";

  if (isPlain) {
    return (
      <button
        type="button"
        onClick={() => {
          navigate(path);
          if (onClick) onClick();
        }}
        className="cursor-pointer text-left text-blue-700 underline hover:text-blue-900 hover:no-underline focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        {text}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        navigate(path);
        if (onClick) onClick();
      }}
      className={`group cursor-pointer px-0.5 outline-offset-1 ${
        isCrt
          ? "outline-[#a8ffb5] text-[#a8ffb5] [text-shadow:0_0_0.35rem_rgba(132,255,143,0.62),0_0_0.08rem_rgba(70,222,98,0.95)] hover:bg-[#a8ffb5] hover:text-black hover:[text-shadow:none] focus:bg-black focus:text-[#a8ffb5] focus:outline-2"
          : "outline-white text-white hover:bg-white hover:text-black focus:bg-black focus:text-white focus:outline-2"
      }`}
    >
      <span
        className={`mr-5 ${
          isCrt
            ? "bg-[#a8ffb5] text-black group-hover:bg-black group-hover:text-[#a8ffb5] group-focus:bg-black group-focus:text-[#a8ffb5]"
            : "bg-white text-black group-hover:bg-black group-hover:text-white group-focus:bg-black group-focus:text-white"
        }`}
      >
        ({hotkey.toUpperCase()})
      </span>
      {text}
    </button>
  );
}
