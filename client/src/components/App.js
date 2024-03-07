import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "/Users/isaiahaguilera/Development/code/phase-4/Isaiah-Phase-4-Project/client/src/Header.jsx"
import Journal from "/Users/isaiahaguilera/Development/code/phase-4/Isaiah-Phase-4-Project/client/src/components/Journal.jsx"
function App() {
  return (
  <div>
  <h1>Welcome to JoyJot!</h1>
  <Header />
  <main>
    <Journal />
  </main>

  </div>
)}

export default App;
