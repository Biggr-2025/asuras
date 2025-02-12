import { AddBanner } from './_ui/form';

export default function Page() {
	return (
		<div className="m-16 grid grid-cols-3">
			<h2 className="text-24 col-span-3 mb-12 font-medium">Add a Banner</h2>
			<AddBanner />
		</div>
	);
}
