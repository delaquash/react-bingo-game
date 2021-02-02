import React, { useState, useEffect } from "react";
import shuffle from "shuffle-array";

import './App.css';

import { start } from "./component/confetti";

function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}


function Box ({ id, children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

const commonPhrase = [
  "Great success",
  "User engagement",
  "Kodiak",
  "Huge kudos to X",
  "Suboptimal",
  "Learning experience ",
  "Personalized learning",
  "Super excited ",
  "Funnel",
  "OKRs",
  "Highest company priority ",
  "It’s only a test",
  "Operate like a startup",
  "Keeping the momentum",
  "The results look promising",
  "Initial signals",
  "Can’t wait to share results ",
  "Significant increase ",
  "High quality content",
  "Keep product consistent ",
  "Data driven ",
  "Glorious X team",
  "Allocate resources ",
  "Alignment between X and Y",
  "Happy to announce"
];

// To re-arrange 
const data = shuffle(commonPhrase).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

function App() {
  const [state, setState] = useState({ checked: {} });
  // Parameter to be fulfilled to check for winning
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <div className="App">
      <h1>Bingo Game</h1>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          <Box
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Box>
        ))}
      </div>
      {state.won ? <Confetti /> : null}
    </div>
  );
}



export default App;
