// Packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer")

// An array of questions for user input
const questions = [
    {
        type: "input",
        name:"projectName",
        message:"What is the name of the Project? (Required)",
        validate: projectNameValidate => {
            if(projectNameValidate) {
                return true;
            } else {
                console.log("What is the name of your Project.");
                return false;
            }
        }
    },
    {
        type:"input",
        name:"description",
        message:"Please provide a detailed description of your Project (Required)",
        validate: projectDescriptionValidate => {
            if(projectDescriptionValidate) {
                return true;
            } else {
                console.log("A Description is required for your README file.");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "installation",
        message:"Describe the necessary steps to install your project: (Required)",
        validate: installationValidate => {
            if(installationValidate) {
                return true;
            } else {
                console.log("Please provide the necessary steps to install your project.");
                return false;
            }
        }
    },
    {
        type:"input",
        name:"usage",
        message:"Provide instructions on the proper usage and purpose of the Project: (Required)",
        validate: usageValidate => {
            if(usageValidate) {
                return true;
            } else {
                console.log("Please describe the proper usage of your project.");
                return false;
            }
        }
    },
    {
        type:"checkbox",
        name:"credits",
        message:"Select all that apply to be included in the Credits Section of the README (Required)",
        choices: ["Contributors", "Third-Party Assets or Needed Attributions", "Tutorials/Walkthroughs"],
        validate: usageValidate => {
            if(usageValidate) {
                return true;
            } else {
                console.log("Please select at least one item to Credit.");
                return false;
            }
        }
    }


];

const answers = {};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    console.log(`
    =========================================================================
     ~~~~~~~~~~~~ Hello there! Welcome to a README.md Generator ~~~~~~~~~~~~ 
    =========================================================================
    Answer the following questions regarding your current Project. Required 
    questions will be made known by "(Required)" being included at the end of
    the question. Upon completing all necessary questions a README file will 
    be created for your use. 
    =========================================================================
    `
    )
    return inquirer
        .prompt (questions, answers)
}

// Function call to initialize app
init()
    .then(data => console.log(data))