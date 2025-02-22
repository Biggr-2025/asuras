import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@asuras/ui';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { INavigationItem } from '../../../types';
import { SidebarIconMap } from './constants';

export default function SidebarMenuItemComponent({ item }: { item: INavigationItem }) {
	const Icon = item.icon ? SidebarIconMap[item.icon] : null;
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
						{item.items?.map((ite) => (
							<SidebarMenuSubItem key={ite.id}>
								<SidebarMenuSubButton
									className={`${pathname === ite.path ? 'bg-greyBg text-accent-foreground py-12' : ''}`}
									asChild
								>
									<Link href={ite.path}>
										<span className="text-14 font-medium">{ite.title}</span>
									</Link>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
}
