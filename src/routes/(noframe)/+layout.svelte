<script lang="ts">
	import Background from '$lib/components/Background.svelte';
import TopNavigation from '$lib/components/navigation/TopNavigation.svelte';
	import { META_IMAGE_URL, ROOT_PAGE_DESCRIPTION, ROOT_PAGE_TITLE } from '$lib/data/constants/constants';
	import { getUserState } from '$lib/state/UserState.svelte';

	const { children } = $props();

	const userState = getUserState();
</script>

<svelte:head>
	<title>{ROOT_PAGE_TITLE}</title>
	<meta name="description" content={ROOT_PAGE_DESCRIPTION} />
	<meta property="image" content={META_IMAGE_URL} />
</svelte:head>

<TopNavigation showAboutButton={false}></TopNavigation>

<Background></Background>

<div class="page-container">
	<div class="menu-title-divider divider-12 mb-4"></div>
	<div class="page">
		{@render children()}
	</div>
</div>

<style>
    .page-container {
		position: relative;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        justify-items: center;
        align-items: center;
		min-width: 900px;
		border-radius: 8px;
		margin: 0 auto;
		overflow-y: auto;
		overflow-x: hidden;
		min-height: 100%;
    }
	.page {
    	margin: 60px 40px 0px;
		padding: 20px 20px 60px;
	}
</style>