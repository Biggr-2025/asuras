import React from 'react';

import Pincodes from './pincodes';

export default function Index() {
	return (
		<div className="grid grid-cols-5 items-start gap-12">
			<div className="rounded-8 shadow-card1 col-span-3 bg-white p-12">col1</div>
			<Pincodes />
		</div>
	);
}
