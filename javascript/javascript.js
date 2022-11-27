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

// Display inputs
const screen = document.querySelector('#screen');
const buttons = document.querySelector('#main');
const numbers = document.querySelector('#numbers');
const audio = document.querySelector('audio');
const backspace = document.querySelector('#backspace');
const screenEquation = document.querySelector('#equation-screen');
const screenResult = document.querySelector('#result-screen');

// Variáveis para operações
let numero1 = '', numero2 = '', operador = '';
let result;
let equalSignWasClicked = false;


function clean() {
  screenResult.textContent = '';
  screenEquation.textContent = '';
  numero1 = '';
  operador = '';
  numero2 = '';
}

function displayNumber(targetText) {
     if (targetText == '.') {
       testDotInput(targetText);
     } else if (operador && numero1) {
         if (numero2.length < 9) {
               numero2 += targetText
               screenEquation.textContent += targetText;
          }
     } else {
       if (equalSignWasClicked) {
         screenEquation.textContent = numero1;
         equalSignWasClicked = false;
       }
         if (numero1.length < 9) {
           numero1 += targetText;
           screenEquation.textContent += targetText;
         }
     }
}


function makeCalc() {
  result = Math.round(operate(parseFloat(numero1), operador, parseFloat(numero2))*100)/100;
  screenResult.textContent = result;
  numero1 = String(result);
  numero2 = '';
  operador = '';
}

function setOperador(targetText) {
  if (numero2) {
    makeCalc();
    screenEquation.textContent = result;
    screenEquation.textContent += targetText;
    operador = targetText;
  } else {
    if (equalSignWasClicked) {
      screenEquation.textContent = numero1;
      equalSignWasClicked = false;
    }
    operador = targetText;
    if (screenEquation.textContent[screenEquation.textContent.length - 1].match(/[x|÷|\-|\+]/)) {
      let equationText = screenEquation.textContent;
      equationText = equationText.slice(0, equationText.length - 1);
      screenEquation.textContent = equationText + operador;
    } else {
    screenEquation.textContent += targetText;
    }
  }
}

function testDotInput(targetText) {
  if (numero2) {
    if (!screen.textContent.match(/[.]/g)) {
      if (numero2.length < 9) {
      numero2 += targetText;
      screenEquation.textContent = numero2;
      }
    }
  } else {
    if (!screen.textContent.match(/[.]/g)) {
      if (numero1.length < 9) {
      numero1 += targetText;
      screenEquation.textContent = numero1;
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
    equalSignWasClicked = true;
  }
  audio.currentTime = 0;
  audio.play();
});

// Backspace button
backspace.addEventListener('click', () => {
  audio.currentTime = 0;
  audio.play();
  // Pela legibilidade
  const equationText = screenEquation.textContent;
  
  if (numero2) {
    numero2 = numero2.slice(0, numero2.length - 1);
    screenEquation.textContent = equationText.slice(0, (equationText.length - (numero2.length + 1))) + numero2;
  } else if (equationText[equationText.length - 1].match(/[x|÷|\-|+]/)) {
    operador = '';
    screenEquation.textContent = equationText.slice(0, equationText.length -1);
  } else {
    numero1 = numero1.slice(0, numero2.length - 1);
    screenEquation.textContent = numero1;
  }
})
