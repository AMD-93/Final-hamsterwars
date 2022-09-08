import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Battle from "./components/Battle/Battle";
import Gallery from "./components/Gallery/Gallery";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/"> Home</Link>
          <Link to="/battle"> Battle </Link>
          <Link to="/gallery"> Gallery </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
