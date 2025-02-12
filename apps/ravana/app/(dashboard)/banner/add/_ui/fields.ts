import { BannerTypes } from '../../../../../core/primitives/constants';
import { IFormData } from './schema';

export const fields: {
	name: keyof IFormData;
	label: string;
	type: 'text' | 'select' | 'textarea';
	options?: { value: string; label: string }[];
}[] = [
	{ name: 'title', label: 'Title', type: 'text' },
	{ name: 'description', label: 'Description', type: 'textarea' },
	{
		name: 'type',
		label: 'Banner Type',
		type: 'select',
		options: BannerTypes,
	},
];
