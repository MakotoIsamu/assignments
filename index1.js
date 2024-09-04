const crypto = require('crypto');
const fs = require('fs');
const os = require('os');

// Function to encrypt a string using crypto
const encryptString = (text) => {
  const cipher = crypto.createCipher('aes-256-cbc', 'secretKey');
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  console.log(`Encrypted String: ${encrypted}`);
};

// Function to generate a random string using UUID
const generateUUID = () => {
  const uuid = crypto.randomUUID();
  console.log(`Generated UUID: ${uuid}`);
};

// Function to read a large text file using streams
const readFileWithStream = (filePath) => {
  const startTime = Date.now();
  const readStream = fs.createReadStream(filePath, 'utf8');

  readStream.on('data', (chunk) => {});
  readStream.on('end', () => {
    const endTime = Date.now();
    console.log(`Time taken with Stream: ${endTime - startTime} ms`);
  });
};

// Function to read a file using fs.readFile (non-stream)
const readFileWithoutStream = (filePath) => {
  const startTime = Date.now();
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    const endTime = Date.now();
    console.log(`Time taken with fs.readFile: ${endTime - startTime} ms`);
  });
};

// Function to print system details using os module
const printSystemDetails = () => {
  console.log('System Details:');
  console.log(`Operating System: ${os.type()}`);
  console.log(`Platform: ${os.platform()}`);
  console.log(`CPU Architecture: ${os.arch()}`);
  console.log(`Total Memory: ${os.totalmem()}`);
  console.log(`Free Memory: ${os.freemem()}`);
  console.log(`Host Name: ${os.hostname()}`);
  console.log(`Uptime: ${os.uptime()}`);
};

// Command-line argument handling
const operation = process.argv[2];
const filePath = process.argv[3];

switch (operation) {
  case 'encrypt':
    encryptString('Hello, Good Morning');
    break;
  case 'uuid':
    generateUUID();
    break;
  case 'readStream':
    readFileWithStream(filePath);
    break;
  case 'readFile':
    readFileWithoutStream(filePath);
    break;
  case 'sysDetails':
    printSystemDetails();
    break;
  default:
    console.log('Invalid operation!');
}
