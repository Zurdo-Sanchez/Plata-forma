import { z } from 'zod';

const passwordSchema = z.string().min(6);

export const RegisterSchema = z.object({
  email: z.string().trim().email(),
  password: passwordSchema,
});

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: passwordSchema,
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
