import { useState } from "react";
import { validateField } from "../utils/FormValidation";

interface UseFormProps<T> {
  initialValues: T;
  validationRules?: { [K in keyof T]?: (value: string) => string };
  onSubmit: (values: T) => void;
}

export const useForm = <T extends Record<string, string>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input change
  const handleChange = (name: keyof T, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setTimeout(() => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name as string, value, values, validationRules),
      }));
    }, 700);
  };

  // Validate all fields and submit
  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    Object.keys(values).forEach((key) => {
      newErrors[key] = validateField(key, values[key], values, validationRules);
    });

    setErrors(newErrors);

    // Check if the form is valid
    if (Object.values(newErrors).every((error) => error === "")) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};
