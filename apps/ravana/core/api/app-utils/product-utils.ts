import { keepPreviousData, QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../services';

const getProductUtilsList = async ({
	queryKey,
}: QueryFunctionContext<
	[
		string,
		string,
		string,
		0 | 1,
		number,
		number,
		0 | 1,
		string | undefined,
		string | undefined,
		string | undefined,
	]
>) => {
	const [_key, type, searchTerm, active, page, limit, count, department, category, name] =
		queryKey;

	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/productUtil/list?utilType=${type}&page=${page}&limit=${limit}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	if (active === 1) {
		url += `&active=1`;
	}
	if (count === 1) {
		url += `&count=1`;
	}
	if (department) {
		url += `&department=${department}`;
	}
	if (category) {
		url += `&category=${category}`;
	}
	if (name) {
		url += `&name=${name}`;
	}

	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<{ list: ICatalougeTypes.ICategory[]; totalCount: number }>
		>(url);

	return data;
};

export function useGetProductUtilsList({
	apiKey,
	type,
	searchTerm,
	active,
	page,
	limit,
	count,
	department,
	category,
	name,
}: {
	apiKey: string;
	type: string;
	searchTerm: string;
	active: 0 | 1;
	page: number;
	limit: number;
	count: 0 | 1;
	department?: string;
	category?: string;
	name?: string;
}) {
	return useQuery({
		queryKey: [
			apiKey,
			type,
			searchTerm,
			active,
			page,
			limit,
			count,
			department,
			category,
			name,
		],
		queryFn: getProductUtilsList,
		placeholderData: keepPreviousData,
	});
}
