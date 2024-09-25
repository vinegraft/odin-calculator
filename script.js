const MAX_DIGITS = 10;
let hasDecimal = false;
let displayString = "0";
let displayNumber = 0;
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let isOn = true;
let isDisplayingResult = false;

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
    handleNumberInput(numberWord);
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
    // prevent recursive operating on multiple button presses
    if (isDisplayingResult === true) {
      currentOperator = operatorWord;
    } else {
      firstOperand = secondOperand;
      secondOperand = displayNumber;
      currentOperator = operatorWord;
      displayNumber = 0;
      displayString = "0";
      updateDisplay("0");
    }
    // are we chaining operations?
    if (
      currentOperator !== null &&
      firstOperand !== null &&
      secondOperand !== null &&
      isDisplayingResult === false //user has entered a new operand
    ) {
      displayString = operate(currentOperator, firstOperand, secondOperand);
      updateDisplay(displayString);
      secondOperand = displayNumber;
    }
  });
});

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", (event) => {
  if (currentOperator !== null && secondOperand !== null) {
    firstOperand = secondOperand;
    secondOperand = displayNumber;
    displayNumber = 0;
    displayString = operate(currentOperator, firstOperand, secondOperand);
    updateDisplay(displayString);
    currentOperator = null;
  }
});

const onClearButton = document.querySelector(".on-c");
onClearButton.addEventListener("click", (event) => {
  hasDecimal = false;
  displayString = "0";
  displayNumber = 0;
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  isOn = true;
  updateDisplay(displayString);
});

const offButton = document.querySelector(".off");
offButton.addEventListener("click", (event) => {
  hasDecimal = false;
  displayString = "0";
  displayNumber = 0;
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  updateDisplay("");
  isOn = false;
});

const signButton = document.querySelector(".sign");
signButton.addEventListener("click", (event) => {
  if (displayNumber > 0) {
    displayNumber = -displayNumber;
    displayString = displayNumber.toString();
    updateDisplay(displayString);
  } else if (displayNumber < 0) {
    displayNumber = Math.abs(displayNumber);
    displayString = displayNumber.toString();
    updateDisplay(displayString);
  }
});

function updateDisplay(string) {
  displayString = string;
  displayString = removeLeadingZeros(displayString);
  displayNumber = round(parseFloat(displayString));
  if (isOn === true) {
    display.textContent = displayString;
  }
}

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
    display.textContent = "error";
    return null;
  }
  return a / b;
}

function operate(op, a, b) {
  isDisplayingResult = true;
  if (op === "add") {
    return round(add(a, b));
  } else if (op === "subtract") {
    return round(subtract(a, b));
  } else if (op === "multiply") {
    return round(multiply(a, b));
  } else if (op === "divide") {
    return round(divide(a, b));
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

function round(value) {
  value = value.toString();
  let valueSplitAtDecimal = value.split(".");
  let beforeDecimal = valueSplitAtDecimal[0].toString();
  let roundedDecimals = 10 - beforeDecimal.length;
  if (roundedDecimals >= 0) {
    return Number(
      Math.round(value + "e" + roundedDecimals) + "e-" + roundedDecimals
    );
  }
}

function handleNumberInput(button) {
  if (isDisplayingResult === true) {
    displayString = "0";
    displayNumber = 0;
    isDisplayingResult = false;
  }
  if (
    typeof button === "number" &&
    displayString.toString().replace(".", "").length < MAX_DIGITS
  ) {
    displayString += button.toString();
  } else if (button === "decimal" && !hasDecimal) {
    hasDecimal = true;
    displayString += ".";
  }

  updateDisplay(displayString);
}

/*

TODO:

  Add proper equals functionality. Repeated presses should repeat the previous
  operation. The previous result should become the new first operand, the previous
  second operand should stay the same.

  Adjust CSS to make all buttons square. The overall height and width of the 
  calculator should stay the same. The logo should appear midway vertically 
  between the screen and the buttons. 
  
  Maybe add a solar panel on the opposite side of the logo, also midway
  vertically.

*/
