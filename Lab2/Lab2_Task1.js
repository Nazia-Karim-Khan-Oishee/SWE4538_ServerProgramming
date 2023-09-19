const fs = require("fs");
const path = require("path");

console.log("Before");

const filepath = path.join(__dirname, "File.txt");

fs.readFile(filepath, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

console.log("After");
const content = "This is a new text file " + "\n";
fs.writeFileSync(filepath, content);

fs.readFile(filepath, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
fs.appendFile(filepath, "Forrest Gump ", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("New text is appended!!");
  }
});
fs.readFile(filepath, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
