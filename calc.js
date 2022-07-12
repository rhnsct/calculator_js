const operations = ["+", "-", "*", "/", "="];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
let resulting = false
let numList = [];
let tempList = [];
let storedList = {};

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a*b;
};

function divide(a, b) {
    if (b == 0) {
        alert("You can't divide by 0!");
    } else {
        return a / b
    };
};

function sortForOperate() {
    // organises tempList array items for use in 
    // operate() function
    let firstNum = tempList[0];
    let oper = tempList[1];
    let secondNum = tempList[2];
    return operate(firstNum, oper, secondNum);
};

function operate(a, operator, b) {
    let result = 0
    if (operator == "+") {
        result = add(a, b);
    } else if (operator == "-") {
        result = subtract(a, b);
    } else if (operator == "*") {
        result = multiply(a, b);
    } else if (operator == "/") {
        result = divide(a, b);
    };
    scrollToTop(result, a, operator, b)
    return result
};

function appendNumList(num) {
    // pushes numbers to numList and decimals if
    // there are no other decimals
    if (!numList.includes('.') || num != ".") {
        numList.push(num);
    }
};

function joinNumList() {
    // merges items in numList for use by other 
    // functions
    
    if (numList[numList.length - 1] == '.') {
        return String(numList.join(''))
    } else if (numList.includes('.') && numList[numList.length - 1] == 0){
        
        return String(numList.join(''))
    } else if (numList.length == 0) {
        return 0
    }
    else {
        return parseFloat(numList.join(''));
    }
};

function checkIfTempListEmpty() {
    if (tempList.length == 0) {
        return true
    } else {
        return false
    }
}

function appendTempList(input, oper = true) {
    // takes an input and decides if it should append
    // it to tempList or replace the current existing 
    // operator
    let checkList = checkIfTempListEmpty();
    if (numList.length == 0 && checkList == true) {
        number = 0;
    } else {
        number = joinNumList();
    };
    let l1 = numList.length
    let l2 =tempList.length
    if (operations.includes(input) && numList.length > 0 && tempList.length > 0) {
        tempList.push(joinNumList())
    }
    else if (checkList == false && number != 0 && oper) {
        tempList.splice(1, 1, input)
    } else if (oper) {
        tempList.push(number);
        tempList.push(input);
    } else if (numList.length == 0) {

        tempList.push(0)
    } else {

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
    // deletes most recent inputted digit or
    // decimal
    numList.splice(-1);
    if (numList.length == 0) {
        screenUpdateLogic(0, false, false);
    } else {
        screenUpdateLogic(0, true, false);
    }
};

function continuousInputsManager(number, bool) {
    // makes sure you can continue using the number
    // you get as a result from operation
    clearLists();
    let array = Array.from(String(number));
    array.forEach(element => {
        appendNumList(element);
    });
    resulting = bool
}

function inputResponse(input_id) {
    // deals with all inputs and decides which function
    // to call, based on the input
    let input = input_id;
    if (resulting && digits.includes(input) && input != '.') {
        clearLists()
        appendNumList(input)
        resulting = false
        screenUpdateLogic(0, true, false)
    } else if (operations.includes(input) && tempList.length > 0 && numList.length > 0 && input != '=') {
        appendTempList(input);
        let result = sortForOperate()
        clearLists()
        tempList.push(result)
        tempList.push(input)
        
        screenUpdateLogic(0, false, true)
        screenUpdateLogic(0, true, false)
        

    }
    else if (input == "=" && tempList.length != 0) {
        appendTempList(input, false);
        let result = sortForOperate();
        screenUpdateLogic(result, false, false);
        continuousInputsManager(result, true);
    } else if (operations.includes(input) && input != "=") {
        appendTempList(input);
        numList = [];
        resulting = false;
    } else if (input == "clear") {
        clearScreen();
        resulting = false;
    } else if (input == "delete") {
        deleteDigit();
    } else if (input == "." && numList.length == 0) {
        
        appendNumList("0");
        appendNumList(input);
       
        screenUpdateLogic(0, true, false);
        resulting = false;
    } else if (digits.includes(input)) {
        appendNumList(input);
        screenUpdateLogic(0, true, false);
        resulting = false;
    };
};




function respondClick(clicked_id) {
    // click response to get id from html
    inputResponse(clicked_id);
};

function respondMemoryClick(clicked_id) {
    // brings numbers saved to localStorage to the input field, replacing whatever is there
    let thisResult = document.getElementById(`${clicked_id}result`);
    numList = [];
    let array = Array.from(String(thisResult.textContent));
    array.forEach(element => {
        appendNumList(element);
    });
    if (window.innerWidth <= 920 && window.innerHeight <= 1370) {
        
        if (window.orientation == 0) {
            
            checkStateMobile('opened')
        }
    };
    screenUpdateLogic(0, true, false)
    
}

function keyListenerLogic() {
    // keyboard response for picking up keystrokes, so you can
    // type inputs
    document.addEventListener("keydown", function onEvent(event) {
        changeInputDir()
        if (digits.includes(event.key) || operations.includes(event.key)) {
            inputResponse(event.key);
        } else if (event.key == "Enter") {
            changeInputDir(true)
            inputResponse("=");
        } else if (event.key == "Backspace" || event.key == "Delete") {
            deleteDigit();
        } else if (event.key == "Escape"  || event.key == "c") {
            clearScreen();
        };
    });
};

function changeInputDir(forward = false) {
    let inner = document.getElementById('input')
    if (forward) {
        inner.dir = 'ltr'
    } else {
        inner.dir = 'rtl'
    }3123
}

function screenUpdateLogic(finalValue = 0, inputUpdate = false, equationUpdate = false) {
    // refreshes the calculator display so you can see you inputs
    let input = document.querySelector("#input");
    let equate = document.querySelector("#equate");
    if (inputUpdate) {
        let text = joinNumList()
        changeInputDir(true)
        input.textContent = text;
        
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

keyListenerLogic(); // Running Key listener

