import Calculator from './classes/Calculator.js';

const form = document.querySelector('#calculator');

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    form.addEventListener('submit', calculator.calculateDifference);
});