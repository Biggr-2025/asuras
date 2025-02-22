import { Button, Input } from '@asuras/ui';
import { cn } from '@asuras/utils';
import { Search, X } from 'lucide-react';

import { ProductSearch } from '../../../../../../../../../core/ui';
import { IProduct } from '../../../../../../../../../types';
import { useCreateStoreProduct } from '../_api/create-store-product';
import { useStoreProductsListingContext } from '../_context';

interface IStoreProductsListingHeaderProps {
	className?: string;
}

export const StoreProductsListingHeader = ({ className }: IStoreProductsListingHeaderProps) => {
	const { value, handleSearchChange, storeId, refetch } = useStoreProductsListingContext();
	const { mutateAsync: createStoreProduct } = useCreateStoreProduct();

	const handleProduct = async (product: IProduct) => {
		const payload = {
			storeId,
			productId: product?.productId,
			quantity: product?.quantity ? product?.quantity : 0,
			price: product?.price ? product?.price : 0,
			discount: 0,
			comment: '',
		};
		const response = await createStoreProduct(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<div className={cn('flex items-center justify-between gap-32 border-b p-12', className)}>
			<div className="flex-1">
				<div className="relative flex w-[520px] items-center border-b px-12">
					<Search className="mr-12 size-16 shrink-0 opacity-50" />
					<Input
						className={cn(
							'text-14 placeholder:text-muted-foreground flex h-32 w-full rounded-md border-none bg-transparent py-12 pl-0 font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50',
							className
						)}
						type="search"
						placeholder="Search for store products..."
						value={value}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleSearchChange(e.target.value)
						}
					/>
					{value.length > 0 && (
						<Button
							size="icon"
							variant="ghost"
							className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
							onClick={() => handleSearchChange('')}
						>
							<X className="text-red-1 !size-16" />
						</Button>
					)}
				</div>
			</div>
			<div className="flex flex-1 justify-end">
				<ProductSearch handleProduct={handleProduct} />
			</div>
		</div>
	);
};
