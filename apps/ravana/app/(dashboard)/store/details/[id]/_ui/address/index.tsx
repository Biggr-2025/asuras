import React from 'react';

import Form from './form';
import Pincodes from './pincodes';

export default function Index() {
	return (
		<div className="grid grid-cols-5 items-start gap-12">
			<Form />
			<Pincodes />
		</div>
	);
}
