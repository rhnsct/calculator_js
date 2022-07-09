const operations = ["+", "-", "*", "/", "="];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

let numList = [];
let tempList = [];
let storedList = {};

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

function sortForOperate() {
    
    let firstNum = tempList[0];
    let oper = tempList[1];
    let secondNum = tempList[2];
    return operate(firstNum, oper, secondNum);
    
    
    
}

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

function appendNumList(num) {
    
    if (numList[numList.length - 1] != '.' || num != "."){
        numList.push(num);
    }
};

function joinNumList() {

    if (numList[numList.length - 1] == '.'){
        return String(numList.join(''))
    } else {
        return parseFloat(numList.join(''));
    }
   
};

function checkIfTempListEmpty() {
    if (tempList.length == 0) {
        return true
    } else{
        return false
    }
}

function appendTempList(input, oper = true) {
    let checkList = checkIfTempListEmpty();
    if (numList.length == 0 && checkList == true) {
        number = 0
    } else{
        number = joinNumList();
    };

    if (checkList == false && number != 0 && oper) {
        tempList.splice(1,1,input)        
    } else if (oper) {
        tempList.push(number);
        tempList.push(input);
    } else if (numList.length == 0) {
        tempList.push(0)
    }
    else {
        tempList.push(number);
    };
    screenUpdateLogic(0, false, true);
};

function clearLists() {
    numList = [];
    tempList = [];
};

function clearScreen() {
    clearLists();
    screenUpdateLogic("clear");
};

function deleteDigit() {
    numList.splice(-1);
    screenUpdateLogic(0, true, false);
};

function continuousInputsManager(number) {
    clearLists();
    let array = Array.from(String(number));
    array.forEach(element => {
        appendNumList(element);
    });
}

function inputResponse(input_id) {
    let input = input_id;
    if (input == "=" && tempList.length != 0) {
        appendTempList(input, false);
        let result = sortForOperate();
        screenUpdateLogic(result,false,false);
        continuousInputsManager(result);
    } else if (operations.includes(input) && input != "=") {
        appendTempList(input);
        numList = [];
    } else if (input == "clear") {
        clearScreen();
    } else if (input == "delete") {
        deleteDigit();
    } else if (input == "." && numList.length == 0) {
        appendNumList("0");
        appendNumList(input);
        screenUpdateLogic(0, true, false);
    } else if (digits.includes(input)){     
        appendNumList(input);  
        screenUpdateLogic(0, true, false);
    }
};

function respondClick(clicked_id) {
    inputResponse(clicked_id);
};

function keyListenerLogic() {
    document.addEventListener("keydown", function onEvent(event) {
        if (digits.includes(event.key) || operations.includes(event.key)) {
            inputResponse(event.key);
        
        } else if (event.key == "Enter"){
            inputResponse("=");
        } else if (event.key == "Backspace"){
            deleteDigit();
        } else if (event.key == "Escape" || event.key == "Delete"){
            clearScreen();
        };
    });
};

function screenUpdateLogic(finalValue=0, inputUpdate=false, equationUpdate=false) {
    const input = document.querySelector("#input");
    const equate = document.querySelector("#equate");
    if (inputUpdate){
        input.textContent = joinNumList();
    } else if (equationUpdate) {
        input.textContent = 0;
        equate.textContent = tempList.join("");
    } else if (finalValue == "clear") {
        input.textContent = 0;
        equate.textContent = "";
    } else {
        equate.textContent = tempList.join("");
        input.textContent = finalValue;
    };
};

keyListenerLogic()