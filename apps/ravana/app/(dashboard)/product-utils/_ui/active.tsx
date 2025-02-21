import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@asuras/ui';
import { cn } from '@asuras/utils';

import { useProductUtilsListContext } from '../../../../core/context/product-util';
import { ICategory } from '../../../../types';
import { useUpdateProductUtils } from '../_api/update-utils';

export default function Status({ row, type }: { row: ICategory; type: string }) {
	const { mutateAsync: updateProductUtils } = useUpdateProductUtils(row.name);
	const { refetch } = useProductUtilsListContext();

	const handleUpdateProduct = async () => {
		console.log(row);
		const payload = {
			name: row.name,
			active: row.active ? false : true,
		} as any;

		if (type === 'DEPARTMENT') {
			payload.apiKey = 'updateDepartment';
			const response = await updateProductUtils(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}

		if (type === 'CATEGORY') {
			payload.department = row.department;
			payload.apiKey = 'updateCategory';
			const response = await updateProductUtils(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}

		if (type === 'SUBCATEGORY') {
			payload.category = row.category;
			payload.apiKey = 'updateSubCategory';
			const response = await updateProductUtils(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}

		if (type === 'BRAND') {
			payload.apiKey = 'updateBrand';
			const response = await updateProductUtils(payload);
			if (response.status === 'SUCCESS') {
				refetch();
			}
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div
					className={cn(
						'!text-12 inline-block cursor-pointer rounded-full px-12 py-4 !font-semibold',
						row.active ? 'bg-primary text-white' : 'bg-red-1 text-white'
					)}
				>
					{row.active ? 'Active' : 'Inactive'}
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent className="gap-24">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-24">Update Status?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to update the status.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="!pt-32">
					<AlertDialogCancel>
						<span className="text-14 font-normal">Cancel</span>
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleUpdateProduct}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
