import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Button({
  text,
  hotkey,
  path,
  crtEnabled,
  onClick,
}: {
  text: string;
  hotkey: string;
  path: string;
  crtEnabled: boolean;
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

  return (
    <button
      type="button"
      onClick={() => {
        navigate(path);
        if (onClick) onClick();
      }}
      className={`group cursor-pointer px-0.5 outline-offset-1 ${
        crtEnabled
          ? "outline-[#a8ffb5] text-[#a8ffb5] hover:bg-[#a8ffb5] hover:text-black focus:bg-black focus:text-[#a8ffb5] focus:outline-2"
          : "outline-white text-white hover:bg-white hover:text-black focus:bg-black focus:text-white focus:outline-2"
      }`}
    >
      <span
        className={`mr-5 ${
          crtEnabled
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
