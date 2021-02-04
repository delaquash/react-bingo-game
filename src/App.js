import React, { useState, useEffect } from "react";


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
  "JSX",
  "Hooks",
  "Redux",
  "Functional Components",
  "Props",
  "State Management",
  "Conditional Rendering",
  "Class Component",
  "Routers",
  "Formik",
  "Rest API ",
  "Fetch API",
  "NextJS",
  "Higher Order Components",
  "useState",
  "useEffect",
  "Async/Await",
  "Material UI",
  "setState",
  "Axios",
  "ComponentDidMount",
  "Ternary Expressions",
  "Event Handlers",
  "Chakra UI",
  "Tailwind CSS"
];


// I wanted to make the phrases re-arrange themselves, but decided to leave it.
const data = (commonPhrase).reduce(
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
      <h1>React Bingo Game</h1>
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
