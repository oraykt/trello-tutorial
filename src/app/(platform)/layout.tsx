import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "sonner";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  return <ClerkProvider>
    <Toaster />
    {children}
  </ClerkProvider>;
};

export default PlatformLayout;
