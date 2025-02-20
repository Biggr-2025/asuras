export interface IApiResponse<T> {
	status: 'SUCCESS' | 'ERROR';
	msg: string;
	data: T;
	statusCode: 200 | 201 | 401 | 500;
}
export interface INavigationItem {
	id: number;
	type: 'link' | 'menu';
	path: string;
	title: string;
	items?: INavigationItem[];
	icon?: string;
}
export type IFileWithPreview = File & { preview: string };

export interface IDropdownItem {
	label: string;
	value: string;
	department: string;
	subcategories?: ISubcategory[];
}

export interface ISubcategory {
	label: string;
	value: string;
	department: string;
}
