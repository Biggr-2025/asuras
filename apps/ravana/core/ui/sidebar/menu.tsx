import { SidebarMenu } from '@asuras/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { INavigationItem } from '../../../types';
import { SidebarIconMap } from './constants';
import SidebarMenuItemComponent from './menu-item';

export default function SidebarMenuComponent({ navMenu }: { navMenu: INavigationItem[] }) {
	const pathname = usePathname();

	return (
		<SidebarMenu className="gap-16 px-8">
			{navMenu.map((item) => {
				const Icon = item.icon ? SidebarIconMap[item.icon] : null;
				const active =
					pathname === item.path || pathname.split('/')[1] === item.path.split('/')[1];

				return item.type === 'menu' ? (
					<SidebarMenuItemComponent key={item.id} item={item} />
				) : (
					<Link href={item.path} key={item.id}>
						<SidebarMenu
							className={`flex-row px-0 py-6 ${active ? 'bg-greyBg text-accent-foreground rounded-8 px-6 py-12' : ''}`}
						>
							<Icon className="!size-18" />
							<span className="text-14 font-medium">{item.title}</span>
						</SidebarMenu>
					</Link>
				);
			})}
		</SidebarMenu>
	);
}
