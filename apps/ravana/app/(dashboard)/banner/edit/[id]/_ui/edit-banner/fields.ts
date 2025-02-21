import { IFormData } from './schema';

export const fields: {
	name: keyof IFormData;
	label: string;
	type: 'text' | 'switch' | 'textarea' | 'select';
	desc?: string;
	options?: any[];
}[] = [
	{ name: 'title', label: 'Title', type: 'text' },
	{ name: 'description', label: 'Description', type: 'textarea' },
	{ name: 'bgColorCode', label: 'Background Color Code', type: 'text' },
	{
		name: 'isImage',
		label: 'Is Banner Image',
		desc: 'Check it if the banner is image.',
		type: 'switch',
	},
	{
		name: 'active',
		label: 'Is Banner Active',
		desc: 'Make it inactive if you don’t need it.',
		type: 'switch',
	},
	{
		name: 'rank',
		label: 'Banner Priority',
		type: 'select',
		options: Array.from({ length: 100 }, (_, i) => i + 1),
	},
];
