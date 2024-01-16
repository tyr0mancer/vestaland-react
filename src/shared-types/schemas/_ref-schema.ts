import {z, ZodType} from "zod";

export const RefType = (schema: ZodType) => z.union([z.string(), schema]).optional()

