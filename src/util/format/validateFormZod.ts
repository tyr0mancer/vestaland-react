import {ZodError, ZodSchema} from "zod";

export function validateFormZod<T>(values: T, validationSchema: ZodSchema) {
  try {
    validationSchema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors;
    }
  }
}
