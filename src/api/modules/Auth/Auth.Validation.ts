import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(6).max(15),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
  });
