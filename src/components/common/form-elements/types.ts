import {FieldArrayRenderProps} from "formik";

export interface CustomFieldProps<T> {
  name: string;
  values: T;
  index?: number;
  arrayHelpers?: FieldArrayRenderProps
}
