<script lang="ts">
	import { CareerBuildsStore } from "$lib/stores/DataStores";
	import { DataHandler } from "@vincjo/datatables";
	import ContainerTitle from "../ContainerTitle.svelte";
	import Skeleton from "../ui/skeleton/skeleton.svelte";
	import Button from "../Button.svelte";
	import BuildTableRow from "./BuildTableRow.svelte";
	import type { BuildTableFilter } from "$lib/types/BuildTableFilters";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

	type Props = {
		filter: BuildTableFilter;
	};

	let { filter = $bindable() }: Props = $props();

	//let buildTableState = setBuildTableState(filter);

	let builds: ICareerBuild[] = [];

	const loadData = async () => {
		loadingData = true;
		let { items } = await CareerBuildsStore.loadData(getApiQuery());

		builds = [...items];
		handler.setRows(builds);
		loadingData = false;
	};

	const getApiQuery = () => {
		let apiQuery = `limit=${filter.limit ?? 10}&offset=${filter.offset ?? 0}`;

		if (filter.careerId) {
			apiQuery += `&careerId=${filter.careerId}`;
		}

		if (filter.weaponId) {
			apiQuery += `&weaponId=${filter.weaponId}`;
		}

		if (filter.userId) {
			apiQuery += `&userId=${filter.userId}`;
		}

		if (filter.heroId) {
			apiQuery += `&heroId=${filter.heroId}`;
		}

		if (filter.sort) {
			apiQuery += `&sort=${filter.sort}`;
		}

		if (filter.favoriteByUserId) {
			apiQuery += `&favoriteByUserId=${filter.favoriteByUserId}`;
		}

		if (filter.ratedByUserId) {
			apiQuery += `&ratedByUserId=${filter.ratedByUserId}`;
		}

		return apiQuery;
	};

	let loadingData = false;

	const handler = new DataHandler(builds);
	const rows = handler.getRows();

	const loadMoreHandler = () => {
		if (loadingData) return;
		if (!filter.offset) filter.offset = 0;
		filter.offset++;
		loadData();
	};
</script>

<div class="top-left-shadow">
	<ContainerTitle>Builds</ContainerTitle>
	<div class="p-5 border-01 background-20 gap-5 grid">
		{#await loadData()}
			{#each { length: 10 } as _}
				<Skeleton class="h-[177px] w-full border-31 bg-stone-950"></Skeleton>
			{/each}
		{:then}
			{#each $rows as row}
				<BuildTableRow build={row}></BuildTableRow>
			{/each}
		{/await}
		<Button handler={loadMoreHandler}>Load More</Button>
	</div>
</div>
