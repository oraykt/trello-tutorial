import React from "react";

interface ClerkLayoutProps {
  children: React.ReactNode;
}

const ClerkLayout: React.FC<ClerkLayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default ClerkLayout;
