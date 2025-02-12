'use client';

import { useState } from 'react';
import { PaginationState } from '@tanstack/react-table';

import { useGetBanners } from '../api/get-banners';
import Header from './header';
import ListingTable from './table';

export default function Listing() {
	const [search, setSearchTerm] = useState('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const { data, isPending } = useGetBanners(
		search.length > 2 ? search : '',
		pagination.pageSize,
		pagination.pageIndex
	);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
	};

	return (
		<div className="rounded-8 shadow-card1 bg-white">
			<Header value={search} onChange={handleSearchChange} />
			<ListingTable
				isLoading={isPending}
				data={data?.data?.banners || []}
				pagination={pagination}
				setPagination={setPagination}
			/>
		</div>
	);
}
