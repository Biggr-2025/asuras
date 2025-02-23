import { pincodeValidator } from '@asuras/utils';
import { z } from 'zod';

export const schema = z.object({
	line1: z.string().min(3, { message: 'Line1 is required' }),
	line2: z.string().optional(),
	pincode: z.string().regex(pincodeValidator, { message: 'Pincode is not valid' }),
	state: z.string().min(1, { message: 'State is required' }),
	district: z.string().min(1, { message: 'District is required' }),
});

export type IFormData = z.infer<typeof schema>;
