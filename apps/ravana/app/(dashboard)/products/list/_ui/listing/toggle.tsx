import { Button } from '@asuras/ui';

import { useProductListingContext } from '../../_context';

export default function ToggleActiveButton() {
	const { active, setActive, setPagination, pagination } = useProductListingContext();

	const toggleActive = () => {
		setActive(active === 1 ? 0 : 1);
		setPagination({ ...pagination, pageIndex: 0 });
	};

	return (
		<Button onClick={toggleActive} variant="outline" size="sm" className="px-12">
			<span className="font-medium">Show {active === 1 ? 'All' : 'Active'}</span>
		</Button>
	);
}
