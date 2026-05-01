import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Button({
  text,
  hotkey,
  path,
  onClick,
}: {
  text: string;
  hotkey: string;
  path: string;
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
      className="group cursor-pointer outline-[#a8ffb5] hover:bg-[#a8ffb5] hover:text-black focus:bg-black focus:text-[#a8ffb5] focus:outline-2 focus:outline-offset-1"
    >
      <span className="mr-5 bg-[#a8ffb5] text-black group-hover:bg-black group-hover:text-[#a8ffb5] group-focus:bg-black group-focus:text-[#a8ffb5]">
        ({hotkey.toUpperCase()})
      </span>
      {text}
    </button>
  );
}
