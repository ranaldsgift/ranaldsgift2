<script lang="ts">
	import Seo from "$lib/components/SEO.svelte";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	const { data } = $props();
</script>

<Seo title={data.viewModel.build.name} />

<Breadcrumb
	links={[
		{ href: `/builds`, text: "Builds" },
		{ href: `/build/${data.viewModel.build.id}`, text: data.viewModel.build.name ?? "Your Build" },
	]}>Edit</Breadcrumb
>

<div class="build-page">
	<h1>{data.viewModel.build.name}</h1>
	<p>{data.viewModel.build.description}</p>
</div>
