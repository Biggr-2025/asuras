'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { prisma, safeActionClient } from '../../../../core/services';

const schema = z.object({
	id: z.number(),
	status: z.enum(['PROCESSING', 'SUCCESS', 'FAILED', 'HOLD']),
});

export const updateStatusAction = safeActionClient
	.schema(schema)
	.action(async ({ parsedInput }) => {
		const { id, status } = parsedInput;

		try {
			await prisma.storeRegistration.update({
				where: { id },
				data: {
					status,
				},
			});
			revalidatePath('/store-registrations');
			return {
				status: 200,
				msg: 'Status updated successfully.',
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to update status. Please try again.');
		}
	});
