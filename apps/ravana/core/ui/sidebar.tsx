'use client';

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
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from '@asuras/ui';
import {
	ChevronRight,
	House,
	LogOutIcon,
	ShoppingBasket,
	StoreIcon,
	TicketSlash,
	UserRoundCheck,
	UtilityPole,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useGetNavigation } from '../api';
import { logout } from '../helpers';
import { useAppSelector } from '../store';

const IconMap = {
	House,
	ShoppingBasket,
	TicketSlash,
	StoreIcon,
	UtilityPole,
} as any;

export const AppSidebar = () => {
	const { name, mobile } = useAppSelector((state) => state.auth);
	const { data } = useGetNavigation();
	const navMenu = data?.data || [];

	const handleLogout = () => {
		logout();
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="px-8">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<UserRoundCheck className="text-primary" />
							<span className="text-14 font-medium">{name ? name : mobile}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="py-24">
				<SidebarGroup>
					<Menu navMenu={navMenu} />
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="px-8">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="p-0" asChild>
							<div>
								<AlertDialog>
									<AlertDialogTrigger className="flex w-full items-center gap-12 py-12">
										<LogOutIcon width={16} height={16} />
										<span className="text-14 font-medium">Logout</span>
									</AlertDialogTrigger>
									<AlertDialogContent className="gap-24">
										<AlertDialogHeader>
											<AlertDialogTitle className="text-24">
												Logout
											</AlertDialogTitle>
											<AlertDialogDescription>
												Are you sure you want to logout?
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter className="!pt-32">
											<AlertDialogAction
												onClick={handleLogout}
												className="px-24"
											>
												Logout
											</AlertDialogAction>
											<AlertDialogCancel>
												<span className="text-14 font-medium">Cancel</span>
											</AlertDialogCancel>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};

const Menu = ({ navMenu }: { navMenu: ICommonTypes.INavigationItem[] }) => {
	const pathname = usePathname();

	return (
		<SidebarMenu className="gap-16 px-8">
			{navMenu.map((item) => {
				const Icon = item.icon ? IconMap[item.icon] : null;
				const active =
					pathname === item.path || pathname.split('/')[1] === item.path.split('/')[1];

				if (item.type === 'menu') {
					return <MenuItem key={item.id} item={item} />;
				} else {
					return (
						<SidebarMenuButton
							className={`${
								active
									? 'bg-greyBg text-accent-foreground hover:bg-greyBg hover:text-accent-foreground py-12 font-medium hover:opacity-80'
									: 'px-0 py-6'
							}`}
							key={item.id}
							asChild
						>
							<Link href={item.path}>
								<Icon className="!size-18" />
								<span className="text-14 font-medium">{item.title}</span>
							</Link>
						</SidebarMenuButton>
					);
				}
			})}
		</SidebarMenu>
	);
};

const MenuItem = ({ item }: { item: ICommonTypes.INavigationItem }) => {
	const Icon = item.icon ? IconMap[item.icon] : null;
	const pathname = usePathname();
	const activeItem = pathname.split('/').filter(Boolean)[0];
	const activeCollapse = `/${activeItem}` === item.path;

	return (
		<Collapsible defaultOpen={activeCollapse} key={item.id} className="group/collapsible">
			<SidebarMenuItem className="py-6">
				<CollapsibleTrigger asChild>
					<SidebarMenuButton className="px-0">
						<Icon className="!size-18" />
						<span className="text-14 font-medium">{item.title}</span>
						<ChevronRight className="!size-18 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent className="pl-16">
					<SidebarMenuSub className="mx-0 mt-8 gap-12 px-0">
						{item?.items?.map((ite) => {
							const active = pathname === ite.path;
							return (
								<SidebarMenuSubItem key={ite.id}>
									<SidebarMenuSubButton
										className={`${
											active
												? 'bg-greyBg text-accent-foreground hover:bg-greyBg hover:text-accent-foreground p-12 font-medium hover:opacity-80'
												: ''
										}`}
										asChild
									>
										<Link href={ite.path}>
											<span className="text-14 font-medium">{ite.title}</span>
										</Link>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
							);
						})}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
};
