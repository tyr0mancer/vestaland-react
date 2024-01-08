import {z} from "zod";

export const LebensmittelSchema = z.object({
  name: z.string({required_error: "Das Lebensmittel muss einen Namen enthalten"}),
});
