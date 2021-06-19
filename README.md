
# README.gen
![MIT License badge](https://img.shields.io/badge/license-MIT_License-green)
## Description
README.gen is a command line argument README.md file generator. It's purpose is to assist in the making of quality/professional READMEs with ease through a guided command line questions. An example of a generated README file can be found within the ./dist folder of this repository.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#credits)
* [Contributions](#contributions)
* [Tests](#tests)

## Installation
- Clone repository
- Open command line in the appropriate directory
- Enter the following command:
  - ```npm i```

## Usage
Complete the installation steps. Once the installation steps have been completed initiate the command prompts by entering ```node index``` in an active command terminal. 

Follow the prompts that appear within the command line. 
- If a question is required it will be be made apparent through the addition of "(Required)" at the end of the question. 
- For questions that request a direct link provide a complete URL including "https://www." at the beginning of the URL. 
- When questions request a GitHub account only provide the username (Example: jbped).

Once the prompts have been completed the README file will be generated and saved to the ./dist file. The file can now be retrieved and added to your project.

## Credits 
### Assets
* [Node.js](https://nodejs.org/en/)
* [Inquirer NPM](https://www.npmjs.com/package/inquirer)

## License

MIT License

Copyright &copy; 2021 Jake Pedigo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributions
Contributions to this project follow the Contributor Covenant [additional information can be found here](https://www.contributor-covenant.org/)

## Tests
A test was made to ensure that the README generation function works. 

To work the test, open the index.js and:
- Uncomment the ```testInit(testObj);``` function call
- Comment out: 
  ``` 
  init()
    // If user selects to include Contributors in their Credits Section
    .then(data => {
        if (data.credits.includes("Contributors")) {
            console.log("Contains contributors");
            return promptContributors(data);
        } else {
            return data;
        }
    })    
    // If user selects to include Third-Party Assets in their Credits Section
    .then(data => {
        if (data.credits.includes("Third-Party Assets or Needed Attributions")) {
            console.log("Contains Third-Party Assets or Attribution Requirements");
            return promptThirdParty(data);
        } else {
            return data;
        }
    })
    // If user selects to include Tutorials or Walkthroughs in their Credits Section
    .then (data => {
        if (data.credits.includes("Tutorials/Walkthroughs")) {
            console.log("Contains Tutorials");
            return promptTutorials(data);
        } else {
            return data;
        }
    })
    .then(data => {
        // console.log("Fourth Then",data)
        return promptSecondaryQuestions(data)
    })
    .then(data =>  {
        // console.log(data);
        return generateReadMe(data);
    })
    .then(data => {
        console.log("Creating file... \n Your new README can be found in the dist folder.")
        return writeToFile(data)
    });
    ```
- If you wish to edit the information that is used to generate the README that can be done by making edits or commenting out portions of:
  ```
  const testObj = {
    userName: 'Jake Pedigo',            //required question
    userGitHub: 'jbped',                //required question
    userEmail: 'testemail@email.com',   //required question
    projectName: 'Test Project',        //required question
    description: 'Test Description',    //required question
    installation: 'Test Install',       //required question
    usage: 'Test Usage',                //required question
    license: 'MIT License',             //required question
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
    confirmContributions: false,       //required question
    tests: 'There were tests made'
  }
        
## Questions
For any inquiries regarding README.gen, please contact Jake Pedigo via:
* GitHub: [jbped](https://github.com/jbped)
* Email: <pedigojacob@gmail.com>
