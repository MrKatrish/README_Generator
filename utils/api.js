import axios from 'axios';

async function fetchGitHubUserInfo(username) {
    const url = `https://api.github.com/users/${username}`;
    try {
        const response = await axios.get(url);
        return response.data; // Return the user data
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`GitHub user not found for username: ${username}`);
        } else {
            console.error(`Error fetching GitHub user info for ${username}:`, error.message);
        }
        return null; // Return null or an appropriate error handling
    }
}

export { fetchGitHubUserInfo };
