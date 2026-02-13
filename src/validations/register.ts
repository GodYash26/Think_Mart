
import { z } from "zod";
import { loginSchema } from "./auth";

export const registerSchema = z.object({
  fullname: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(5, "Address required"),
  phone: z.string().min(7, "Phone required"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;