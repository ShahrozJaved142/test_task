
import { emailRegex } from "./ValidationExpressions";

interface ValidationRules {
    [key: string]: (value: string, values?: Record<string, string>) => string;
}
export const defaultValidationRules: ValidationRules = {

    email: (value: string) => {
        if (!value) return "Email is required";
        return emailRegex.test(value) ? "" : "Invalid email format";
    },

    password: (value: string) => {
        if (!value) return "Password is required";
        if (value.length < 6) return "Confirm password must be at least 6 characters";
        return ''

    },

    confirmPassword: (value: string, values?: Record<string, string>) => {
        if (!value) return "Confirm password is required";
        if (value.length < 6) return "Confirm password must be at least 6 characters";
        if (values?.password && value !== values.password) return "Password & confirm password do not match";
        return "";
    },

    name: (value: string) => {
        return value.trim() ? "" : "Name is required";
    },
    age: (value: string) => {
        return value.trim() ? "" : "Age is required";
    },

    otp: (value: string) => {
        if (!value) return "OTP is required";
        return /^[0-9]{4}$/.test(value) ? "" : "OTP must be exactly 4 digits";
    },

    default: (value: string) => {
        return value.trim() ? "" : "This field is required";
    },
};

export const validateField = (
    name: string,
    value: string,
    values?: Record<string, string>,
    customRules?: Partial<ValidationRules>
): string => {
    const rules = { ...defaultValidationRules, ...customRules };
    const validate = rules[name] || rules.default;
    return validate ? validate(value, values) : "Validation rule not found";
};
