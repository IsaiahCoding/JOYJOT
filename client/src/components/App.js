import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "/Users/isaiahaguilera/Development/code/phase-4/Isaiah-Phase-4-Project/client/src/Header.jsx";
import "/Users/isaiahaguilera/Development/code/phase-4/Isaiah-Phase-4-Project/client/src/App.css";
import "/Users/isaiahaguilera/Development/code/phase-4/Isaiah-Phase-4-Project/client/src/App.css";

const logoUrl = "https://dochub.com/iaguileracfe/1XEpyxzwN5myZApVQZGd38/screenshot-2024-03-07-at-1-15-29-am-2-png";

function App() {
  return (
    <div className="app-container">
      <header>
        
        <Header />
      </header>

      <main>

        <img src={logoUrl} alt="JoyJot Logo" className="logo" />
      </main>
    </div>
  );
}

export default App;
