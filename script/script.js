const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearEnter = document.querySelector(".clearEnter");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const equal = document.querySelector(".equal");
const blocker = document.querySelector('.blocker')
const allButtons = document.querySelectorAll('div button')

const upperPanel = document.querySelector(".upperPanel");
const lowerPanel = document.querySelector(".lowerPanel");

let activeNumber = '';
let previousNumber = '';
let activeOperator = undefined;

const addNumber = (number) => {
  if (number === "⦁") {
    if(activeNumber.includes('.')) {
      return
    } else if (activeNumber === "" && number === "⦁") {
      activeNumber = '0.';
      return
    }
    number = '.';
  }
  activeNumber = activeNumber.toString() + number.toString()
}

const selectOpl = (operator) => {
  if (!activeNumber) {    // jeśli aN false
    if (!previousNumber)        // i pN false
    previousNumber = '0';       // to dodaj zero
    activeOperator = operator;  // pN true aN false
    return
  }

  else if (previousNumber) {
    calculate()
  }
    previousNumber = activeNumber;
    activeOperator = operator
    activeNumber = ''
}

const selectOpTrue = (operator) => {
  if (activeNumber) {
    if (!previousNumber) {
      previousNumber = activeNumber
      activeOperator = operator
      activeNumber = ''
      return
    }
    calculate()
    previousNumber = activeNumber
    activeOperator = operator
    activeNumber = ''
  }
  
  if (previousNumber) {
    activeOperator = operator
    return
  } else {
    previousNumber = '0';
    activeOperator = operator
    return
  }


}

const selectOp = (operator) => {
if (!activeNumber) {
  if (!previousNumber) {
    previousNumber = '0'
  }    
    activeOperator = operator
    return
} else if (previousNumber) {
  if (!upperPanel.textContent.includes('='))
  calculate()
}
previousNumber = activeNumber
activeOperator = operator
activeNumber = ''
}

const updateResult = (equalSign = false) => {
  lowerPanel.innerText = activeNumber;  
  if(activeOperator !== undefined) {
    upperPanel.innerText = previousNumber + " " + activeOperator;
    
    if (equalSign) {
      upperPanel.innerText = previousNumber + " " + activeOperator + " " + equalSign + " ="
    }

    else if (previousNumber && activeNumber ) {
       console.log("previousNumber przed konkatenacją w updateResult: " + previousNumber);
       upperPanel.innerText = previousNumber + " " + activeOperator + " " + activeNumber
       console.log("... po: " + previousNumber);
     }
     
  } 

  else {
    upperPanel.innerText = '';
  }
}


const calculate = (equalSign = false) => {
  let result 

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
        divideError()
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
  result = undefined;
  // previousNumber = ''; //to nie kasuje numeru
}

//Clearing

const deleteLastOne = () => {
  activeNumber = activeNumber.toString().slice(0, -1)}

const clearCalc = () => {

  previousNumber = '';
  activeNumber = '0';
  activeOperator = undefined;
  updateResult();
  activeNumber = '';
}

const divideError = () => {
  blocker.style.display = "block"
  activeNumber = 'Nie można dzielić przez zero';
  lowerPanel.classList.add('error'); 
  allButtons.forEach((button) => {
  button.classList.add('inactive');
  })
 
  setTimeout(() => {
    blocker.style.display = "none"
    allButtons.forEach((button) => {
    button.classList.remove('inactive')
    })
    lowerPanel.classList.remove('error');

    clearCalc();
  }, 2000);
  numbers.forEach(number => countingDown(number))
}

const countingDown = function (number) {
  if (number.textContent === "1" || number.textContent === "2" || number.textContent === "3") {
    number.style.color = 'royalblue'
    setTimeout(function() {number.style.color = 'rgb(224, 224, 224)'}, 2000)
    if (number.textContent === "3"){
    setTimeout(function() {number.style.color = 'rgba(224, 224, 224, 0.369)'}, 666);
    } else if (number.textContent === "2") {
      setTimeout(function() {number.style.color = 'rgba(224, 224, 224, 0.369)'}, 1333);
    }
  }
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
  let equalSign = activeNumber;
  calculate(equalSign);
  updateResult(equalSign);  
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

 
