import React from "react";

const Container = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>): React.ReactNode => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">{children}</div>
  );
};

export default Container;