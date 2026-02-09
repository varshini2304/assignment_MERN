import {
  add,
  subtract,
  multiply,
  divide,
  factorial,
  isPrime,
  getPrimesUpTo,
  multiplyMatrices
} from "./calculator.js";

import prompt from "prompt-sync";

const input = prompt();

function displayMenu() {
  console.log("\n====== Math Utility Calculator ======");
  console.log("1. Add two numbers");
  console.log("2. Subtract two numbers");
  console.log("3. Multiply two numbers");
  console.log("4. Divide two numbers");
  console.log("5. Calculate factorial");
  console.log("6. Check if number is prime");
  console.log("7. Get primes up to n");
  console.log("8. Multiply two matrices");
  console.log("9. Exit");
  console.log("===================================\n");
}

function promptNumber(message) {
  return parseFloat(input(message));
}

function promptString(message) {
  return input(message);
}

function basicOperation(operation, op1, op2) {
  const a = op1 !== undefined ? op1 : promptNumber("Enter first number: ");
  const b = op2 !== undefined ? op2 : promptNumber("Enter second number: ");
  try {
    const result = operation(a, b);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

function handleFactorial() {
  try {
    const n = promptNumber("Enter a number: ");
    const result = factorial(n);
    console.log(`${n}! = ${result}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

function handlePrimeCheck() {
  try {
    const n = promptNumber("Enter a number: ");
    const result = isPrime(n);
    console.log(`${n} is ${result ? "prime" : "not prime"}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

function handlePrimesUpTo() {
  try {
    const n = promptNumber("Enter upper limit: ");
    const primes = getPrimesUpTo(n);
    console.log(`Primes up to ${n}: ${primes.join(", ")}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

function handleMatrixMultiplication() {
  try {
    console.log("\n--- Matrix A ---");
    const rowsA = promptNumber("Enter number of rows for matrix A: ");
    const colsA = promptNumber("Enter number of columns for matrix A: ");
    
    const matrixA = [];
    for (let i = 0; i < rowsA; i++) {
      const row = [];
      for (let j = 0; j < colsA; j++) {
        const value = promptNumber(`A[${i}][${j}]: `);
        row.push(value);
      }
      matrixA.push(row);
    }

    console.log("\n--- Matrix B ---");
    const colsB = promptNumber("Enter number of columns for matrix B: ");
    
    const matrixB = [];
    for (let i = 0; i < colsA; i++) {
      const row = [];
      for (let j = 0; j < colsB; j++) {
        const value = promptNumber(`B[${i}][${j}]: `);
        row.push(value);
      }
      matrixB.push(row);
    }

    const result = multiplyMatrices(matrixA, matrixB);
    console.log("\nResult Matrix:");
    result.forEach((row) => {
      console.log(row.map((val) => val.toFixed(2)).join("\t"));
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

function runCalculator() {
  console.log("Welcome to Math Utility Calculator!");
  let running = true;

  while (running) {
    displayMenu();
    const choice = promptString("Enter your choice (1-9): ");

    switch (choice) {
      case "1":
        basicOperation(add);
        break;
      case "2":
        basicOperation(subtract);
        break;
      case "3":
        basicOperation(multiply);
        break;
      case "4":
        basicOperation(divide);
        break;
      case "5":
        handleFactorial();
        break;
      case "6":
        handlePrimeCheck();
        break;
      case "7":
        handlePrimesUpTo();
        break;
      case "8":
        handleMatrixMultiplication();
        break;
      case "9":
        console.log("Thank you for using Math Utility Calculator!");
        running = false;
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

runCalculator();