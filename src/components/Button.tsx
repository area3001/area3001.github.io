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
      onClick={() => {
        navigate(path);
        if (onClick) onClick();
      }}
      className="hover:bg-white group hover:text-black cursor-pointer focus:bg-black focus:text-white focus:outline-8 outline-white"
    >
      <span className="bg-white group-hover:bg-black group-hover:text-white text-black mr-5 group-focus:bg-black group-focus:text-white">
        ({hotkey.toUpperCase()})
      </span>
      {text}
    </button>
  );
}
