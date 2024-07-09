// Import necessary modules
const crypto = require('crypto');

// Retrieve command line arguments
const args = process.argv.slice(2);

// Ensure correct number of arguments
if (args.length < 1) {
    console.log('Usage: node index.js <operation> <operand1> [<operand2> ...]');
    process.exit(1);
}

// Extract operation and operands
const operation = args[0];
const operands = args.slice(1).map(arg => parseFloat(arg)); // Parse operands as floats

// Function to generate a random number of specified length
function generateRandomNumber(length) {
    if (!length || isNaN(length)) {
        console.log('Provide length for random number generation.');
        return;
    }
    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    const randomNumber = parseInt(bytes.toString('hex').slice(0, length));
    console.log(`Generated random number of length ${length}: ${randomNumber}`);
}

// Perform calculation based on operation
switch (operation) {
    case 'add':
        console.log(operands.reduce((a, b) => a + b, 0));
        break;
    case 'sub':
        console.log(operands.reduce((a, b) => a - b));
        break;
    case 'mult':
        console.log(operands.reduce((a, b) => a * b, 1));
        break;
    case 'divide':
        if (operands.length < 2 || operands[1] === 0) {
            console.log('Invalid division operation: divide by zero or insufficient operands.');
        } else {
            console.log(operands.reduce((a, b) => a / b));
        }
        break;
    case 'sin':
        console.log(Math.sin(operands[0]));
        break;
    case 'cos':
        console.log(Math.cos(operands[0]));
        break;
    case 'tan':
        console.log(Math.tan(operands[0]));
        break;
    case 'random':
        generateRandomNumber(operands[0]);
        break;
    default:
        console.log(`Unsupported operation: ${operation}`);
        break;
}
