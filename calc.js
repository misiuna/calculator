

class Button {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    getValue(){
        return this.value;
    }
    getElement(){
        const numberName = document.getElementById(this.name);
        return numberName;
    }
}

class Operator extends Button {
    constructor(name, value) {
        super(name, value);
    }
}

class Number extends Button {
    constructor(name, value) {
        super(name, value);
    }
}

function refreshNonNumbersStyles(){
    allOperators.forEach(operator => {
        if (operator.getElement().style.background = '#FEBE00'){
            operator.getElement().style.background = 'orange';
            operator.getElement().style.border = '1px solid black';
        }
    });
    if (percent.style.background == 'white' && percent.style.border == '2px solid black'){
        percent.style.background = '#EEEEEE';
        percent.style.border = '1px solid black';
    }
    if (clear.style.background == 'white' && clear.style.border == '2px solid black'){
        clear.style.background = '#EEEEEE';
        clear.style.border = '1px solid black';
    }
    if (del.style.background == 'white' && del.style.border == '2px solid black'){
        del.style.background = '#EEEEEE';
        del.style.border = '1px solid black';
    }
    if (equal.style.background = '#FEBE00'){
        equal.style.background = 'orange';
        equal.style.border = '1px solid black';
    }   
}

const display = document.querySelector('#display p');
const percent = document.getElementById('percent');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const equal = document.getElementById('equal');

const zero = new Number('zero', '0');
const one = new Number('one', '1');
const two = new Number('two', '2');
const three = new Number('three', '3');
const four = new Number('four', '4');
const five = new Number('five', '5');
const six = new Number('six', '6');
const seven = new Number('seven', '7');
const eight = new Number('eight', '8');
const nine = new Number('nine', '9');
const decimal = new Number('decimal', ".");
const allNumbers = [zero, one, two, three, four, five, six, seven, eight, nine, decimal];

//const divide = new Operator('divide', '/');
const divide = new Operator('divide', (x, y) => { return x /y; });
//const multiply = new Operator('multiply', '*');
const multiply = new Operator('multiply', (x, y) => { return x * y; });
//const subtract = new Operator('subtract', '-');
const subtract = new Operator('subtract', (x, y) => { return x - y; });
//const add = new Operator('add', '+');
const add = new Operator('add', (x, y) => { return x + y; });
const allOperators = [divide, multiply, subtract, add];

let curOper = '';
let prevOper = '';
let curNumb = '';
let prevNumb = '';

allNumbers.forEach(number => {
    number.getElement().addEventListener('click', () => {
        refreshNonNumbersStyles();
        if(curNumb === '0') {
            curNumb = ''; 
        }
        curNumb += number.getValue();
        display.innerHTML = curNumb;   
        //number.getElement().style.background = 'orange';   
        //number.getElement().style.transitionDuration = '1s'; 
        number.getElement().classList.add('animation');
        setTimeout(function(){
            number.getElement().classList.remove('animation');
        }, 200);
    });
});

del.addEventListener('click', () => {
    curNumb = curNumb.substring(0, curNumb.length-1);
    display.innerHTML = curNumb;
    if(curNumb === '') {
        curNumb = '0';
        display.innerHTML = curNumb;
    }
    del.style.border = '2px solid black';
    del.style.background = 'white';
})

clear.addEventListener('click', () => {
    curNumb = '0';
    curOper = '';
    display.innerHTML = curNumb;
    clear.style.border = '2px solid black';
    clear.style.background = 'white';
});

allOperators.forEach(operator => {
    operator.getElement().addEventListener('click', () => {
        prevOper = curOper;
        curOper = operator.getValue();
        if (!prevOper == ''){
            curNumb = finalCalculation(curNumb, prevNumb, prevOper);
            display.innerHTML = curNumb;
        } 
        prevNumb = curNumb;
        curNumb = '';
        
        operator.getElement().style.background = '#FEBE00';
        operator.getElement().style.border = '2px solid black';
    });
});

equal.addEventListener('click', () => {
    refreshNonNumbersStyles();
    curNumb = finalCalculation(curNumb, prevNumb, curOper);
    display.innerHTML = curNumb;
    equal.style.background = '#FEBE00';
    equal.style.border = '2px solid black';
})


percent.addEventListener('click', () => {
    percent.style.border = '2px solid black';
    percent.style.background = 'white';
    curNumb = curNumb / 100;
    display.innerHTML = curNumb;
    
});

function finalCalculation(curNumber, prevNumber, curOperator){
    let calculation = curOperator( parseFloat(prevNumber), parseFloat(curNumber));
    //const add = new Operator('add', (x, y) => {x + y});
    return calculation;
    /* let calculation;
    if (curOperator == '+') {
        calculation = parseFloat(prevNumber) + parseFloat(curNumber);
    } else if (curOperator == '-') {
        calculation = parseFloat(prevNumber) - parseFloat(curNumber);
    } else if (curOperator == '*') {
        calculation = parseFloat(prevNumber) * parseFloat(curNumber);
    } else if (curOperator == '/') {
        calculation = parseFloat(prevNumber) / parseFloat(curNumber);
    }
    return calculation; */
}
