import { ImagePlaceholder } from '@asuras/ui';

export const Header = () => {
	return (
		<header className="flex h-[72px] shrink-0 items-center justify-between gap-12 border-b bg-white px-16">
			<div className="flex items-center">
				<ImagePlaceholder
					src="/images/logo.png"
					containerClasses="w-[110px] h-[38px]"
					imageClasses="object-cover"
				/>
			</div>
		</header>
	);
};
