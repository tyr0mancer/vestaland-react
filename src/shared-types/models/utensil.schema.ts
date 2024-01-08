import {z} from "zod";

export const UtensilSchema = z.object({
  utensilName: z.string({required_error: "Das Utensil muss einen Namen enthalten"}),
  beschreibung: z.string().optional().describe('Optionaler Beschreibungstext'),
  volumen: z.number().optional().describe('Das Fassungsvermögen in ml'),
});
