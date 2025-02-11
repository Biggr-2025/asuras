'use server';

import { gstValidator, phoneValidator } from '@asuras/utils';
import { z } from 'zod';

import { prisma, safeActionClient } from '../../../core/services';

const schema = z.object({
	storeName: z.string().min(3, { message: 'Store Name must have at least 3 characters' }),
	storeLocation: z.string().min(1, { message: 'Store Location is required' }),
	companyName: z.string().min(3, { message: 'Company Name must have at least 3 characters' }),
	ownerName: z.string().min(3, { message: 'Owner/Manager Name must have at least 3 characters' }),
	gstNo: z.string().regex(gstValidator, { message: 'GST is not valid' }),
	ownerContact: z.string().regex(phoneValidator, { message: 'Phone number is not valid' }),
});

export const signUpAction = safeActionClient.schema(schema).action(async ({ parsedInput }) => {
	const { storeName, storeLocation, companyName, ownerName, gstNo, ownerContact } = parsedInput;

	const existingOwnerContact = await prisma.storeRegistration.findFirst({
		where: { ownerContact },
	});

	if (existingOwnerContact) {
		return {
			status: 409,
			msg: 'A store with this owner contact already exists.',
		};
	}

	const existingGstNo = await prisma.storeRegistration.findFirst({
		where: { gstNo },
	});

	if (existingGstNo) {
		return {
			status: 409,
			msg: 'A store with this GST number already exists.',
		};
	}

	try {
		await prisma.storeRegistration.create({
			data: {
				storeName,
				storeLocation,
				companyName,
				ownerName,
				gstNo,
				ownerContact,
			},
		});
		return {
			status: 200,
			msg: 'We have saved your details. Our team will contact you and share the information.',
		};
	} catch (error) {
		console.error(error);
		throw new Error('Failed to save details. Please try again.');
	}
});
