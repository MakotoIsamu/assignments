const fs = require("fs");
const path = require("path");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv.slice(4).join(" "); // in case content has spaces

switch (operation) {
  case "read":
    fs.readFile(file, "utf8", (err, data) => {
      if (err) return console.log(`Error reading file: ${err.message}`);
      console.log(data);
    });
    break;
  case "append":
    fs.appendFile(file, content + "\n", (err) => {
      if (err) return console.log(`Error appending to file: ${err.message}`);
      console.log(`Content appended to the file '${file}'`);
    });
    break;
  case "delete":
    fs.unlink(file, (err) => {
      if (err) return console.log(`Error deleting file: ${err.message}`);
      console.log(`File '${file}' deleted`);
    });
    break;
  case "create":
    fs.writeFile(file, "", (err) => {
      if (err) return console.log(`Error creating file: ${err.message}`);
      console.log(`File '${file}' created`);
    });
    break;
  case "rename":
    const newFileName = content;
    fs.rename(file, newFileName, (err) => {
      if (err) return console.log(`Error renaming file: ${err.message}`);
      console.log(`File '${file}' renamed to '${newFileName}'`);
    });
    break;
  case "list":
    fs.readdir(".", (err, files) => {
      if (err) return console.log(`Error listing directory: ${err.message}`);
      console.log("List of all files and directories:");
      files.forEach((file) => console.log(file));
    });
    break;
  default:
    console.log(`Invalid operation '${operation}'`);
}
