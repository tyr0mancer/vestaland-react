import React from "react";
import {ZodObject} from "zod";

type CustomAutocompleteProps<T> = { name: string, label?: string, getLabel: (s: T) => string, idProp: keyof T, queryFn?: (id?: string) => Promise<T[]>, insertFn: (value: T) => Promise<T>, onChange?: (value: T | null) => void, size?: 'small' | 'medium', autoSelect?: boolean, autoFocus?: boolean, fullWidth?: boolean, newEntryFormComponent?: React.ReactElement, newValueDefault?: T, validationSchema?: ZodObject<any> }
type CustomCheckboxProps = { name: string, label: string }
