"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { FormErrors } from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      required,
      disabled,
      value,
      errors,
      className,
      defaultValue,
      onBlur,
      // onChange,
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label htmlFor={id} className="text-sm font-semibold text-neutral-700">
              {label}
            </Label>
          )}
        </div>
        <div>
          <Input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value}
            className={cn(
              "text-sm px-2 py-1 h-7",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
            onBlur={onBlur}
            // onChange={onChange}
            ref={ref}
          />
        </div>
        <FormErrors
          id={id}
          errors={errors}
        />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
