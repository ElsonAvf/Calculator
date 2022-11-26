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
 if (b == 0) {
   alert('Não pode dividir por zero');
   return 0
  } return a / b
}

function operate(num1, operator, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2)
    case '-':
      return subtract(num1, num2)
    case 'x':
      return multiply(num1, num2)
    case '÷':
      return divide(num1, num2)
  }
}

// Variáveis para operações
let numero1 = '', numero2 = '', operador = '', result;

// Display inputs
const screen = document.querySelector('#screen');
const buttons = document.querySelector('#main');
const numbers = document.querySelector('#numbers');
const audio = document.querySelector('audio');
const backspace = document.querySelector('#backspace');


function clean() {
  screen.textContent = '',
  numero1 = '';
  operador = '';
  numero2 = '';
}

function displayNumber(targetText) {
     if (targetText == '.') {
       testDotInput(targetText);
     } else if (operador && numero1) {
          if (!numero2) {
            numero2 += targetText;
            screen.textContent = numero2;
          } else if (numero2.length < 9) {
               numero2 += targetText
               screen.textContent = numero2;
          }
     } else {
         if (numero1.length < 9) {
           numero1 += targetText;
           screen.textContent = numero1;
         }
     }
}


function makeCalc() {
  result = operate(parseFloat(numero1), operador, parseFloat(numero2))
  screen.textContent = Math.round(result*100)/100;
  numero1 = String(result);
  numero2 = '';
  operador = '';
}

function setOperador(targetText) {
  if (numero2) {
    result = operate(parseFloat(numero1), operador, parseFloat(numero2))
    screen.textContent = result;
    numero1 = result;
    operador = targetText;
    numero2 = '';
  } else {
    operador = targetText;
  }
}

function testDotInput(targetText) {
  if (numero2) {
    if (!screen.textContent.match(/[.]/g)) {
      if (numero2.length < 9) {
      numero2 += targetText;
      screen.textContent = numero2;
      }
    }
  } else {
    if (!screen.textContent.match(/[.]/g)) {
      if (numero1.length < 9) {
      numero1 += targetText;
      screen.textContent = numero1;
      }
    }
  }
}

buttons.addEventListener('click', (e) => {
  // Para deixar mais legível
  const targetText = e.target.textContent;
  
  // Display Info
  if (targetText == 'C') {
    clean();
  } else if (e.target.classList == 'operator' && targetText != '=') {
    setOperador(targetText);
  } else if (numbers.contains(e.target)) {
    displayNumber(targetText);
    }
  
  if (targetText == '=' && numero2 && numero1 && operador) {
    makeCalc();
  }
  audio.pause();
  audio.play();
});

backspace.addEventListener('click', () => {
  audio.pause();
  audio.play();
  if (numero2) {
    numero2 = numero2.slice(0, numero2.length - 1);
    screen.textContent = numero2;
  } else {
    numero1 = numero1.slice(0, numero2.length - 1);
    screen.textContent = numero1;
  }
})
