// Import necessary modules from Node.js: `fs` for file system operations, and `inquirer` for interactive command line prompts.
import fs from 'fs/promises';
import inquirer from 'inquirer';
import { fetchGitHubUserInfo } from './utils/api.js'; // Importing from api.js
import { generateMarkdown } from './utils/generateMarkdown.js'; // Importing from generateMarkdown.js


// Define an asynchronous function to prompt the user for input using the inquirer module.
async function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            message: "What is your GitHub username?",
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
            message: "What is your email address?",
            name: 'email' 
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
            message: "If applicable, provide features to your project.",
            name: 'features' 
        },
        {
            type: 'input',
            message: "Provide instructions and examples of your project in use for the Usage section.",
            name: 'usage' 
        },
        {
            type: 'input',
            message: "If applicable, provide credits to your project.",
            name: 'credits' 
        },
        {
            type: 'input',
            message: "If applicable, provide any tests written for your application and provide examples on how to run them.",
            name: 'tests'
        },
        {
            type: 'input',
            message: "If applicable, provide guidelines on how other developers can contribute to your project.",
            name: 'contributing' 
        },
        {
            type: 'checkbox',
            message: "Techologies Used",
            choices: ['JavaScript', 'Python', 'React', 'Node.js', 'Docker', 'Git'], // List of technologies to choose from.
            name: 'technologies' 
        },
        {
            type: 'list',
            message: "Choose a license for your project.",
            choices: ['GNU AGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'], // List of licenses to choose from.
            name: 'license' 
        }
    ]);
}

// Define an asynchronous function to write the generated markdown content to a file.
async function writeToFile(fileName, data) {
    return fs.writeFile(fileName, data);
}

// Define an asynchronous initialization function to execute the prompt and file writing process.
async function init() {
    try {
        const answers = await promptUser();
        
        // Example of using fetchGitHubUserInfo if needed
        const userInfo = await fetchGitHubUserInfo(answers.username);
        if (userInfo) {
            answers.userInfo = userInfo;
        }
        
        const markdown = generateMarkdown(answers);
        await writeToFile("READMETest.md", markdown);
        console.log("Successfully wrote to READMETest.md");
    } catch (error) {
        console.error("Error creating READMETest.md", error);
    }
}

init(); // Execute the initialization function.
