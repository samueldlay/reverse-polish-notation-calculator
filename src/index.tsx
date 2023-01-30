import React, {useState, useEffect, useMemo} from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// import { Visualize } from "./Visualize";

//Logic for calculation:

type Operator = "*" | "/" | "+" | "-";
type OperationFn = (a: number, b: number) => number;

const expressions: Record<Operator, OperationFn> = {
  "*": (a: number, b: number) => a * b,
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  "/": (a: number, b: number) => a / b
};

function rpnCalculator (string: string) {
  // const charsArray: string[] = string.split(" ");
  const charsArray: string[] = string.split(/\s+/);
  const newStack: number[] = [];

  const solveExpression = (operator: Operator) => {
    const operation = expressions[operator];
    // const { length } = newStack;
    // const solution = operation(newStack[length - 2], newStack[length - 1]);
    // newStack.splice(length - 2, 2);

    /*
      newStack === [1, 2, 3]
      newStack.splice(-2, 2) === [2, 3]
    */
    const solution = operation(...newStack.splice(-2, 2) as [number, number]);
    newStack.push(solution);
  };

  for (const char of charsArray) {
    if (char in expressions) solveExpression(char as Operator);
    else newStack.push(Number(char));
  }

  return newStack.pop();
}
//end of logic for calculation

//UI for calculation
function App () {
  const [inputValue, setInputValue] = useState("");
  // const [solution, setSolution] = useState<number | undefined>();

  // useEffect(() => {
  //   if (!inputValue.trim()) return;
  //   setSolution(rpnCalculator(inputValue));
  // }, [inputValue]);

  const solution = useMemo<number | undefined>(() => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;
    return rpnCalculator(trimmedInput);
  }, [inputValue]);

  const inputValidation = (value: string) => {
    // if (isNaN(parseInt(value, 10))) {
    //   // if (value === "*" || value === "/" || value === "-" || value === "+") {
    //   if (value in expressions) {
    //     setInputValue(value);
    //   } else setInputValue("");
    // }
    // else setInputValue(value);
    if ((/^[ \d*/+-]*$/).test(value)) setInputValue(value);
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
      <div style={{color: "grey"}}>
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
      {/* <Visualize data={{inputValue, solution}} /> */}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
//end of UI for calculation
