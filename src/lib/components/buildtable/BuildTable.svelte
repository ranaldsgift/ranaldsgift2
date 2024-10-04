<script lang="ts">
	import BuildTableRowSkeleton from "./BuildTableRowSkeleton.svelte";
	import { CareerBuildsStore } from "$lib/stores/DataStores";
	import { DataHandler } from "@vincjo/datatables";
	import ContainerTitle from "../ContainerTitle.svelte";
	import BuildTableRow from "./BuildTableRow.svelte";
	import type { BuildTableFilter } from "$lib/types/BuildTableFilters";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

	type Props = {
		filter: BuildTableFilter;
		class?: string;
		title?: string;
	};

	let { filter = $bindable(), class: className, title }: Props = $props();

	let builds: ICareerBuild[] = [];

	let recordCount = $state(0);

	const loadData = async () => {
		loadingData = true;
		let { items, count } = await CareerBuildsStore.loadData(getApiQuery());
		recordCount = count;

		builds = [...items];
		handler.setRows(builds);
		loadingData = false;
	};

	const getApiQuery = () => {
		let apiQuery = "";

		for (const [key, value] of Object.entries(filter)) {
			if (value !== null) {
				apiQuery += `&${key}=${value}`;
			}
		}

		return apiQuery;
	};

	let loadingData = false;

	const handler = new DataHandler(builds);
	const rows = handler.getRows();
</script>

{#await loadData()}
	<div class={className}>
		<ContainerTitle>{title ?? "Builds"}</ContainerTitle>
		<div class="p-5 border-01 background-20 gap-5 grid desktop:grid-cols-2 desktop:grid-flow-row">
			{#each { length: filter.limit ?? 5 } as _}
				<BuildTableRowSkeleton></BuildTableRowSkeleton>
			{/each}
		</div>
	</div>
{:then}
	{#if $rows.length > 0}
		<div class={className}>
			<ContainerTitle>{title ?? "Builds"}</ContainerTitle>
			<div class="p-5 border-01 background-20 gap-5 grid desktop:grid-cols-2 desktop:grid-flow-row {className}">
				{#each $rows as row}
					<BuildTableRow build={row}></BuildTableRow>
				{/each}
			</div>
			<div class="flex justify-between">
				{#if filter.offset != null && filter.offset !== undefined && filter.offset > 0}
					<button
						class="pagination-button flex-1"
						onclick={() => {
							if (filter.limit != null && filter.offset != null) {
								filter.offset = Math.max(0, --filter.offset);
							}
						}}
					>
						<ContainerTitle>Previous</ContainerTitle>
					</button>
				{/if}
				{#if filter.offset != null && filter.limit != null && recordCount >= filter.limit * (filter.offset + 1)}
					<button
						class="pagination-button flex-1"
						onclick={() => {
							if (
								filter.limit != null &&
								filter.limit !== undefined &&
								filter.offset != null &&
								filter.offset !== undefined
							) {
								filter.offset++;
							}
						}}
					>
						<ContainerTitle>Next</ContainerTitle>
					</button>
				{/if}
			</div>
		</div>
	{/if}
{/await}

<style>
	.build-list-item-skeleton {
		display: grid;
		grid-template-columns: auto auto auto 1fr auto;
		position: relative;
		grid-template-rows: auto 45px 40px;
		grid-row-gap: 5px;
		grid-template-areas:
			"heroIcon buildDescription buildDescription buildDescription buildRating"
			"heroIcon buildWeapons buildTraits empty2 empty2"
			"heroIcon buildFooter buildFooter buildFooter buildFooter";
		text-transform: uppercase;
		cursor: pointer;
		grid-column-gap: 10px;
		pointer-events: none;
		background-image: linear-gradient(rgba(87, 57, 57, 0.3), rgba(87, 57, 57, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.career-portrait {
		grid-area: heroIcon;
		align-self: center;
		margin-left: 15px;
	}

	.build-description-container {
		grid-area: buildDescription;
		justify-items: start;
		text-align: left;
		display: grid;
		margin-top: 10px;
	}

	.weapons {
		grid-area: buildWeapons;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 5px;
	}

	.weapon-container {
		display: grid;
		grid-template-areas: "itemIcon traitIcon";
		grid-column-gap: 5px;
	}

	.traits {
		grid-area: buildTraits;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: 5px;
	}

	.build-footer {
		grid-area: buildFooter;
	}

	.build-rating {
		grid-area: buildRating;
		background: url("/images/icons/rating-icon.png");
		background-size: contain;
		background-repeat: no-repeat;
		width: 62px;
		height: 64px;
		display: block;
	}

	.build-footer {
		grid-area: buildFooter;
		background: linear-gradient(to right, #0000, #ffffff14);
		padding-right: 10px;
		justify-self: right;
		display: grid;
		grid-template-columns: auto auto;
		grid-column-gap: 10px;
		align-content: center;
		font-size: 0.8em;
		width: calc(100% - 10px);
		justify-content: right;
		padding-bottom: 5px;
		margin: 0 4px 2px 0;
	}
</style>
