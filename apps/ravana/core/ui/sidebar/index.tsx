'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@asuras/ui';
import { UserRoundCheck } from 'lucide-react';

import { useGetNavigation } from '../../api';
import { useAppSelector } from '../../store';
import SidebarLogout from './logout';
import SidebarMenuComponent from './menu';

export const AppSidebar = () => {
	const { name, mobile } = useAppSelector((state) => state.auth);
	const { data } = useGetNavigation();
	const navMenu = data?.data || [];

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="px-8">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<UserRoundCheck className="text-primary" />
							<span className="text-14 font-medium">{name || mobile}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="py-24">
				<SidebarGroup>
					<SidebarMenuComponent navMenu={navMenu} />
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="px-8">
				<SidebarLogout />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
