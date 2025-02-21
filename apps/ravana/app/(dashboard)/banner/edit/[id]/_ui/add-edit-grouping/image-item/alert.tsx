import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@asuras/ui';

export function ImageItemAlert({
	isAlertOpen,
	setIsAlertOpen,
	handleDeleteConfirm,
	handleCloseDialog,
	isPending,
}: {
	isAlertOpen: boolean;
	setIsAlertOpen: (open: boolean) => void;
	handleDeleteConfirm: (event: React.MouseEvent) => void;
	handleCloseDialog: (event: React.MouseEvent) => void;
	isPending: boolean;
}) {
	return (
		<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
			<AlertDialogContent className="gap-24">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-24">Remove Banner?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to remove this banner?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="!pt-32">
					<AlertDialogCancel onClick={handleCloseDialog}>
						<span className="text-14 font-normal">Cancel</span>
					</AlertDialogCancel>
					<AlertDialogAction disabled={isPending} onClick={handleDeleteConfirm}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
