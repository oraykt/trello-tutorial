"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  type?: "submit" | "button";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
  form?: string;
  name?: string;
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
  size = "sm",
  type = "submit",
  onClick,
  onSubmit,
  form,
  name,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      className={className}
      variant={variant}
      size={size}
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      form={form}
      name={name}
    >
      {children}
    </Button>
  );
};