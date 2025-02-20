import { z } from 'zod';

export type IFormData = {
	priority: string;
	active: string;
};

export const schema = z.object({
	priority: z.string().min(1, { message: 'Priority is required' }),
	active: z.string().min(1, { message: 'Type is required' }),
});
