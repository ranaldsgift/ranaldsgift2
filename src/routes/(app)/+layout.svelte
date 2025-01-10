<script lang="ts">
	import Background from "$lib/components/Background.svelte";
	import EventBanner from "$lib/components/EventBanner.svelte";
	import GlobalUserManager from "$lib/components/GlobalUserManager.svelte";
	import TopNavigation from "$lib/components/navigation/TopNavigation.svelte";
	import { Toaster } from "$lib/components/ui/sonner";

	let { children } = $props();
</script>

<Toaster position="bottom-center"></Toaster>

<TopNavigation></TopNavigation>

<Background></Background>

{@render children()}

<EventBanner></EventBanner>

<GlobalUserManager />
