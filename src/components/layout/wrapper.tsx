import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`text-black min-h-screen max-w-7xl mx-auto overflow-hidden p-6`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
