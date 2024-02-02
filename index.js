import fs from 'fs/promises';
import inquirer from 'inquirer';

async function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            message: "What is your GitHub username? (No @ needed)",
            name: 'username',
            default: 'MrKatish',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("A valid GitHub username is required.");
                }
                return true;
            }
        },
        {
            type: 'input',
            message: "What is the name of your GitHub repo?",
            name: 'repo',
            default: 'readme-generator',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("A valid GitHub repo is required for a badge.");
                }
                return true;
            }
        },
        {
            type: 'input',
            message: "What is the title of your project?",
            name: 'title',
            default: 'Project Title',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("A valid project title is required.");
                }
                return true;
            }
        },
        {
            type: 'input',
            message: "Write a description of your project.",
            name: 'description',
            default: 'Project Description',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("A valid project description is required.");
                }
                return true;
            }
        },
        {
            type: 'input',
            message: "If applicable, describe the steps required to install your project for the Installation section.",
            name: 'installation'
        },
        {
            type: 'input',
            message: "Provide instructions and examples of your project in use for the Usage section.",
            name: 'usage'
        },
        {
            type: 'input',
            message: "If applicable, provide guidelines on how other developers can contribute to your project.",
            name: 'contributing'
        },
        {
            type: 'list',
            message: "Techologies Used",
            choices: ['JavaScript', 'Python', 'React', 'Node.js', 'Docker', 'Git'],
            name: 'technologies'
        },
        {
            type: 'list',
            message: "Choose a license for your project.",
            choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
            name: 'license'
        }
    ]);
}

function generateMarkdown(answers) {
    return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project is licensed under the ${answers.license} license.

## Technologies Use
${answers.technologies}

## Contributing
${answers.contributing}


## Questions
For any questions, please contact me at [${answers.username}](https://github.com/${answers.username}) or email me at ${answers.email}.
    `;
}

async function writeToFile(fileName, data) {
    return fs.writeFile(fileName, data);
}

async function init() {
    try {
        const answers = await promptUser();
        const markdown = generateMarkdown(answers);
        await writeToFile("READMETest.md", markdown);
        console.log("Successfully wrote to READMETest.md");
    } catch (error) {
        console.error("Error creating READMETest.md", error);
    }
}

// function call to initialize program
init();
