import { z } from 'zod';

export const schema = z.object({
	title: z.string().min(3, { message: 'Title is required' }),
	description: z.string().optional(),
	quantity: z.string().min(1, { message: 'Quantity must be at least 1' }),
	packQuantity: z.string().min(1, { message: 'Pack Quantity must be at least 1' }),
	mrp: z.string().min(1, { message: 'MRP is required' }),
	price: z.string().min(1, { message: 'Price is required' }),
	gstInPercent: z.string().min(0).max(100, { message: 'GST must be between 0 and 100' }),
	hsn: z.string().min(1, { message: 'HSN is required' }),
	brandId: z
		.object({
			_id: z.string().min(1, { message: 'Brand ID is required' }),
			name: z.string().min(1, { message: 'Brand Name is required' }),
		})
		.refine((val) => val._id && val.name, { message: 'Brand is required' }),

	categoryId: z
		.object({
			_id: z.string().min(1, { message: 'Category ID is required' }),
			name: z.string().min(1, { message: 'Category Name is required' }),
		})
		.refine((val) => val._id && val.name, { message: 'Category is required' }),

	subCategoryId: z
		.object({
			_id: z.string().min(1, { message: 'Subcategory ID is required' }),
			name: z.string().min(1, { message: 'Subcategory Name is required' }),
		})
		.refine((val) => val._id && val.name, { message: 'Subcategory is required' }),

	departmentId: z
		.object({
			_id: z.string().min(1, { message: 'Department ID is required' }),
			name: z.string().min(1, { message: 'Department Name is required' }),
		})
		.refine((val) => val._id && val.name, { message: 'Department is required' }),

	colour: z.string().optional(),
	size: z.string().optional(),
	active: z.string().optional(),
	barCodeNo: z.string().optional(),
});

export type IFormData = z.infer<typeof schema>;
