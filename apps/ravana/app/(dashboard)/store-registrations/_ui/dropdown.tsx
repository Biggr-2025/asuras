import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@asuras/ui';

import { IStatus } from '../../../../types';

export default function StatusDropdown({
	status,
	id,
	execute,
	isExecuting,
}: {
	status: IStatus;
	id: number;
	execute: (payload: { id: number; status: IStatus }) => void;
	isExecuting: boolean;
}) {
	return (
		<Select
			value={status}
			onValueChange={(newStatus: IStatus) => execute({ id, status: newStatus })}
			disabled={isExecuting}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="PROCESSING">Processing</SelectItem>
				<SelectItem value="HOLD">Hold</SelectItem>
				<SelectItem value="SUCCESS">Success</SelectItem>
				<SelectItem value="FAILED">Failed</SelectItem>
			</SelectContent>
		</Select>
	);
}
