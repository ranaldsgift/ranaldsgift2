<script lang="ts">
	import Seo from "$lib/components/SEO.svelte";

	const { data } = $props();
</script>

<Seo title={data.viewModel.build.name} />

<div class="build-page">
	<h1>{data.viewModel.build.name}</h1>
	<p>{data.viewModel.build.description}</p>
</div>
