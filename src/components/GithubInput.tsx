"use client";
import React, { useState } from "react";
import { Input, Spinner } from "@nextui-org/react";
import { fetchUserDataFromGitHub, fetchUserRepositories } from "@/lib/github";
import { useRouter } from 'next/navigation'
import useMyStore from "@/utils/context";

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="relative" id="home">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
                >
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                </div>
                <div className="relative pt-36 ml-auto">
                    <div className="lg:w-2/3 mb-20 text-center mx-auto">
                        <div className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                                Welcome to Gitsume
                            </h1>
                            <p className="mt-8 text-xl text-gray-800 dark:text-gray-200">Crafting the perfect resume just got easier!</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default function GithubInput() {
    const [githubUserFetching, setGithubUserFetching] = useState(false);
    const [gitUsername, setGitUsername] = useState("");
    const setUser = useMyStore((state) => state.setUser);
    const setRepos = useMyStore((state) => state.setRepos);
    const router = useRouter()


    const fetchGitHubInfo = async () => {
        if (gitUsername.length < 1) {
            return;
        }
        setGithubUserFetching(true);
        try {
            const userProfile = await fetchUserDataFromGitHub(gitUsername);
            const userRepositories = await fetchUserRepositories(gitUsername);
            // console.log(userProfile);
            setUser(userProfile!);
            setRepos(userRepositories!);
            router.push('/create')
        } catch (error) {
            console.log("Error", error);
        }
        setGithubUserFetching(false);
    };

    return (
        <>
            <Container>
                <div className="mx-4 sm:mx-0">
                    <div className="flex justify-center">
                        <Input placeholder="Username" value={gitUsername} onValueChange={(s) => setGitUsername(s)} labelPlacement="outside" className="mt-10 lg:w-3/4" variant="faded" startContent={
                            <div className="pointer-events-none flex items-center w-fit">
                                <span className="text-default-600 text-small text-nowrap">github.com/</span>
                            </div>
                        } />
                    </div>

                    <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                        {githubUserFetching ? (
                            <Spinner size="lg" />
                        ) : (
                            <div
                                onClick={fetchGitHubInfo}
                                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                            >
                                <button
                                    disabled={githubUserFetching}
                                    className="relative text-base font-semibold text-white"
                                >
                                    Create Resume
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
}