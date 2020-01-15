function add(a, b){

    return a + b;
}
function subtract(a, b){
    return a - b;
}
function divide(a, b){
    return a / b;
}
function multiply(a, b){
    return a * b;
}

function operate(num1, num2, operator){
    if (operator == "+"){

        return add(Number(num1), Number(num2));
    }
    if (operator == "-"){
        return subtract(num1, num2);
    }
    if (operator == "/"){
        return divide(num1, num2);
    }
    if (operator == "x"){
        return multiply(num1, num2);
    }  
}

function update(newValue){
    if (runningTotal.firstChild) {
        runningTotal.removeChild(runningTotal.firstChild);
        let screenContent = document.createElement("p");
        screenContent.textContent = newValue;
        runningTotal.appendChild(screenContent);
    }
    else {
        let screenContent = document.createElement("p");
        screenContent.textContent = 0;
        runningTotal.appendChild(screenContent);
    }
}

function log(buttonPress){
    if (buttonPress.length > 1) {
        switch (buttonPress){
            case "multiply" : 
                buttonPress = " x ";
                break;
            case "minus" : 
                buttonPress = " - ";
                break;
            case "divide" : 
                buttonPress = " / ";
                break;
            case "plus" : 
                buttonPress = " + ";
                break;
        }
    }
    displayedString = displayedString.concat(buttonPress);
    update(displayedString);
    
}

function evaluate(statement){
    let solution = 0;
    let array = statement.split(" ");
    for (i = 0; i < array.length; i++){
        if (array[i] == "+"){
            solution += operate(array[i - 1], array[i + 1], array[i]);
        }
    }
    update(solution);
}

let displayedString = ""
let total = 0;

const runningTotal = document.getElementById("screen");

const btns = document.querySelectorAll("button");
btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (btn.getAttribute("id") == "equals") {
            evaluate(displayedString);
        }
        else if (btn.getAttribute("id") == "clear") {
            update(0);
            displayedString = "";

        }
        else {
            log(btn.getAttribute("id"));  
        } 
    });
});

update(total)