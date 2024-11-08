"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const ProtectedPage = async () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default ProtectedPage;
