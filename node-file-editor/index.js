// Import necessary modules
const fs = require('fs');
const path = require('path');

// Retrieve command line arguments
const args = process.argv.slice(2);

// Ensure correct number of arguments
if (args.length < 2) {
    console.log('Usage: node index.js <operation> <file/dir> [<additional arguments>]');
    process.exit(1);
}

// Extract operation and target file/directory
const operation = args[0];
const target = args[1];
const additionalArgs = args.slice(2);

// Function to handle file operations
function fileOperations(operation, target, additionalArgs) {
    switch (operation) {
        case 'read':
            fs.readFile(target, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file '${target}':`, err);
                    return;
                }
                console.log(`Contents of '${target}':`);
                console.log(data);
            });
            break;
        case 'delete':
            fs.unlink(target, err => {
                if (err) {
                    console.error(`Error deleting file '${target}':`, err);
                    return;
                }
                console.log(`File '${target}' deleted.`);
            });
            break;
        case 'create':
            fs.writeFile(target, '', err => {
                if (err) {
                    console.error(`Error creating file '${target}':`, err);
                    return;
                }
                console.log(`File '${target}' created.`);
            });
            break;
        case 'append':
            const content = additionalArgs.join(' ');
            fs.appendFile(target, content + '\n', err => {
                if (err) {
                    console.error(`Error appending to file '${target}':`, err);
                    return;
                }
                console.log(`Content appended to file '${target}'.`);
            });
            break;
        case 'rename':
            if (additionalArgs.length !== 1) {
                console.error('Invalid number of arguments for rename operation.');
                return;
            }
            const newFilename = additionalArgs[0];
            fs.rename(target, newFilename, err => {
                if (err) {
                    console.error(`Error renaming file '${target}' to '${newFilename}':`, err);
                    return;
                }
                console.log(`File '${target}' renamed to '${newFilename}'.`);
            });
            break;
        case 'list':
            fs.readdir(target, (err, files) => {
                if (err) {
                    console.error(`Error listing contents of directory '${target}':`, err);
                    return;
                }
                console.log(`Contents of directory '${target}':`);
                files.forEach(file => {
                    console.log(file);
                });
            });
            break;
        default:
            console.log(`Unsupported operation: ${operation}`);
            break;
    }
}

// Execute file operation
fileOperations(operation, target, additionalArgs);
