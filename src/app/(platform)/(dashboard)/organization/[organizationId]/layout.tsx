import React from "react";
import { OrgControl } from "./_components/org-control";
import { startCase } from "lodash";
import { auth } from "@clerk/nextjs";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization"),
  }
}

interface OrganizationIdLayoutProps {
  children: React.ReactNode;
}

const OrganizationIdLayout: React.FC<OrganizationIdLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
