// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer")
// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name:"projectName",
        message:"What is the name of the Project? (Required)",
        validate: projectNameValidate => {
            if(projectNameValidate) {
                return true;
            } else {
                console.log("Please provide a name for your Project.");
                return false;
            }
        }

    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    return inquirer
        .prompt (questions, answers)
}

// Function call to initialize app
init()
    .then(data => console.log(data))