import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");

  const handleClick = (value) => {
    setDisplay((prev) => prev + value);
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const deleteLast = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const calculateResult = (value) => {
    let numbers;
    let result;

    if (value.includes("+")) {
      numbers = value.split("+");

      if (numbers.length === 2) {
        result = Number(numbers[0]) + Number(numbers[1]);
      }
    } else if (value.includes("-")) {
      numbers = value.split("-");

      if (numbers.length === 2) {
        result = Number(numbers[0]) - Number(numbers[1]);
      }
    } else if (value.includes("*")) {
      numbers = value.split("*");

      if (numbers.length === 2) {
        result = Number(numbers[0]) * Number(numbers[1]);
      }
    } else if (value.includes("/")) {
      numbers = value.split("/");

      if (numbers.length === 2) {
        if (Number(numbers[1]) === 0) {
          return "Cannot divide by 0";
        }

        result = Number(numbers[0]) / Number(numbers[1]);
      }
    } else {
      return value;
    }

    if (result === undefined || Number.isNaN(result)) {
      return "Error";
    }

    return String(result);
  };

  const calculate = () => {
    setDisplay((currentDisplay) => {
      if (currentDisplay === "") {
        return "";
      }

      return calculateResult(currentDisplay);
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (key >= "0" && key <= "9") {
        setDisplay((prev) => prev + key);
      } else if (key === "+") {
        setDisplay((prev) => prev + "+");
      } else if (key === "-") {
        setDisplay((prev) => prev + "-");
      } else if (key === "*") {
        setDisplay((prev) => prev + "*");
      } else if (key === "/") {
        event.preventDefault();
        setDisplay((prev) => prev + "/");
      } else if (key === ".") {
        setDisplay((prev) => prev + ".");
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        deleteLast();
      } else if (key === "Escape") {
        clearDisplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const createButton = (text, className, onClick) => {
    return React.createElement(
      "button",
      {
        className: className,
        onClick: onClick
      },
      text
    );
  };

  return React.createElement(
    "div",
    { className: "app" },

    React.createElement(
      "div",
      { className: "calculator" },

      React.createElement(
        "h1",
        null,
        "Calculator"
      ),

      React.createElement(
        "div",
        { className: "display" },
        display || "0"
      ),

      React.createElement(
        "div",
        { className: "buttons" },

        createButton("AC", "clear", clearDisplay),

        createButton("DEL", "delete", deleteLast),

        createButton(
          "÷",
          "operator",
          () => handleClick("/")
        ),

        createButton(
          "×",
          "operator",
          () => handleClick("*")
        ),

        createButton("7", "", () => handleClick("7")),
        createButton("8", "", () => handleClick("8")),
        createButton("9", "", () => handleClick("9")),

        createButton(
          "−",
          "operator",
          () => handleClick("-")
        ),

        createButton("4", "", () => handleClick("4")),
        createButton("5", "", () => handleClick("5")),
        createButton("6", "", () => handleClick("6")),

        createButton(
          "+",
          "operator",
          () => handleClick("+")
        ),

        createButton("1", "", () => handleClick("1")),
        createButton("2", "", () => handleClick("2")),
        createButton("3", "", () => handleClick("3")),

        createButton(
          "=",
          "equal",
          calculate
        ),

        createButton(
          "0",
          "zero",
          () => handleClick("0")
        ),

        createButton(
          ".",
          "",
          () => handleClick(".")
        )
      )
    )
  );
}

export default App;
