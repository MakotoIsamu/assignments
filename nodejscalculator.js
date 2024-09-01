const crypto = require('crypto');

// Retrieve the command-line arguments
const args = process.argv.slice(2);

// Ensure at least two arguments are provided
if (args.length < 2) {
    console.error('Usage: node index.js <operation> <num1> <num2> or node index.js random <length>');
    process.exit(1);
}

const operation = args[0];
const num1 = parseFloat(args[1]);
const num2 = args.length > 2 ? parseFloat(args[2]) : null;

// Function to handle each operation
function calculate(op, a, b) {
    switch (op) {
        case 'add':
            return a + b;
        case 'sub':
            return a - b;
        case 'mult':
            return a * b;
        case 'div':
            if (b === 0) {
                throw new Error('Cannot divide by zero.');
            }
            return a / b;
        case 'sin':
            return Math.sin(a);
        case 'cos':
            return Math.cos(a);
        case 'tan':
            return Math.tan(a);
        case 'random':
            if (!b || isNaN(b)) {
                console.error('Provide length for random number generation.');
                process.exit(1);
            }
            return crypto.randomBytes(b).toString('binary');
        default:
            throw new Error('Invalid operation.');
    }
}

// Execute the operation and handle errors
try {
    const result = calculate(operation, num1, num2);
    console.log(`Result: ${result}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
