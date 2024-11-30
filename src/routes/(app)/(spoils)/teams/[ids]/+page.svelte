<script lang="ts">
	import Seo from "$lib/components/SEO.svelte";
	import TeamView from "$lib/components/team/TeamView.svelte";
	import type { PageData } from "./$types";

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	let title = $derived(data.team.name ?? `Team Page - ${data.team.builds?.map((b) => b.career?.name).join(", ")}`);
	let description = $derived(data.team.description ?? "");
</script>

<Seo {title} {description} />

<div class="page-layout team-page flex justify-center">
	<TeamView team={data.team} />
</div>
