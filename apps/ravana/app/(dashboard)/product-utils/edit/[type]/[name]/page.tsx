import Item from './_ui/item';

export default function Page() {
	return (
		<div className="gap-54 flex h-full items-center justify-center">
			{[
				{ label: 'Icon', name: 'ICON' },
				{ label: 'Small', name: 'SMALL' },
				{ label: 'Medium', name: 'MEDIUM' },
				{ label: 'Large', name: 'LARGE' },
			].map((i) => {
				return <Item key={i.name} item={i} />;
			})}
		</div>
	);
}
