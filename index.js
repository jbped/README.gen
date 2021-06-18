// Packages needed for this application
const fs = require("fs");
const { prompt } = require("inquirer");
const inquirer = require("inquirer")

// An array of questions for user input
const reqQuestions = [
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
        type:"list",
        name:"license",
        message:"Select a License for your Project",
        choices: ["GNU AGPLv3",  "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "The Unlicense"],
        validate: licenseValidate => {
            if(licenseValidate) {
                return true;
            } else {
                console.log("Please select a license for your project.");
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
        .prompt (reqQuestions, answers)
};

const promptContributors = readMeData => {
    if(!readMeData.contributors) {
        readMeData.contributors = [];
    }
    console.log("readMeData", readMeData);
    return inquirer.prompt ([
        {
            type:"input",
            name:"contributorName",
            message: "Name of contributor:"
        },
        {
            type:"input",
            name:"contributorGitHub",
            message:"Please provide their GitHub username:"
        },
        {
            type:"confirm",
            name:"addNewContributor",
            message:"Would you like to add additional contributors?"
        }
    ])
    .then(contributorData => {
        readMeData.contributors.push(contributorData);
        if(contributorData.addNewContributor){
            return promptContributors(readMeData);
        }
        return readMeData;
    });
};

const promptThirdParty = readMeData => {
    if(!readMeData.thirdPartyAssets) {
        readMeData.thirdPartyAssets = [];
    }
    return inquirer.prompt ([
        {
            type:"input",
            name:"thirdPartyAssetName",
            message: "Name of the Third-Party Asset that was used:"
        },
        {
            type:"input",
            name:"thirdPartyAssetLink",
            message:"Please provide a link to the resource's website:"
        },
        {
            type:"confirm",
            name:"addNewContributor",
            message:"Would you like to credit another Third-Party Asset?"
        }
    ])
    .then(thirdPartyData => {
        readMeData.thirdPartyAssets.push(thirdPartyData);
        if(thirdPartyData.addNewContributor){
            return promptThirdParty(readMeData);
        }
        return readMeData;
    });
};

// Function call to initialize app
init()
    // If user selects to include Contributors in their Credits Section
    .then(data => {
        if (data.credits.includes("Contributors")) {
            console.log("Contains contributors");
            return promptContributors(data)
        } else {
            return data
        }
    })    
    // If user selects to include Third-Party Assets in their Credits Section
    .then(data => {
        if (data.credits.includes("Third-Party Assets or Needed Attributions")) {
            console.log("Contains Third-Party Assets or Attribution Requirements");
            return promptThirdParty(data)
        } else {
            return data
        }
        console.log("Second Then", data);
    })
    // If user selects to include Tutorials or Walkthroughs in their Credits Section
    .then (data => {
        console.log("Third Then", data);
    })