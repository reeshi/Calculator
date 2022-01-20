var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");
var operand1 = null;
var operand2 = null;
var operator = null;

function operation(value) {
    // operators
    if ((value == "+" || value == "-" || value == "/" || value == "*")) {

        if (display.innerText.length != 0) {
            operator = value;
            operand1 = parseFloat(display.textContent);
            display.innerText = "";
        }

    } else if (value == "=" || value == "Enter") {

        if (display.innerText.length != 0) {
            operand2 = parseFloat(display.textContent);
            if (operator == "/" && operand2 == 0) {
                display.innerText = "ERROR";
            } else {
                var result = eval(operand1 + operator + "(" + operand2 + ")");
                display.innerText = Number.isInteger(result) ? result : result.toFixed(5);
            }
        }

    } else if (value == "AC" || value == "Backspace") {
        display.innerText = "";
        operand2 = operand1 = operator = null;
    } else if (value == "%") {
        if (display.innerText.length != 0) {
            var value = parseFloat(display.textContent);
            display.innerText = value / 100;
        }
    } else if (value == "+/-") {
        if (display.innerText.length != 0) {
            var content = display.textContent;
            if (content[0] != "-") {
                display.innerText = "-" + content;
            } else {
                display.innerText = content.substring(1);
            }
        }
    } else {
        if (display.textContent == "ERROR") {
            display.innerText = "";
        }
        display.innerText += value;
    }
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var value = this.getAttribute("data-value");
        operation(value);
    });
}

document.body.addEventListener("keydown", function (e) {
    if ((e.key >= 0 && e.key <= 9 && e.key != " ") || e.key == "+" || e.key == "-" || e.key == "/" || e.key == "*" || e.key == "." || e.key == "Enter" || e.key == "Backspace" || e.key == "=" || e.key == "%") {
        operation(e.key);
    }
});

