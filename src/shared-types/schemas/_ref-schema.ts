import {z, ZodObject} from "zod";

export const RefType = (schema: ZodObject<any>) => z.union([z.string(), schema.partial()]).optional()
