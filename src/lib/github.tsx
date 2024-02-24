import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

// Function to fetch user data from GitHub
export const fetchUserDataFromGitHub = async (username: string) => {
    try {
        const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data from GitHub:', error);
        throw error;
    }
};

// Function to fetch user repositories from GitHub
export const fetchUserRepositories = async (username: string) => {
    try {
        const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}/repos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user repositories from GitHub:', error);
        throw error;
    }
};
