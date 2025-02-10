declare namespace IStoreTypes {
	interface IStoreDetails {
		userId: string;
		mobile: string;
		name: string;
		active: boolean;
		addressId: string | null;
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
	}
	interface IStoreRegistration {
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
	type IStatus = 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'HOLD';
}
