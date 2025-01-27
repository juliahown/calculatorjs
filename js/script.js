const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let firstNumber = '';
let operation = '';
let nextNumber = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            if (nextNumber) {
                display.textContent = value;
                nextNumber = false;
            } else {
                display.textContent = display.textContent === '0' ? 
                    value : display.textContent + value;
            }
        }
        else if (value === 'C') {
            display.textContent = '0';
            firstNumber = '';
            operation = '';
            nextNumber = false;
        }
        else if (value === '+/-') {
            display.textContent = -parseFloat(display.textContent);
        }
        else if (value === '%') {
            display.textContent = parseFloat(display.textContent) / 100;
        }
        else if (['+', '-', '×', '÷'].includes(value)) {
            firstNumber = display.textContent;
            operation = value;
            nextNumber = true;
        }
        else if (value === '=') {
            const current = parseFloat(display.textContent);
            const previous = parseFloat(firstNumber);
            let result;

            switch(operation) {
                case '+':
                    result = previous + current;
                    break;
                case '-':
                    result = previous - current;
                    break;
                case '×':
                    result = previous * current;
                    break;
                case '÷':
                    result = previous / current;
                    break;
                default:
                    return;
            }

            display.textContent = result;
            operation = '';
            firstNumber = '';
            nextNumber = true;
        }
    });
});