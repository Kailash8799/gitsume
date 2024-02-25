import { Repo, User } from "@/utils/types";
import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";

// Function to fetch user data from GitHub
export const fetchUserDataFromGitHub = async (username: string) => {
  try {
    let response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);
    let user: User = response.data as User;
    response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}/social_accounts`
    );
    if (response.status !== 200) {
      return null;
    }
    user.social_accounts = response.data;
    return user;
  } catch (error) {
    console.error("Error fetching user data from GitHub:", error);
    throw error;
  }
};

// Function to fetch user repositories from GitHub
export const fetchUserRepositories = async (username: string) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}/repos`
    );
    if (response.status !== 200) {
      return null;
    }
    let repositories: Repo[] = response.data as Repo[];
    repositories
      .sort((a, b) => a.stargazers_count - b.stargazers_count)
      .reverse();
    return repositories;
  } catch (error) {
    console.error("Error fetching user repositories from GitHub:", error);
    throw error;
  }
};
