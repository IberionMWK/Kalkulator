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

const calculate = () => {
  let operation 
  if (activeNumber || previousNumber) {
    return
  }
  const x = parseFloat(previousNumber)
  const y = parseFloat(activeNumber)
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

const addNumber = (number) => {
  if (number === "⦁") {
    if(activeNumber.includes(',')) {
      return
    }
    number = ',';
  }
  activeNumber = activeNumber.toString() + number.toString()
}

const deleteLastOne = () => {
  activeNumber = activeNumber.toString().slice(0, -1)
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

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    addNumber(number.innerText);
    updateResult()
  })
})

del.addEventListener('click', () => {
  deleteLastOne();
  updateResult();
})


operators.forEach((operator) => {
operator.addEventListener('click', () => {
  selectOp(operator.innerText);
  updateResult();
})
});

clear.addEventListener('click', () => {
  previousNumber = '';
  activeNumber = '0';
  activeOperator = undefined;
  updateResult();
  activeNumber = '';

})