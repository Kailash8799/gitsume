import React, { Children } from "react";
import { Input } from "@nextui-org/react";

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
            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
              Shaping a world with{" "}
              <span className="text-primary dark:text-white">
                reimagination.
              </span>
            </h1>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
