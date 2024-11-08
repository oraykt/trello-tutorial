import React from "react";
import { OrgControl } from "./_components/org-control";

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
