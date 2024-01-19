import {ZodError, ZodObject} from "zod";

/**
 * Formik Form Validator
 * @param values Die Warte die validiert werden sollen
 * @param schema Das ZOD Schema
 */
export const validateFormZod = <T>(values: T, schema: ZodObject<any>) => {
  try {
    schema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors;
    }
  }
};

