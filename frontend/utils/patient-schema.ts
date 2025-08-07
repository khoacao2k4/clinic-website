import { z } from "zod";

const emptyStringToUndefined = z.literal('').transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export const patientSchema = z.object({
  name: asOptionalField(z.string().min(3, { message: "Name must be at least 3 characters." })),
  email: z.email().optional(),
  gender: z.enum(["Male", "Female", "Other"], { message: "Gender is required." }),
  yearOfBirth: z.number().min(1900, { message: "Year of birth must be at least 1900." }),
  address: z.string().min(3, { message: "Address must be at least 3 characters." }),
});

export type Patient = z.infer<typeof patientSchema>;
