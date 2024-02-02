// Define a function to generate a markdown string based on the user's answers from the prompt.
function generateMarkdown(answers) {
  const technologiesList = answers.technologies.map(tech => `- ${tech}`).join('\n');
  return `
# ${answers.title}

## Description
${answers.description}

![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${answers.username}/${answers.repo}?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${answers.username}/${answers.repo}?style=flat&logo=appveyor)
  
Check out the badges hosted by [shields.io](https://shields.io/).

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Credits](#credits)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Features
${answers.features}

## Technologies Used
${technologiesList}

## Contributing
${answers.contributing}

## Credits
${answers.credits}

## Tests
${answers.tests}

## Questions
For any questions, please contact me at [${answers.username}](https://github.com/${answers.username}) or email me at ${answers.email}.
  
## License
This project is licensed under the ${answers.license} license.

`;
}

export { generateMarkdown };
