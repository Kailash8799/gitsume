"use client";
import React, { useState } from "react";
import Container from "./_components/Container";
import { Input, Spinner } from "@nextui-org/react";
import { fetchUserDataFromGitHub, fetchUserRepositories } from "@/lib/github";

export default function CreateResume() {
  const [githubuserfetching, setgithubuserfetching] = useState(false);
  const [gitusername, setgitsername] = useState("");
  // get information from the user and call github api and get data
  // call open ai api and get resume details
  // set resume data to the store
  // redirect to resume page

  const fetchGitHubInfo = async () => {
    if (gitusername.length < 1) {
      return;
    }
    setgithubuserfetching(true);
    try {
    //   await new Promise((resolve, reject) => {
    //     setTimeout(resolve, 5000);
    //   });
      const userProfile = await fetchUserDataFromGitHub(gitusername);
      const userRepositories = await fetchUserRepositories(gitusername);
    //   if(userProfile === null || userRepositories === null){
    //     throw new Error("Some error occured! while fetching github information");
    //   }
      console.log(userProfile);
      console.log(userRepositories);
    } catch (error) {
      console.log("Error",error);
    }
    setgithubuserfetching(false);
  };

  return (
    <>
      <Container>
        <div className="mx-4 sm:mx-0">
          <div className="mt-16 flex flex-wrap justify-center gap-y-4">
            <div className="flex justify-center w-full flex-wrap md:flex-nowrap gap-4">
              <div className="bg-neutral-600/50 flex items-center justify-start px-5 py-4 rounded-lg">
                <p>https://github.com/</p>
                <input
                  className="bg-transparent min-w-5 placeholder:text-opacity-40 placeholder:text-gray-300 dark:bg-transparent hover:bg-none focus:outline-none border-0"
                  type="text"
                  value={gitusername}
                  placeholder="username"
                  onChange={(e) => {
                    setgitsername(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            {githubuserfetching ? (
              <Spinner size="lg" />
            ) : (
              <div
                onClick={fetchGitHubInfo}
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <button
                  disabled={githubuserfetching}
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
