import *- as z from 'zod';

export const patientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string(), // We'll use string for simplicity, can be z.date()
  gender: z.enum(['Male', 'Female', 'Other']),
  // Add any other fields you want to display
});

export type Patient = z.infer<typeof patientSchema>;
