export interface IProduct {
	_id: string;
	title: string;
	productId: string;
	description: string;
	quantity: number;
	mrp: number;
	price: number;
	gstInPercent: number;
	brand: string;
	category: string;
	subcategory: string;
	colour: string;
	size: string;
	tags: string[];
	updatedBy: string;
	active: boolean;
	images: IProductImage[];
	productSpecification: ISpecifications[];
	productDescription: ISpecifications[];
	aboutThisItem: ISpecifications[];
	topHighlights: ISpecifications[];
	additionalInformation: ISpecifications[];
	technicalDetails: ISpecifications[];
	whatIsInTheBox: ISpecifications[];
	createdAt: string;
	updatedAt: string;
	hsn: string;
	packQuantity: number;
	productVariantIds?: string[];
	dimensions: ISpecifications[];
	department: string;
	barCodeNo: string;
}

export interface IProductImage {
	smallUrl: string;
	mediumUrl: string;
	largeUrl: string;
	priority: number;
	active: boolean;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface ISpecifications {
	key: string;
	value: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
}
export interface IBanner {
	_id: string;
	title: string;
	description: string;
	type: string;
	rank: number;
}
export interface IBannerDetails {
	title: string;
	description: string;
	type: string;
	active: boolean;
	updatedBy: string;
	groups: IBannerImage[];
	createdAt: string;
	updatedAt: string;
	_id: string;
	bgColorCode: null | string;
	isImage: boolean;
	iconUrl: string | null;
	rank: number;
}
export interface IBannerImage {
	title: string;
	description: string;
	url: string;
	xPriority: number;
	yPriority: number;
	productIds: string[];
	active: boolean;
	_id: string;
	createdAt: string;
	updatedAt: string;
	brands: string[];
	departments: string[];
	categories: string[];
	subCategories: string[];
}
export interface IStore {
	mobile: string;
	name: string;
	userId: string;
	_id: string;
}

export interface IStoreProducts {
	_id: string;
	storeProductId: string;
	storeId: string;
	productId: string;
	status: 'ADDED' | 'APPROVED' | 'HOLD';
	quantity: number;
	price: number;
	discount: number;
	comment: string | null;
	active: boolean;
	product: IStoreProduct;
}

export interface IStoreProduct {
	productId: string;
	title: string;
	packQuantity: number;
	gstInPercent: number;
	hsn: string;
	mrp: number;
	brand: string;
	category: string;
	colour: string;
	size: string;
}
export interface ICategory {
	_id: string;
	name: string;
	department?: string;
	category?: string;
	image: ICategoryImage;
	active: boolean;
}
export interface ICategoryImage {
	smallUrl: string | null;
	mediumUrl: string | null;
	largeUrl: string | null;
	iconUrl: string | null;
	active: boolean;
	_id: string;
	createdAt: string;
	updatedAt: string;
}
