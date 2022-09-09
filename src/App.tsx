import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BattleView from "./components/Battle/BattleView";
import Gallery from "./components/Gallery/Gallery";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <img src="../favicon-196.png" alt="HamsterWars" />
        <h1>HamsterWars</h1>
        <nav>
          <Link to="/"> Hem </Link>
          <Link to="/battle"> Tävling </Link>
          <Link to="/gallery"> Galleri </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<BattleView />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
