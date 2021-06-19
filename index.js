// Packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateReadMe = require("./src/readme-template.js");

const testObj = {
    userName: 'Jake Pedigo',
    userGitHub: 'jbped',
    userEmail: 'testemail@email.com',
    projectName: 'Test Project',
    description: 'Test Description',
    installation: 'Test Install',
    usage: 'Test Usage',
    license: 'MIT License',
    credits: [
      'Contributors',
      'Third-Party Assets or Needed Attributions',
      'Tutorials/Walkthroughs'
    ],
    contributors: [
      {
        contributorName: 'Some Contributor',
        contributorGitHub: 'contributor1',
        addNewContributor: true
      },
      {
        contributorName: 'Another Contributor',
        contributorGitHub: 'contributor2',
        addNewContributor: false
      }
    ],
    thirdPartyAssets: [
      {
        thirdPartyAssetName: 'TMDB',
        thirdPartyAssetLink: 'https://www.themoviedb.org/documentation/api',
        addNewThirdPartyAsset: true
      },
      {
        thirdPartyAssetName: 'Bing Maps',
        thirdPartyAssetLink: 'https://www.bing.com',
        addNewThirdPartyAsset: false
      }
    ],
    tutorials: [
      {
        tutorialName: 'Some Guy',
        tutoriaLink: 'https://www.youtube.com',
        addNewTutorial: true
      },
      {
        tutorialName: 'Another Guy',
        tutoriaLink: 'https://www.reddit.com',
        addNewTutorial: false
      }
    ],
    confirmContributions: false,
    tests: 'There were tests made'
  }

// An array of required questions for user input
const reqQuestions = [
    {
        type:"input",
        name:"userName",
        message:"What is your name? (Required)",
        validate: nameValidate => {
            if(nameValidate) {
                return true;
            } else {
                console.log("What is your name?");
                return false;
            }
        }
    },
    {
        type:"input",
        name:"userGitHub",
        message:"What is your GitHub username? (Required)",
        validate: gitHubValidate => {
            if(gitHubValidate) {
                return true;
            } else {
                console.log("Please provide your GitHub Username.");
                return false;
            }
        }
    },
    {
        type:"input",
        name:"userEmail",
        message:"What is an email address that you can be contacted at? (Required)",
        validate: emailValidate => {
            if(emailValidate) {
                return true;
            } else {
                console.log("Please provide your Email Address.");
                return false;
            }
        }
    },
    {
        type: "input",
        name:"projectName",
        message:"What is the name of the Project? (Required)",
        validate: projectNameValidate => {
            if(projectNameValidate) {
                return true;
            } else {
                console.log("What is the name of your Project?");
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
    }
];

const secQuestions = [
    {
        type:"confirm",
        name:"confirmContributions",
        message:"Do you have any specific contribution guidelines or do you wish to use the Contributor Covenant? (Yes for Specific Requirments, No for Contributor Covenant",
        default:"false"
    },
    {
        type:"input",
        name:"contributions",
        message: "Please specify any contribution guidelines you may have:",
        when:({confirmContributions}) => {
            if (confirmContributions) {
                return true;            
            } else {
                return false;
            }
        }
    },
    {
        type:"input",
        name:"tests",
        message:"Provide any tests that were written for this project:"
    }
]
const answers = {};

// TODO: Create a function to write README file
const writeToFile = data => {
    return new Promise ((resolve, reject) => {
        fs.writeFile("./dist/README.md", data, err => {
            if (err) {
                reject(err)
                return;
            }
            resolve({
                ok:true,
                message:"Creating file... \n Your new README can be found in the dist folder."
            })
        })
    }) 
}


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
            message:"Please provide a direct link to the resource's website:"
        },
        {
            type:"confirm",
            name:"addNewThirdPartyAsset",
            message:"Would you like to credit another Third-Party Asset?"
        }
    ])
    .then(thirdPartyData => {
        readMeData.thirdPartyAssets.push(thirdPartyData);
        if(thirdPartyData.addNewThirdPartyAsset){
            return promptThirdParty(readMeData);
        }
        return readMeData;
    });
};

const promptTutorials = readMeData => {
    if(!readMeData.tutorials) {
        readMeData.tutorials = [];
    }
    return inquirer.prompt ([
        {
            type:"input",
            name:"tutorialName",
            message: "Name of the creator or website that created the tutorial/walkthrough:"
        },
        {
            type:"input",
            name:"tutoriaLink",
            message:"Please provide a direct link to the tutorial/walkthrough:"
        },
        {
            type:"confirm",
            name:"addNewTutorial",
            message:"Would you like to credit another Tutorial or Walkthrough?"
        }
    ])
    .then(tutorialData => {
        readMeData.tutorials.push(tutorialData);
        if(tutorialData.addNewTutorial){
            return promptTutorials(readMeData);
        }
        return readMeData;
    });
};

const promptSecondaryQuestions = readMeData => {
    return inquirer.prompt(secQuestions, answers)
        .then(secAnswers => {
            let newReadMe = {
                ...readMeData,
                ...secAnswers
            }
            return newReadMe
        })
}

const testInit = testObj => {
     console.log(generateReadMe(testObj));
     writeToFile(generateReadMe(testObj));
}

// Function call to initialize app -- starts with required questions
// init()
//     // If user selects to include Contributors in their Credits Section
//     .then(data => {
//         if (data.credits.includes("Contributors")) {
//             console.log("Contains contributors");
//             return promptContributors(data);
//         } else {
//             return data;
//         }
//     })    
//     // If user selects to include Third-Party Assets in their Credits Section
//     .then(data => {
//         if (data.credits.includes("Third-Party Assets or Needed Attributions")) {
//             console.log("Contains Third-Party Assets or Attribution Requirements");
//             return promptThirdParty(data);
//         } else {
//             return data;
//         }
//     })
//     // If user selects to include Tutorials or Walkthroughs in their Credits Section
//     .then (data => {
//         if (data.credits.includes("Tutorials/Walkthroughs")) {
//             console.log("Contains Tutorials");
//             return promptTutorials(data);
//         } else {
//             return data;
//         }
//     })
//     .then(data => {
//         // console.log("Fourth Then",data)
//         return promptSecondaryQuestions(data)
//     })
//     .then(data =>  {
//         console.log(data);
//         return generateReadMe(testObj);
//     })

testInit(testObj);
    // .then(data => {
    //   console.log(data)  
    // })
    // .then(data => {
    //     writeToFile(data);
    // })