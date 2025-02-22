import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@asuras/ui';
import { LogOutIcon } from 'lucide-react';

import { logout } from '../../helpers';

export default function SidebarLogout() {
	const handleLogout = () => {
		logout();
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton className="p-0" asChild>
					<AlertDialog>
						<AlertDialogTrigger className="flex w-full items-center gap-12 py-12">
							<LogOutIcon width={16} height={16} />
							<span className="text-14 font-medium">Logout</span>
						</AlertDialogTrigger>
						<AlertDialogContent className="gap-24">
							<AlertDialogHeader>
								<AlertDialogTitle className="text-24">Logout</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to logout?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter className="!pt-32">
								<AlertDialogAction onClick={handleLogout} className="px-24">
									Logout
								</AlertDialogAction>
								<AlertDialogCancel>
									<span className="text-14 font-medium">Cancel</span>
								</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
