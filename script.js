const display = document.querySelector(".display");

const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const zero = document.querySelector("#zero");
const clear = document.querySelector("#clear");
const add = document.querySelector("#add");
const equals = document.querySelector("#equals");
const subtracts = document.querySelector("#subtract");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");

seven.addEventListener("click", function () {
  display.value += "7";
});

eight.addEventListener("click", function () {
  display.value += "8";
});

nine.addEventListener("click", function () {
  display.value += "9";
});

four.addEventListener("click", function () {
  display.value += "4";
});

five.addEventListener("click", function () {
  display.value += "5";
});

six.addEventListener("click", function () {
  display.value += "6";
});

one.addEventListener("click", function () {
  display.value += "1";
});

two.addEventListener("click", function () {
  display.value += "2";
});

three.addEventListener("click", function () {
  display.value += "3";
});

zero.addEventListener("click", function () {
  display.value += "0";
});

clear.addEventListener("click", function () {
  display.value = "";
});

add.addEventListener("click", function () {
  display.value += "+";
});

equals.addEventListener("click", function () {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
});

subtract.addEventListener("click", function () {
  display.value += "-";
});

multiply.addEventListener("click", function () {
  display.value += "*";
});

divide.addEventListener("click", function () {
  display.value += "/";
});
