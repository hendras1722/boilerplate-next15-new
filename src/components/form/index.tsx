"use client";

import React, { createContext, useContext, ReactNode, ReactElement } from "react";
import {
  useForm,
  FormProvider,
  useFormContext as useRHFContext,
  Controller,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  DefaultValues,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

// ---------------------------
// Types
// ---------------------------
interface FormProps<T extends FieldValues> {
  children: ReactNode | ((methods: UseFormReturn<T> & { submit: () => void }) => ReactNode);
  onSubmit: SubmitHandler<T>;
  schema?: ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  className?: string;
}

interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  children: ReactElement;
  rules?: object;
}

// ---------------------------
// Context
// ---------------------------
const FormContext = createContext<UseFormReturn<any> | null>(null);

// ---------------------------
// Form Component
// ---------------------------
export const Form = <T extends FieldValues>({
  children,
  onSubmit,
  schema,
  defaultValues,
  className = "",
}: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: schema ? (zodResolver(schema as any) as any) : undefined,
    defaultValues,
    mode: "onChange",
  });

  const submit = () => {
    methods.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={methods}>
        <div className={className}>
          {typeof children === "function" ? children({ ...methods, submit }) : children}
        </div>
      </FormContext.Provider>
    </FormProvider>
  );
};

// ---------------------------
// FormField Component
// ---------------------------
export const FormField = ({
  name,
  label,
  required = false,
  className = "",
  children,
  rules = {},
}: FormFieldProps) => {
  const {
    formState: { errors },
  } = useRHFContext();

  const error = name
    .split(".")
    .reduce((obj: any, key) => (obj && obj[key] ? obj[key] : undefined), errors);

  const fieldRules = {
    ...rules,
    ...(required && { required: `${label || name} wajib diisi` }),
  };

  if (!children) {
    throw new Error("FormField requires children. Use <FormField name='...'><input /></FormField>");
  }

  return (
    <Controller
      name={name}
      rules={fieldRules}
      render={({ field }) => (
        <div className={`mb-4 ${className}`}>
          {label && (
            <label htmlFor={name} className="block text-sm font-medium mb-1 text-white">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {React.cloneElement(children, {
            ...field,
            id: name,
            "aria-invalid": !!error,
            "aria-describedby": error ? `${name}-error` : undefined,
          })}
          {error && (
            <p id={`${name}-error`} className="mt-1 text-sm text-red-400">
              {(error.message || "Field tidak valid") as string}
            </p>
          )}
        </div>
      )}
    />
  );
};

// ---------------------------
// useFormContext
// ---------------------------
export const useFormContext = <T extends FieldValues = FieldValues>(): UseFormReturn<T> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form component");
  }
  return context as UseFormReturn<T>;
};

// ---------------------------
// useFormField (Dynamic Array)
// ---------------------------
export const useFormField = (name: string) => {
  const methods                                                         = useRHFContext(); // pakai FormProvider react-hook-form
  const { fields, append, remove, insert, update, prepend, swap, move } = useFieldArray({
    control: methods.control,
    name,
  });

  return {
    fields,
    append,
    remove,
    insert,
    update,
    prepend,
    swap,
    move,
  };
};
