// Start Class
class Calculator {
   constructor(prev, curr) {
      this.prev = prev;
      this.curr = curr;
      this.clear();
   }
   clear() {
      this.prevOperand = "";
      this.currOperand = "";
      this.operation = undefined;
   }
   delete() {
      this.currOperand = this.currOperand.toString().slice(0, -1);
      this.updateDisplay();
   }
   appendNumber(number) {
      if (number === "." && this.currOperand.includes(".")) return;
      this.currOperand = this.currOperand + number.toString();
   }
   chooseOperation(operation) {
      if (this.currOperand === "") return;
      if (this.currOperand !== "") {
         this.compute();
      }
      this.operation = operation;
      this.prevOperand = this.currOperand;
      this.currOperand = "";
   }
   compute() {
      let result;
      let prev = parseFloat(this.prevOperand);
      let curr = parseFloat(this.currOperand);
      if (isNaN(prev) || isNaN(curr)) return;
      switch (this.operation) {
         case "+":
            result = prev + curr;
            break;
         case "-":
            result = prev - curr;
            break;
         case "x":
            result = prev * curr;
            break;
         case "÷":
            result = prev / curr;
            break;
         default:
            return;
      }
      this.currOperand = result;
      this.operation = undefined;
      this.prevOperand = "";
   }

   getDisplay(number) {
      const stringNumber = number.toString(); // current number => string
      const integerDigits = parseFloat(stringNumber.split(".")[0]); // current number => integer "right side ."
      const decimalDigits = stringNumber.split(".")[1]; // current number => decimal "left side ."
      let intergerDisplay;
      if (isNaN(integerDigits)) {
         intergerDisplay = "";
      } else {
         intergerDisplay = integerDigits.toLocaleString("en");
      }
      if (decimalDigits != null) {
         return `${intergerDisplay}.${decimalDigits}`;
      } else {
         return intergerDisplay;
      }
   }
   updateDisplay() {
      this.curr.innerText = this.getDisplay(this.currOperand);
      if (this.operation != null) {
         this.prev.innerText = `${this.prevOperand} ${this.operation}`;
      } else {
         this.prev.innerText = this.prevOperand;
      }
   }
}
//Start Variables
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const acButton = document.querySelector("[data-all-clear]");
const prevOperand = document.querySelector("[data-previous-operand]");
const currOperand = document.querySelector("[data-current-operand]");

// Start
const calculator = new Calculator(prevOperand, currOperand);

numberButtons.forEach((btn) => {
   btn.addEventListener("click", () => {
      calculator.appendNumber(btn.innerText);
      calculator.updateDisplay();
   });
});

deleteButton.addEventListener("click", () => {
   calculator.delete();
});

operationButtons.forEach((btn) => {
   btn.addEventListener("click", () => {
      calculator.chooseOperation(btn.innerText);
      calculator.updateDisplay();
   });
});

acButton.addEventListener("click", () => {
   calculator.clear();
   calculator.updateDisplay();
   11;
});

equalButton.addEventListener("click", () => {
   calculator.compute();
   calculator.updateDisplay();
});

// Start Keybord
window.addEventListener("keydown", function (event) {
   console.log(event.key);
   switch (event.key) {
      case ".":
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
         calculator.appendNumber(event.key);
         break;
      case "+":
      case "-":
         calculator.chooseOperation(event.key);
         break;
      case "*":
         calculator.chooseOperation("x");
         break;
      case "/":
         calculator.chooseOperation("÷");
         break;
      case "Enter":
         calculator.compute();
         break;
      case "Delete":
         calculator.clear();
         break;
      case "Backspace":
         calculator.delete();
         break;
   }

   calculator.updateDisplay();
});
