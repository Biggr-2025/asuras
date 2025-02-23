export interface IStoreDetails {
	userId: string;
	mobile: string;
	name: string;
	active: boolean;
	addressId: string | null;
	address: IAddress;
	gender: string;
	role: string;
	category: string;
	doctorIds: string[];
	createdAt: string;
	updatedAt: string;
	logoUrl?: string;
	updatedBy: string;
	panUrl?: string;
	gstUrl?: string;
	otherDocUrl?: string;
	email?: string;
	businessContact?: number;
	ownerName?: string;
	entityName?: string;
	panNo?: string;
	gstNo?: string;
	pincodes: string[];
}
export interface IStoreRegistration {
	id: number;
	storeName: string;
	storeLocation: string;
	companyName: string;
	gstNo: string;
	ownerName: string;
	ownerContact: string;
	createdAt: string;
	updatedAt: string;
	status: IStatus;
}

export type IStatus = 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'HOLD';

export interface IAddress {
	_id: string;
	userId: string;
	pincode: string;
	line1: string;
	line2: string;
	state: string;
	district: string;
	type: string;
	lat: string;
	lng: string;
	active: boolean;
	updatedBy: string;
	createdAt: string;
	updatedAt: string;
}
