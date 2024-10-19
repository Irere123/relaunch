import React from "react";

import Nav from "../nav";
import Footer from "../footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-16">
        <div className="mx-auto min-h-screen w-full max-w-screen-lg">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};
