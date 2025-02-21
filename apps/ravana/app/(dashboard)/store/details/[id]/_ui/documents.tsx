import { useState } from 'react';
import { Accordion, Spinner } from '@asuras/ui';

import { IStoreDetails } from '../../../../../../types';
import { useGetStoreDetails } from '../_api/get-store-details';
import StoreUpload from './store-upload';

export default function StoreDetails({ id }: { id: string }) {
	const { data, isPending } = useGetStoreDetails(id);
	const details = data?.data?.store || ({} as IStoreDetails);
	const [show, setShow] = useState<string>('LOGO');

	if (isPending) {
		return <Spinner />;
	}

	return (
		<Accordion
			value={show}
			onValueChange={setShow}
			type="single"
			collapsible
			className="rounded-8 shadow-card1 bg-white"
		>
			{[
				{ label: 'LOGO', value: details?.logoUrl },
				{ label: 'GST', value: details?.gstUrl },
				{ label: 'PAN', value: details?.panUrl },
				{ label: 'OTHER', value: details?.otherDocUrl },
			].map((type) => {
				return <StoreUpload value={show} stroreId={id} key={type.label} storeType={type} />;
			})}
		</Accordion>
	);
}
