import { z } from "zod";

const emptyStringToUndefined = z.literal('').transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export const patientSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  phoneNumber: asOptionalField(z.string().length(10, { message: "Phone number must have 10 digits." }).regex(/^\d+$/, 'String must contain only digits')),
  gender: z.enum(["Male", "Female", "Other"], { message: "Gender is required." }),
  yearOfBirth: z.number().min(1900, { message: "Year of birth must be at least 1900." }).max(new Date().getFullYear(), { message: "Year of birth cannot be in the future." }),
});

export const visitRecordSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  visitDate: z.iso.datetime(),
  filledInfo: asOptionalField(z.json()),
});

export type Patient = z.infer<typeof patientSchema>;
export type VisitRecord = z.infer<typeof visitRecordSchema>;
