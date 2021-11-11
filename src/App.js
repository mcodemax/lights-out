import React from "react";
import Board from "./Board";
import "./App.css";

// import Cell from "./Cell";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <h1>LIGHTS OUT</h1>
      <Board />
      {/* <Cell /> */}
    </div>
  );
}

export default App;
