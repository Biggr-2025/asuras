import { NextResponse } from 'next/server';

import { Routes } from '../../../core/primitives';

const data: ICommonTypes.INavigationItem[] = [
	{
		id: 1,
		type: 'link',
		path: '/home',
		title: 'Home',
		icon: 'House',
	},
	{
		id: 2,
		type: 'menu',
		path: '/products',
		title: 'Products',
		icon: 'ShoppingBasket',
		items: [
			{
				id: 3,
				type: 'link',
				path: `${Routes.AddProduct}`,
				title: 'Add Product',
			},
			{
				id: 4,
				type: 'link',
				path: `${Routes.ProductList}`,
				title: 'Products List',
			},
		],
	},
	{
		id: 5,
		type: 'menu',
		path: '/banner',
		title: 'Banners',
		icon: 'TicketSlash',
		items: [
			{
				id: 6,
				type: 'link',
				path: `${Routes.AddBanner}`,
				title: 'Add Banner',
			},
			{
				id: 7,
				type: 'link',
				path: `${Routes.BannerList}`,
				title: 'Banners List',
			},
		],
	},
	{
		id: 8,
		type: 'link',
		path: '/store/list',
		title: 'Store',
		icon: 'StoreIcon',
	},
	{
		id: 9,
		type: 'link',
		path: '/store-registrations',
		title: 'Store Registrations',
		icon: 'ShoppingBasket',
	},
	{
		id: 10,
		type: 'menu',
		path: '/product-utils',
		title: 'Product Utils',
		icon: 'UtilityPole',
		items: [
			{
				id: 11,
				type: 'link',
				path: `${Routes.AddDepartment}`,
				title: 'Departments',
			},
			{
				id: 12,
				type: 'link',
				path: `${Routes.AddCategory}`,
				title: 'Categories',
			},
			{
				id: 13,
				type: 'link',
				path: `${Routes.AddSubCategory}`,
				title: 'Sub Categories',
			},
			{
				id: 14,
				type: 'link',
				path: `${Routes.AddBrands}`,
				title: 'Brands',
			},
		],
	},
];

export async function GET(request: Request) {
	return NextResponse.json({ data });
}
