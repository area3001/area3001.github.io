import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button } from "./components/Button";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="px-4">
        <h1>Welcome to the</h1>
        <p>Homepage</p>
        <span className="animate-blink">_</span>
        <nav className="flex flex-col items-start">
          <Button text="home" hotkey="h" path="/" />
          <Button text="projects" hotkey="p" path="/projects" />
          <Button text="about" hotkey="a" path="/about" />
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
