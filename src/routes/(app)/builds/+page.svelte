<script lang="ts">
	import BuildTable from "$lib/components/buildtable/BuildTable.svelte";
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
</script>

<Seo title="Builds Page"></Seo>

<div class="page">
	<BuildTable bind:filter></BuildTable>
</div>

<style>
	.page {
		margin: 0 auto;
		max-width: 1200px;
	}
</style>
