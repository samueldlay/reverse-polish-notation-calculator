import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

//Logic for calculation:

const expressions = {
  "*": (a: number, b: number) => a * b,
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  "/": (a: number, b: number) => a / b
};

function rpnCalculator(string: string) {
  const charsArray: string[] = string.split(" ");
  const newStack: number[] = [];

  const solveExpression = (operator: string) => {
    const operation = expressions[operator];
    const { length } = newStack;
    const solution = operation(newStack[length - 2], newStack[length - 1]);
    newStack.splice(length - 2, 2);
    newStack.push(solution);
  };

  for (const char of charsArray) {
    if (expressions[char]) {
      solveExpression(char);
    } else newStack.push(Number(char));
  }

  return newStack.pop();
}
//end of logic for calculation

//UI for calculation
function App() {
  const [inputValue, setInputValue] = useState("");
  const [solution, setSolution] = useState(Number);

  useEffect(() => {
    if (!inputValue.trim()) return;
    setSolution(rpnCalculator(inputValue));
  }, [inputValue]);

  const inputValidation = (value: number | string) => {
    if (isNaN(parseInt(value, 10))) {
      if (value === "*" || value === "/" || value === "-" || value === "+") {
        setInputValue(value);
      } else setInputValue("");
    }
    setInputValue(value);
  };

  return (
    <div className="App black">
      <h3>Sam's Reverse Polish Notation Calculator</h3>
      <a
        target="_blank"
        href="https://en.wikipedia.org/wiki/Reverse_Polish_notation"
      >
        Learn about reverse Polish notation here
      </a>
      <div style={{ color: "grey" }}>
        <h5>Example: 15 7 1 1 + - / 3 * 2 1 1 + + -</h5>
        <h5>(Expected output: 5)</h5>
      </div>
      <button onClick={() => setInputValue("15 7 1 1 + - / 3 * 2 1 1 + + -")}>
        Try Example
      </button>
      <input
        value={inputValue.toString()}
        placeholder="Enter a valid expression"
        onChange={e => inputValidation(e.target.value)}
        style={{
          borderRadius: "3px",
          height: "30px",
          border: "none",
          paddingLeft: "5px"
        }}
      />
      <button onClick={() => setInputValue("")}>Clear</button>
      {inputValue.length && solution ? <h1>Solution: {solution}</h1> : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
//end of UI for calculation
