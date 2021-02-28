const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearEnter = document.querySelector(".clearEnter");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const equal = document.querySelector(".equal");

const upperPanel = document.querySelector(".upperPanel");
const lowerPanel = document.querySelector(".lowerPanel");

let activeNumber = '';
let previousNumber = '';
let activeOperator = undefined;

const addNumber = (number) => {
  if (number === "⦁") {
    if(activeNumber.includes('.')) {
      return
    }
    number = '.';
  }
  activeNumber = activeNumber.toString() + number.toString()
}

const selectOp = (operator) => {
  if (activeNumber === '') {
    if (!previousNumber) 
    previousNumber = '0';
    activeOperator = operator;
    return
  }
  if (previousNumber !== '') {
    calculate();
  }
  activeOperator = operator;
  previousNumber = activeNumber
  activeNumber = ''
}

const calculate = () => {
  let operation 

  if (!activeNumber || !previousNumber) {
    alert('Użyto funkcji calculate przy nieokreślonych zmiennych')
    return
  }
  const a = parseFloat(previousNumber)
  const b = parseFloat(activeNumber)

  if(isNaN(a) || isNaN(b)) {
    alert("Wprowadzone zmienne nie są liczbami.")
    return
  }
  
  switch (activeOperator.toString()) {
    case '+':
      result = a + b;
      break;
    case '-': 
    result = a - b; 
      break;
    case '×':
    result = a * b;
      break;
    case '÷':
      if (b === 0) {
        clearCalc()
        return
      }
      result = a / b;

      break;
    case '√':
      result = Math.pow(a, 1 / b);
      break;
    case '^': 
    result = Math.pow(a, b);
      break;
    case 'LOG':
      result = Math.log(a) / Math.log(b);
      break;
    case '%':
      result = a /  100 * b;
      break;
  
    default:
      alert('Poleciał default switcha')
      return;
  }

  activeNumber = result;
  operation = undefined;
  previousNumber = '';
}

const updateResult = () => {
  lowerPanel.innerText = activeNumber;
  if(activeOperator !== undefined) {
    upperPanel.innerText = previousNumber + activeOperator;
  }
  else {
    upperPanel.innerText = '';
  }
}

//Clearing

const deleteLastOne = () => {
  activeNumber = activeNumber.toString().slice(0, -1)
}

const clearCalc = () => {

  previousNumber = '';
  activeNumber = '0';
  activeOperator = undefined;
  updateResult();
  activeNumber = '';
}


//addEventListener

del.addEventListener('click', () => {
  deleteLastOne();
  updateResult();
})


clear.addEventListener('click', () => {
  clearCalc()
  
})

equal.addEventListener('click', () => {
  calculate();
  updateResult();
})
  
  numbers.forEach((number) => {
    number.addEventListener('click', () => {
      addNumber(number.innerText);
      updateResult()
    })
  })
  
  operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    selectOp(operator.innerText);
    updateResult();
  })
  });

  let x = 1.5;
