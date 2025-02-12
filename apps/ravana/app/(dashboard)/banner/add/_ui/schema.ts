import { z } from 'zod';

export const bannerSchema = z.object({
	title: z.string().min(3, { message: 'Title is required' }),
	description: z.string().min(6, { message: 'Description is required' }),
	type: z.string().min(1, { message: 'Type is required' }),
});

export type IFormData = z.infer<typeof bannerSchema>;
