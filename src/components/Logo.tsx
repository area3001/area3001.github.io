import { useEffect, useState } from "react";

const logo = `
 ███████ ████████ █████████ ███████  
██     ███      ███       ███     ██ 
█  ███  ██  ███  ██  ███████  ███  ██
█  ███  ██  ███  ██  ███████  ███  ██
█  ███  ██      ███      ███  ███  ██
█       ██  ███  ██  ███████       ██
█  ███  ██  ███  ██  ███████  ███  ██
█  ███  ██  ███  ██       ██  ███  ██
█████████████████████████████████████
 ████████████████████████████████████
██     ████     █████     █████  ██  
█  ███  ██  ███  ███  ███  ███   ██  
██████  ██  ██   ███  ██   ████  ██  
 ███   ███  █ █  ███  █ █  ████  ██  
██████  ██   ██  ███   ██  ████  ██  
█  ███  ██  ███  ███  ███  ████  ███ 
██     ████     █████     ███      ██
 ████████████████████████████████████
  ███████  ████████  ███████ ████████
`;
export function Logo() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // type each char of logo2 to logoText
    let i = 0;
    const interval = setInterval(() => {
      setTextIndex((prev) => prev + 1);
      i++;
      if (i === logo.length) {
        clearInterval(interval);
      }
    }, 0);
  }, []);
  return (
    <div className="whitespace-pre pb-5">
      <span>{logo.slice(0, textIndex)}</span>
      {textIndex !== logo.length && (
        <span className="invisible">{logo.slice(textIndex)}</span>
      )}
    </div>
  );
}
