import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

export default function AppPages() {
  return (
    <>
      <Router>
        {/* barra de navegação - responsavel por mudar as rotas! */}
        <nav className="bg-gray-400">
          <ul className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <li className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
              <Link to="/">Home</Link>
            </li>
            <li className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
              <Link to="/about">About</Link>
            </li>
            <li className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* rotas para renderização */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}
