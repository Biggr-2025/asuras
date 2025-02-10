import { Spinner } from '@asuras/ui';
import dynamic from 'next/dynamic';

const Listing = dynamic(() => import('./ui/list'), {
	loading: () => <Spinner />,
});

export default function Page() {
	return (
		<div className="size-full p-16">
			<div className="h-full">
				<Listing />
			</div>
		</div>
	);
}
