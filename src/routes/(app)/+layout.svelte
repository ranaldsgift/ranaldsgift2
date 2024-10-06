<script lang="ts">
	import Background from "$lib/components/Background.svelte";
	import EventBanner from "$lib/components/EventBanner.svelte";
	import TopNavigation from "$lib/components/navigation/TopNavigation.svelte";
	import { Toaster } from "$lib/components/ui/sonner";
	import { META_IMAGE_URL, ROOT_PAGE_DESCRIPTION, ROOT_PAGE_TITLE } from "$lib/data/constants/constants.js";

	let { children } = $props();
</script>

<svelte:head>
	<title>{ROOT_PAGE_TITLE}</title>
	<meta name="description" content={ROOT_PAGE_DESCRIPTION} />
	<meta property="image" content={META_IMAGE_URL} />
</svelte:head>

<Toaster></Toaster>

<TopNavigation></TopNavigation>

<Background></Background>

{@render children()}

<EventBanner></EventBanner>
