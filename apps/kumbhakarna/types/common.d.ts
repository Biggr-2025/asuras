declare namespace ICommonTypes {
	interface IApiResponse<T> {
		status: 'SUCCESS' | 'ERROR';
		msg: string;
		data: T;
		statusCode: 200 | 201 | 401 | 500;
	}
	interface INavigationItem {
		id: number;
		type: 'link' | 'menu';
		path: string;
		title: string;
		items?: INavigationItem[];
		icon?: string;
	}
	type IFileWithPreview = File & { preview: string };

	interface IDropdownItem {
		label: string;
		value: string;
		department: string;
		subcategories?: ISubcategory[];
	}

	interface ISubcategory {
		label: string;
		value: string;
		department: string;
	}
}
