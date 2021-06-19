// Generates appropriate Table of Contents depending on provided information.
const tableContents = readMeData => {
    // Table of contents if there is no credit section
    if (readMeData.credits.length !== 0) {
return `* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#credits)
* [Contributions](#contributions)
* [Tests](#tests)`;
    // If there is a credit section
    } else {
return `* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributions](#contributions)
* [Tests](#tests)`
    }
}

// Generates License information dependent on the response
const licenseLogic = (license, userName) => {
    if (license === "GNU AGPLv3") {
        return `
${license} License:
Copyright &copy; ${new Date().getFullYear()} ${userName}

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program.  If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).`
    } else if (license === "GNU GPLv3" || license === "GNU LGPLv3") {
        return `
${license} License:
Copyright &copy; ${new Date().getFullYear()} ${userName}

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).`
    } else if (license === "Mozilla Public License 2.0") {
        return `
${license}:
Copyright &copy; ${new Date().getFullYear()} ${userName}

Covered Software is provided under this License on an "as is" basis, without warranty of any kind, either expressed, implied, or statutory, including, without limitation, warranties that the Covered Software is free of defects, merchantable, fit for a particular purpose or non-infringing. The entire risk as to the quality and performance of the Covered Software is with You. Should any Covered Software prove defective in any respect, You (not any Contributor) assume the cost of any necessary servicing, repair, or correction. This disclaimer of warranty constitutes an essential part of this License. No use of any Covered Software is authorized under this License except under this disclaimer.

This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at [http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/).`
    } else if (license === "Apache License 2.0") {
        return `
${license}:
Copyright ${new Date().getFullYear()} ${userName}

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

    [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.`
    } else if (license === "MIT License") {
        return `
MIT License

Copyright &copy; ${new Date().getFullYear()} ${userName}

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
    } else if (license === "Boost Software License 1.0") {
        return `
Boost Software License - Version 1.0 - August 17th, 2003

Permission is hereby granted, free of charge, to any person or organization obtaining a copy of the software and accompanying documentation covered by this license (the "Software") to use, reproduce, display, distribute, execute, and transmit the Software, and to prepare derivative works of the Software, and to permit third-parties to whom the Software is furnished to do so, all subject to the following:

The copyright notices in the Software and this entire statement, including the above license grant, this restriction and the following disclaimer, must be included in all copies of the Software, in whole or in part, and all derivative works of the Software, unless such copies or derivative works are solely in the form of machine-executable object code generated by a source language processor.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
    } else {
        return `
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to [https://unlicense.org](https://unlicense.org)`
    }
}

// Determines if a Credits section needs to be added to the Readme, if true sends passed through README data to the subCredits logic
const creditsLogic = (credits, readMeData) => {
    if (credits.length === 0) {
        return ``;
    } else {
        return `
## Credits
${subCredits(readMeData)}
        `;
    }
}

// Verifies which subsections of the Credits section need to be added. IF the section is determined to be added then the appropriate subsection logic is called to acquire the content that will be displayed.
const subCredits = readMeData => {
    const newArr = [];

    if (readMeData.contributors) {
let contrSect = `### Contributors
${contrLogic(readMeData)}`
newArr.push(contrSect)
    }
    if (readMeData.thirdPartyAssets) {
let assetsSect = `### Assets
${assetsLogic(readMeData)}`
newArr.push(assetsSect)
    }
    if (readMeData.tutorials) {
let tutorialsSect = `### Tutorials
${tutorialsLogic(readMeData)}`
newArr.push(tutorialsSect)
    }

return newArr.join("\n \n")
    
}

// Contributors Credit SubSection Logic
const contrLogic = readMeData => {
    const newArr = [];
    for (let i = 0; i < readMeData.contributors.length; i++) {
let newTemplateLiteral = 
`* [${readMeData.contributors[i].contributorName}](https://github.com/${readMeData.contributors[i].contributorGitHub})`
        // console.log("TempLit", newTemplateLiteral)
        newArr.push(newTemplateLiteral)
    }   
    return newArr.join("\n");
}

// Third-Party Assets and Resources Credit SubSection Logic
const assetsLogic = readMeData => {
    const newArr = [];
    for (let i = 0; i < readMeData.thirdPartyAssets.length; i++) {
let newTemplateLiteral = 
`* [${readMeData.thirdPartyAssets[i].thirdPartyAssetName}](${readMeData.thirdPartyAssets[i].thirdPartyAssetLink})`
        // console.log("TempLit", newTemplateLiteral)
        newArr.push(newTemplateLiteral)
    }   
    return newArr.join("\n");
}

// Tutorials Credit SubSection Logic
const tutorialsLogic = readMeData => {
    const newArr = [];
    for (let i = 0; i < readMeData.tutorials.length; i++) {
let newTemplateLiteral = 
`* [${readMeData.tutorials[i].tutorialName}](${readMeData.tutorials[i].tutoriaLink})`
        // console.log("TemdpLit", newTemplateLiteral)
        newArr.push(newTemplateLiteral)
    }   
    return newArr.join("\n");
}

// Selects the appropriate response for the Contribution section. IF confirmContributions === false, provide  Contributor Covenant.
const contributionLogic = (confirmContributions, contributions) => {
    if (!confirmContributions) {
        return `Contributions to this project follow the Contributor Covenant [additional information can be found here](https://www.contributor-covenant.org/)`
    } else {
        return `${contributions}`
    }
}

// If no information for tests was provided return blank.
const testLogic = tests => {
    if (tests === "") {
        return ``
    } else {
        return `
## Tests
${tests}
        `
    }
}

// README Template
module.exports = readMeData => {
    const { userName, userGitHub, userEmail, projectName, description, installation, usage, license, credits, confirmContributions, contributions, tests } = readMeData;
    return `
# ${projectName}
![${license} badge](https://img.shields.io/badge/license-${license.split(" ").join("_")}-green)
## Description
${description}

## Table of Contents
${tableContents(readMeData)}

## Installation
${installation}

## Usage
${usage}
${creditsLogic(credits, readMeData)}
## License
${licenseLogic(license, userName)}

## Contributions
${contributionLogic(confirmContributions, contributions)}
${testLogic(tests)}
## Questions
For any inquiries regarding ${projectName}, please contact ${userName}:
* GitHub: [${userGitHub}](https://github.com/${userGitHub})
* Email: <${userEmail}>
`
}