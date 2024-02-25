export interface Repo {
    name: string;
    html_url: string;
    homepage: string;
    description: string;
    language: string;
    fork_count: number;
    stargazers_count: number;
    topics: string[];
    created_at: string;
    allLanguages: string[];
    checked: boolean;
}

export interface UserExperience {
    title: string;
    company: string;
    location: string;
    date_range: string;
    description: string;
}
export interface Education {
    school: string;
    degree: string;
    major: string;
    date_range: string;
    description: string;
}
export interface User {
    avatar_url: string;
    html_url: string;
    name: string;
    blog: string;
    location: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    email: string;
    social_accounts: { provider: string, url: string }[];
    experiences: UserExperience[];
    skills: string[];
    education: Education[];
}

