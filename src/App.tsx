import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Button } from "./components/Button";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Seo } from "./components/Seo";

function App() {
  const [crtEnabled, setCrtEnabled] = useState(
    () => localStorage.getItem("crt") !== "off"
  );

  const shellWrapClass = crtEnabled
    ? "min-h-dvh bg-[radial-gradient(circle_at_20%_15%,rgba(22,45,24,0.45),transparent_52%),radial-gradient(circle_at_80%_90%,rgba(14,38,29,0.38),transparent_60%),#050a05] font-dos flex items-center justify-center py-4"
    : "min-h-dvh bg-black font-dos flex items-start justify-center py-0 sm:items-center sm:py-4";

  const bezelClass = crtEnabled
    ? "w-[min(980px,calc(100%-2rem))] my-4 p-[clamp(0.7rem,2.5vw,1.2rem)] rounded-[1.8rem] bg-[linear-gradient(140deg,#474c45_0%,#181e18_42%,#363d35_100%)] border border-[#575f58] shadow-[0_1.2rem_2rem_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(250,255,249,0.12),inset_0_-0.6rem_1rem_rgba(0,0,0,0.35)] max-sm:w-full max-sm:m-0 max-sm:p-0 max-sm:border-none max-sm:rounded-none max-sm:bg-none max-sm:shadow-none"
    : "w-full my-0 p-0 rounded-none bg-none border-none shadow-none";

  const screenClass = crtEnabled
    ? "relative overflow-hidden rounded-[2.2rem] border-2 border-[rgba(141,255,162,0.36)] bg-[radial-gradient(ellipse_at_center,rgba(20,45,23,0.18)_0%,rgba(2,8,2,0.96)_68%),#030503] shadow-[inset_0_0_2.6rem_rgba(37,255,105,0.14),inset_0_0_0.9rem_rgba(0,0,0,0.82),0_0.2rem_0.7rem_rgba(0,0,0,0.6)] [transform:perspective(1200px)_rotateX(0.8deg)] animate-crt-wobble before:content-[''] before:absolute before:inset-0 before:z-[2] before:pointer-events-none before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.01)_48%,rgba(0,0,0,0.25)_100%),repeating-linear-gradient(to_bottom,rgba(181,255,188,0.08)_0px,rgba(181,255,188,0.08)_1px,transparent_1px,transparent_4px),repeating-linear-gradient(to_right,rgba(255,0,0,0.03)_0px,rgba(255,0,0,0.03)_1px,rgba(0,255,255,0.02)_1px,rgba(0,255,255,0.02)_2px,transparent_2px,transparent_3px)] before:mix-blend-screen before:animate-scanline-drift after:content-[''] after:absolute after:inset-0 after:z-[3] after:pointer-events-none after:bg-[radial-gradient(circle_at_50%_45%,transparent_35%,rgba(0,0,0,0.38)_100%),radial-gradient(circle_at_8%_0%,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_92%_100%,rgba(255,255,255,0.06),transparent_20%)] max-sm:border-none max-sm:rounded-none max-sm:[transform:none] max-sm:animate-none max-sm:shadow-none"
    : "relative overflow-hidden rounded-none border-none bg-none shadow-none";

  const contentClass = crtEnabled
    ? "relative z-[1] min-h-[min(78vh,760px)] max-h-[min(78vh,760px)] overflow-y-auto overflow-x-hidden p-[clamp(1rem,3vw,1.7rem)] text-[#a8ffb5] [text-shadow:0_0_0.35rem_rgba(132,255,143,0.62),0_0_0.08rem_rgba(70,222,98,0.95)] [transform:scaleX(1.015)_scaleY(0.985)] animate-crt-content-warp max-sm:min-h-dvh max-sm:max-h-dvh max-sm:p-4 max-sm:[transform:none] max-sm:animate-none"
    : "relative z-[1] min-h-dvh max-h-dvh overflow-y-auto overflow-x-hidden p-4 text-white";

  const toggleCrt = (enabled: boolean) => {
    localStorage.setItem("crt", enabled ? "on" : "off");
    setCrtEnabled(enabled);
  };

  return (
    <Router>
      <Seo />
      <div className={shellWrapClass}>
        <div className={bezelClass}>
          <div className={screenClass}>
            <div
              className={`${contentClass} mx-auto w-full max-w-3xl px-4 text-left text-base leading-[1.35] **:text-base **:leading-[1.35] [&_h1]:font-normal [&_h2]:font-normal [&_h3]:font-normal [&_h4]:font-normal [&_h5]:font-normal [&_h6]:font-normal [&_ul]:my-[0.9rem] [&_ul]:list-none [&_ul]:pl-0 [&_li]:my-1 [&_li]:before:content-['>_'] ${
                crtEnabled
                    ? "[&_a]:inline-block [&_a]:mx-[0.12rem] [&_a]:px-[0.28rem] [&_a]:border [&_a]:border-[rgba(168,255,181,0.75)] [&_a]:bg-[#a8ffb5] [&_a]:text-black [&_a]:no-underline [&_a]:shadow-[0_0_0.25rem_rgba(124,255,145,0.28)] [&_a]:transition-[background-color,color,box-shadow,transform] [&_a]:duration-150 [&_a]:ease-linear [&_a:hover]:bg-black [&_a:hover]:text-[#a8ffb5] [&_a:hover]:shadow-[0_0_0.42rem_rgba(124,255,145,0.45)] [&_a:focus-visible]:bg-black [&_a:focus-visible]:text-[#a8ffb5] [&_a:focus-visible]:shadow-[0_0_0.42rem_rgba(124,255,145,0.45)] [&_a:focus-visible]:outline-none [&_a:active]:translate-y-px"
                    : "[&_a]:inline-block [&_a]:mx-[0.12rem] [&_a]:px-[0.28rem] [&_a]:border [&_a]:border-white [&_a]:bg-white [&_a]:text-black [&_a]:no-underline [&_a:hover]:bg-black [&_a:hover]:text-white [&_a:focus-visible]:bg-black [&_a:focus-visible]:text-white [&_a:focus-visible]:outline-none [&_button]:border-white [&_input]:border-white [&_textarea]:border-white [&_input]:bg-black [&_textarea]:bg-black [&_input]:text-white [&_textarea]:text-white"
              }`}
            >
              <h1>Welcome back, hackerman</h1>
              <span className="animate-blink">_</span>
              <nav className="flex flex-col items-start">
                <Button text="home" hotkey="h" path="/" crtEnabled={crtEnabled} />
                <Button text="projects" hotkey="p" path="/projects" crtEnabled={crtEnabled} />
                <Button text="about" hotkey="a" path="/about" crtEnabled={crtEnabled} />
                <Button text="contact" hotkey="c" path="/contact" crtEnabled={crtEnabled} />
              </nav>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`fixed z-40 right-4 bottom-4 max-sm:right-2.5 max-sm:bottom-2.5 cursor-pointer rounded-[0.4rem] border px-[0.7rem] py-[0.35rem] text-base leading-none tracking-[0.06em] focus-visible:outline-2 focus-visible:outline-offset-2 ${
          crtEnabled
            ? "border-[rgba(138,255,156,0.8)] bg-[rgba(4,12,5,0.9)] text-[#b8ffc2] [text-shadow:0_0_0.3rem_rgba(132,255,143,0.55)] shadow-[0_0_0.45rem_rgba(83,255,110,0.25),inset_0_0_0.2rem_rgba(118,255,138,0.35)] hover:bg-[rgba(10,28,12,0.95)] focus-visible:outline-[#b8ffc2]"
            : "border-[rgba(192,204,194,0.65)] bg-black text-[#cdd4ce] shadow-none"
        }`}
        aria-pressed={crtEnabled}
        onClick={() => toggleCrt(!crtEnabled)}
      >
        CRT {crtEnabled ? "ON" : "OFF"}
      </button>
    </Router>
  );
}

export default App;
