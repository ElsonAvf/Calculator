function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
 return (b == 0) ? 'Não pode dividir por zero' :  a / b
}

function operate(num1, operator, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2)
    case '-':
      return subtract(num1, num2)
    case '*':
      return multiply(num1, num2)
    case '/':
      return divide(num1, num2)
  }
}

// Display inputs
const screen = document.querySelector('#screen')
const buttons = document.querySelector('#main');
buttons.addEventListener('click', (e) => {
  if (e.target.textContent == 'C') {
    screen.textContent = '';
  } else if (e.target.classList == 'operator') {
    screen.textContent = e.target.textContent;
  } else if (screen.textContent.length < 9) {
    let text = screen.textContent;
    screen.textContent = text + e.target.textContent
  }
  
});