<script lang="ts">
	import BuildTable from "$lib/components/buildtable/BuildTable.svelte";
	import BuildTableFilters from "$lib/components/buildtable/BuildTableFilters.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import type { BuildTableFilter } from "$lib/types/BuildTableFilters";

	let filter: BuildTableFilter = {
		userId: null,
		heroId: null,
		careerId: null,
		weaponId: null,
		primaryWeaponId: null,
		secondaryWeaponId: null,
		charmTraitId: null,
		necklaceTraitId: null,
		trinketTraitId: null,
		search: null,
		sort: "dateModified",
		ascending: true,
		offset: 0,
		limit: 25,
	};

	let buildTableState = $state({ filter });
</script>

<Seo title="Builds Page"></Seo>

<div class="page">
	<BuildTableFilters bind:filter={buildTableState.filter}></BuildTableFilters>
	<BuildTable bind:filter={buildTableState.filter}></BuildTable>
</div>

<style>
	.page {
		margin: 0 auto;
		max-width: 1200px;
	}
</style>
