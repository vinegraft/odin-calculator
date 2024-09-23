const MAX_DIGITS = 10;
let hasDecimal = false;
let displayString = "0";
let displayNumber = 0;
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

const display = document.querySelector(".display");

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (event) => {
    let buttonClasses = Array.from(event.currentTarget.classList);
    let numberWord = buttonClasses
      .filter(
        (buttonClass) => buttonClass != "number" && buttonClass != "button"
      )
      .toString();
    if (numberWord != "decimal") {
      numberWord = convertWordToInteger(numberWord);
    }
    updateDisplay(numberWord);
  });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (event) => {
    let buttonClasses = Array.from(event.currentTarget.classList);
    let operatorWord = buttonClasses
      .filter(
        (buttonClass) => buttonClass != "operator" && buttonClass != "button"
      )
      .toString();
    currentOperator = operatorWord;
    console.log(operate(currentOperator, 1, 2));
    operate(currentOperator, firstOperand, secondOperand);
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

function removeLeadingZeros(display) {
  let currentString = display;
  for (i = 0; i < display.length && display.length > 1; i++) {
    if (display[i] === "0" && display[i + 1] !== ".") {
      display = currentString.replace("0", "");
    } else if (display[i] != "0") {
      break;
    }
  }
  return display;
}

function updateDisplay(button) {
  if (
    typeof button === "number" &&
    displayString.toString().replace(".", "").length < MAX_DIGITS
  ) {
    displayString += button.toString();
  }
  if (button === "decimal" && !hasDecimal) {
    hasDecimal = true;
    displayString += ".";
  }
  displayString = removeLeadingZeros(displayString);
  displayNumber = parseFloat(displayString);
  display.textContent = displayString;
  console.log(displayString);
  console.log(displayNumber);
}

/*

*how a calculator should handle operations

*it lets the user input a number

*when the user presses an operator it stores the above number as the first 
operand

*if the user presses another operator before entering the second operand it overwrites
the old operand, replacing it with the most recently pressed

*it lets the user enter another number (second operand)

*1 if the user presses equals it does the operation and displays result

*2 if the user presses equals again it does the same operation, taking the 
previous result as the first operand and keeps the previous second operand

*if the user enters a number, an operator, another number, and another operator, it
operates the first operator and updates the display with the result, using the
displayed value as the first operand for the next operation. it's waiting for the 
second operand or another operator to overwrite the selected operator

*it this point the user can enter another number as the second operand, and press
equals to go to the behaviour at *1, pressing equals repeatedly

*/
