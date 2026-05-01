import { Logo } from "../components/Logo";
import type { DisplayMode } from "../types";

interface HomeProps {
  displayMode: DisplayMode;
}

export default function Home({ displayMode }: HomeProps) {
  return (
    <div>
      {displayMode !== "plain" && <Logo />}
      <p>Hacking the planet since July 16th, 2013</p>
    </div>
  );
}