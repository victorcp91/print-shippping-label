import React from "react";
import Select from "../../atoms/Select/Select";
import Label from "../../atoms/Label/Label";
import Text from "../../atoms/Text/Text";

export interface FormSelectFieldProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "onChange" | "onBlur"
  > {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  label,
  name,
  required = false,
  error,
  placeholder,
  value,
  onChange,
  onBlur,
  children,
  ...selectProps
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Select
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        {...selectProps}
      >
        {children}
      </Select>
      {error && (
        <Text id={`${name}-error`} variant="error" role="alert">
          {error}
        </Text>
      )}
    </div>
  );
};

export default FormSelectField;
