import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})