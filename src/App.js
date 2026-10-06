import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");

  function Add(value) {
    setDisplay(display + value);
  }

  function Clear() {
    setDisplay("");
  }

  function Delete() {
    setDisplay(display.slice(0, -1));
  }

  function Calculate() {
    let numbers;
    let result;

    if (display.includes("+")) {
      numbers = display.split("+");
      result = Number(numbers[0]) + Number(numbers[1]);
    }

    else if (display.includes("-")) {
      numbers = display.split("-");
      result = Number(numbers[0]) - Number(numbers[1]);
    }

    else if (display.includes("*")) {
      numbers = display.split("*");
      result = Number(numbers[0]) * Number(numbers[1]);
    }

    else if (display.includes("/")) {
      numbers = display.split("/");

      if (Number(numbers[1]) === 0) {
        setDisplay("Error");
        return;
      }

      result = Number(numbers[0]) / Number(numbers[1]);
    }

    else {
      return;
    }

    if (isNaN(result)) {
      setDisplay("Error");
    } else {
      setDisplay(String(result));
    }
  }

  function handleKeyDown(e) {
    if (e.key >= "0" && e.key <= "9") {
      Add(e.key);
    }

    else if (e.key === "+") {
      Add("+");
    }

    else if (e.key === "-") {
      Add("-");
    }

    else if (e.key === "*") {
      Add("*");
    }

    else if (e.key === "/") {
      e.preventDefault();
      Add("/");
    }

    else if (e.key === ".") {
      Add(".");
    }

    else if (e.key === "Enter") {
      Calculate();
    }

    else if (e.key === "Backspace") {
      Delete();
    }

    else if (e.key === "Escape") {
      Clear();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="app">
      <div className="calculator">
        <h1>Calculator</h1>
        <div className="display">
          {display || "0"}
        </div>
        <div className="buttons">
          <button className="clear" onClick={Clear}>AC</button>
          <button className="delete" onClick={Delete}>DEL</button>
          <button className="operator" onClick={() => Add("/")}>÷</button>
          <button className="operator" onClick={() => Add("*")}> ×</button>
          <button onClick={() => Add("7")}>7</button>
          <button onClick={() => Add("8")}>8</button>
          <button onClick={() => Add("9")}>9</button>
          <button className="operator" onClick={() => Add("-")}>−</button>
          <button onClick={() => Add("4")}>4</button>
          <button onClick={() => Add("5")}>5</button>
          <button onClick={() => Add("6")}>6</button>
          <button className="operator" onClick={() => Add("+")}>+</button>
          <button onClick={() => Add("1")}>1</button>
          <button onClick={() => Add("2")}>2</button>
          <button onClick={() => Add("3")}>3</button>

          <button className="equal" onClick={Calculate}>=</button>
          <button className="zero" onClick={() => Add("0")}>0</button>
          <button onClick={() => Add(".")}>.</button>

        </div>
      </div>
    </div>
  );
}

export default App;