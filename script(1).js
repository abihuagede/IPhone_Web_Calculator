document.addEventListener('DOMContentLoaded', function() {
  const resultInput = document.getElementById('result');
  const buttons = document.querySelectorAll('.buttons button');

  let currentInput = '0';
  let operator = null;
  let firstOperand = null;

  function updateDisplay() {
    resultInput.value = currentInput;
  }

  function clear() {
    currentInput = '0';
    operator = null;
    firstOperand = null;
    updateDisplay();
  }

  function handleNumber(number) {
    if (currentInput === '0') {
      currentInput = number;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  function handleDecimal() {
    if (!currentInput.includes('.')) {
      currentInput += '.';
      updateDisplay();
    }
  }

  function handleOperator(op) {
    if (operator) {
      calculate();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '0';
  }

  function calculate() {
    if (operator && firstOperand !== null) {
      const secondOperand = parseFloat(currentInput);
      let result;

      switch (operator) {
        case '+':
          result = firstOperand + secondOperand;
          break;
        case '-':
          result = firstOperand - secondOperand;
          break;
        case '*':
          result = firstOperand * secondOperand;
          break;
        case '/':
          if (secondOperand === 0) {
            result = 'Error';
          } else {
            result = firstOperand / secondOperand;
          }
          break;
        case '%':
          result = firstOperand / 100 * secondOperand;
          break;
        default:
          return;
      }

      currentInput = result.toString();
      operator = null;
      firstOperand = null;
      updateDisplay();
    }
  }

  function handlePlusMinus() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
  }

  function handlePercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent;

      if (button.classList.contains('number')) {
        handleNumber(buttonText);
      } else if (button.classList.contains('operator')) {
        if (buttonText === 'AC') {
          clear();
        } else if (buttonText === '=') {
          calculate();
        } else if (buttonText === '+/-') {
          handlePlusMinus();
        } else if (buttonText === '%') {
          handlePercentage();
        }
        else {
          handleOperator(buttonText);
        }
      } else if (button.classList.contains('decimal')) {
        handleDecimal();
      }
    });
  });
});