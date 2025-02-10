import { prisma } from '../../../core/services';
import StoreRegistration from './ui/table';

export default async function Page() {
	const storeRegistrations = await prisma.storeRegistration.findMany();
	return <StoreRegistration data={storeRegistrations as any} />;
}
