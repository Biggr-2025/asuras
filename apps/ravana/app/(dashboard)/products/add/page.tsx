'use client';

import { ProductForm } from '../_ui/form';

export default function Page() {
	return (
		<div className="rounded-8 m-16">
			<h2 className="text-24 mb-12 font-medium">Add a Product</h2>
			<ProductForm type="ADD" />
		</div>
	);
}
