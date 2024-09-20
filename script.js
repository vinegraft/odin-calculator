// Three slashes (///) indicates pseudocode

const MAX_DIGITS = 10;
let hasDecimal = false;
let displayValue = 0;
let operand1 = null;
let operand2 = null;
let operator = null;

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (event) => {
    let buttonClasses = Array.from(event.currentTarget.classList);
    let numberWord = buttonClasses.filter(
      (buttonClass) => buttonClass != "number" && buttonClass != "button"
    );
    numberWord = convertWordToInteger(numberWord.toString());
    populateDisplay(numberWord);
  });
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return null;
  }
  return a / b;
}

function operate(op, a, b) {
  if (op === "add") {
    return add(a, b);
  } else if (op === "subtract") {
    return subtract(a, b);
  } else if (op === "multiply") {
    return multiply(a, b);
  } else if (op === "divide") {
    return divide(a, b);
  } else {
    return null;
  }
}

function convertWordToInteger(word) {
  switch (word) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    case "zero":
      return 0;
    default:
      return null;
  }
}

function populateDisplay(button) {
  if (typeof button === "number") {
    displayValue = displayValue.toString();
    displayValue += button.toString();
    display.textContent = displayValue;
    displayValue = parseFloat(displayValue);
    //TODO handle leading zeroes and max display digits
  }
  if (button === "decimal" && !hasDecimal) {
    //TODO handle trailing decimal and zeroes (1. or 1.0 wants? to convert to 1)
    hasDecimal = true;
  }
}
