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

  const toggleCrt = (enabled: boolean) => {
    localStorage.setItem("crt", enabled ? "on" : "off");
    setCrtEnabled(enabled);
  };

  return (
    <Router>
      <Seo />
      <div className={`crt-bezel ${crtEnabled ? "" : "crt-disabled"}`}>
        <div className="crt-screen">
          <div className="crt-content mx-auto w-full max-w-3xl px-4 text-left">
            <h1>Welcome back, hackerman</h1>
            <span className="animate-blink">_</span>
            <nav className="flex flex-col items-start">
              <Button text="home" hotkey="h" path="/" />
              <Button text="projects" hotkey="p" path="/projects" />
              <Button text="about" hotkey="a" path="/about" />
              <Button text="contact" hotkey="c" path="/contact" />
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

      <button
        type="button"
        className="crt-toggle"
        aria-pressed={crtEnabled}
        onClick={() => toggleCrt(!crtEnabled)}
      >
        CRT {crtEnabled ? "ON" : "OFF"}
      </button>
    </Router>
  );
}

export default App;
