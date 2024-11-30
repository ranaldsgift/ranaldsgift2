<script lang="ts">
	import { page } from "$app/stores";
	import BuildOverview from "$lib/components/build/BuildOverview.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import BuildHelper from "$lib/helpers/BuildHelper.js";
	import { error } from "@sveltejs/kit";

	let { data } = $props();

	if (!data.build) {
		throw error(404, "Build not found");
	}

	let compact = $derived($page.url.searchParams.get("compact") === "true");
	let vertical = $derived($page.url.searchParams.get("vertical") === "true");
</script>

<Seo title={`Stream Overlay for ${data.build?.name ?? "Unknown Build"}`} />

{#if data.build}
	<BuildOverview build={data.build} {compact} {vertical} />
{/if}
