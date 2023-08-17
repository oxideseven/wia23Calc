const buttons = document.querySelectorAll('button');
let num1;
let num2;
let mathResult;
let opSelected;

//Grab the display elements
const displayOutput = document.getElementById('displayOutput');
const resultOutput = document.getElementById('resultOutput');

//Keyboard Support
document.addEventListener('keyup', (event) => {
    
    const operators = {
        '+': 'addButton',
        '-': 'subButton',
        '*': 'multButton',
        '/': 'divButton',
    }

    //buttons.forEach((button) => { button.blur(); });
    
    if (!Number.isNaN(+event.key) && event.key !== ' ') {
        document.getElementById(`num${event.key}`).click();

    } else if (event.key === 'Backspace') {
        document.getElementById('backButton').click();

    } else if (event.key === 'Delete' || event.key === 'c' || event.key === 'C' || event.key === `Escape`) {
        document.getElementById('clearButton').click();

    } else if (event.key === '.') {
        document.getElementById('decButton').click();

    } else if (event.key === '=' || event.key === 'Enter') {
        document.getElementById('equalButton').click();

    } else if (['+', '-', '*', '÷'].includes(event.key)) {
        document.getElementById(operators[event.key]).click();
    
    } else {

      console.log('Wrong key:', event.key);
    }
});

//Mouse Support
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        buttonClicked(button.className, button.textContent);
    });
});

//This determiens what to do with the button pressed
function buttonClicked(btnClass, btnContent) {
    
    switch (true) {
        //OP BUTTONS
        //First op press; opSelected = textContent, work on num2 now.
        case ((btnClass === `opButton`) && (opSelected === ``) && (btnContent !== `=`)):
            opSelected = btnContent;
            console.log(`OP button first time`);
            break;
        case ((btnClass === `opButton`) && (opSelected !== ``) && (btnContent !== `=`)):
            doMath();
            num1 = mathResult;
            num2 = ``;
            opSelected = btnContent;
            break;
        case (btnContent === `=`):
            doMath();
            break;
        case (((btnClass === `numButton`) || (btnContent === `.`))  && (opSelected !== ``)):
            num2 += btnContent;
            break;
        case (((btnClass === `numButton`) || (btnContent === `.`)) && (opSelected === ``)):
            num1 += btnContent;
            break;
        case (btnContent === `clr`):
            initialize();
            break;
        case ((btnContent === `«`) && (opSelected !== ``)):
            num2 = num2.substring(0, num2.length - 1);
            break;
        case ((btnContent === `«`) && (opSelected === ``)):
            num1 = num1.substring(0, num1.length - 1);
            break;
        case ((btnContent === `±`) && (opSelected !== ``)):
            num2 = `-${num2}`;
            break;
        case ((btnContent === `±`) && (opSelected === ``)):
            num1 = `-${num1}`;
            break;
        default:
            console.log(`You did something stupid and pressed: ${btnContent}`);
    }
    updateDisplay();
}

function updateDisplay(){
    switch (true) {
        case (mathResult !== ``):
            displayOutput.textContent = `${num1} ${opSelected} ${num2}`;
            resultOutput.textContent = mathResult;
            break;
        case (opSelected !== ``):
            displayOutput.textContent = `${num1} ${opSelected} ${num2}`;
            break;
        case (opSelected === ``):
            displayOutput.textContent = `${num1}`;
            break;
    }
}

//Calculator functions; Add, Sub, Mult, Div
function add(){
    mathResult = parseFloat(num1) + parseFloat(num2);
}

function subtract(){
    mathResult = parseFloat(num1) - parseFloat(num2);
}

function multiply(){
    mathResult = parseFloat(num1) * parseFloat(num2);
}

function divide(){
    mathResult = parseFloat(num1) / parseFloat(num2);
}

function doMath() {
    console.log(`math was done`);
    switch (true) {
        case (opSelected === `+`):
            add();
            break;
        case (opSelected === `-`):
            subtract();
            break;
        case (opSelected === `*`):
            multiply();
            break;
        case ((opSelected === `÷`) && (num2 == 0)):
            mathResult = `why?`;
            break;
        case (opSelected === `÷`):
            divide();
            break;
    }
    if (mathResult.toString().length > 12) {
        mathResult = mathResult.toExponential(4);
    } 

    updateDisplay();
}

//Initialization
function initialize() {
    num1 = ``;
    num2 = ``;
    mathResult = ``;
    opSelected = ``;
    displayOutput.textContent = ``;
    resultOutput.textContent = ``;
}

initialize();