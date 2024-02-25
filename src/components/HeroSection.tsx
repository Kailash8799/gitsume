import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
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
          <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
            Welcome to Gitsume
          </h1>
          <p className="mt-8 text-xl text-gray-800 dark:text-gray-200">Crafting the perfect resume just got easier!</p>
          <p className="mt-8 text-gray-700 dark:text-gray-300">
            Gitsume is a powerful online tool designed to help you create professional resumes that showcase your skills, experience, and achievements in the best possible light.
          </p>
          <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            <Link
              href="/create"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-white">
                Create Resume
              </span>
            </Link>

          </div>
          <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                The lowest price
              </h6>
              <p className="mt-2 text-gray-500">Some text here</p>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                The fastest on the market
              </h6>
              <p className="mt-2 text-gray-500">Some text here</p>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                The most loved
              </h6>
              <p className="mt-2 text-gray-500">Some text here</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
