import React from "react";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import Text from "../../atoms/Text/Text";

export interface FormFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onBlur"
  > {
  label: string;
  required?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  onChange,
  onBlur,
  ...inputProps
}) => {
  const fieldId = inputProps.id || inputProps.name;

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      <Input
        id={fieldId}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <Text id={`${fieldId}-error`} variant="error" role="alert">
          {error}
        </Text>
      )}
    </div>
  );
};

export default FormField;
