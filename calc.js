let operations = ["+", "-", "*", "/"];
let numList = [];
let tempList = [];
let storedList = {}


function add(a, b) {
    return a+b;
};

function subtract(a, b) {
    return a-b;
};

function multiply(a, b) {
    return a*b;
};

function divide(a, b) {
    if (b == 0) {
        alert("You can't divide by 0!");
        
    } else {
        return a/b
    };
    
};

function appendNumList(num) {
    numList.push(num);
};

function joinNumList() {
    let number = parseFloat(numList.join(''));
    numList.splice(0)
    appendTempList(number); 
};

function appendTempList(input) {
    tempList.push(input);
};

function operate(a, operator, b) {
    if (operator == "+") {
        return add(a,b);
    } else if (operator == "-") {
        return subtract(a,b);
    } else if (operator == "*") {
        return multiply(a,b);
    } else if (operator == "/"){
        return divide(a,b);
    };
};

function clearLists() {
    numList = []
    tempList = []
}

function clearScreen() {
    alert("clear");
};

function deleteDigit() {
    numList.splice(-1);
};

function sortForOperate() {
    let firstNum = tempList[0];
    let oper = tempList[1];
    let secondNum = tempList[2];

    return operate(firstNum, oper, secondNum)
}

function inputResponse(input_id) {
    let input = input_id;
    console.log(input)
    if (input == "=") {
        joinNumList()
        
        alert(sortForOperate())
        clearLists()
    } else if (operations.includes(input)) {
        joinNumList();
        appendTempList(input);
    } else if (input == "clear") {
        clearScreen()
    } else if (input == "delete") {
        deleteDigit()
    } else {
        appendNumList(input);
    };
    

};

function respondClick(clicked_id) {
    inputResponse(clicked_id);
};