import { z } from "zod";

export const patientSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email(),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string(),
});

export type Patient = z.infer<typeof patientSchema>;
