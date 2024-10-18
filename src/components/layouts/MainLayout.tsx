import React from "react";
import Navbar from "../navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-fullbg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <Navbar />
      <div className="w-full">
        <div className="mx-auto min-h-screen w-full max-w-screen-lg">
          {children}
        </div>
      </div>
    </div>
  );
};
