import { z } from 'zod';

export const CategoryIdSchema = z.string().uuid();

export const CreateCategorySchema = z.object({
  name: z.string().trim().min(2).max(120),
  isActive: z.boolean().optional(),
});

export const UpdateCategorySchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
