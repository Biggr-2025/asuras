import { Accordion, Spinner } from '@asuras/ui';
import { useParams } from 'next/navigation';

import { IProduct, ISpecifications } from '../../../../../../../types';
import { useGetProductById } from '../../_api';
import { useEditProduct } from '../../_context/edit-product';
import AttributeForm from './add-edit-attribute';
import Attributes from './attributes';

type IAttributeItem = [name: string, value: string, data: ISpecifications[]];

export default function AttributesList() {
	const params = useParams();
	const { data, isPending, refetch } = useGetProductById(params?.id as string);
	const productData = data?.data?.product || ({} as IProduct);
	const { showForm } = useEditProduct();

	const attributes: IAttributeItem[] = [
		['productSpecification', 'Product Specifications', productData.productSpecification],
		['productDescription', 'Product Description', productData.productDescription],
		['aboutThisItem', 'About Product', productData.aboutThisItem],
		['topHighlights', 'Top Highlights', productData.topHighlights],
		['additionalInformation', 'Additional Information', productData.additionalInformation],
		['technicalDetails', 'Technical Details', productData.technicalDetails],
		['whatIsInTheBox', 'What Is In The Box', productData.whatIsInTheBox],
		['dimensions', 'Dimensions', productData.dimensions],
	];

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="grid grid-cols-3 items-start gap-12">
			<Accordion
				className="shadow-card1 rounded-12 col-span-2 bg-white p-12"
				type="single"
				collapsible
			>
				{attributes.map(([name, title, data]) => {
					return (
						<Attributes
							id={params?.id as string}
							key={name}
							name={name}
							title={title}
							data={data}
							refetch={refetch}
						/>
					);
				})}
			</Accordion>
			{showForm && <AttributeForm id={params?.id as string} refetch={refetch} />}
		</div>
	);
}
