<script lang="ts">
	import Background from '$lib/components/Background.svelte';
import TopNavigation from '$lib/components/navigation/TopNavigation.svelte';
	import { META_IMAGE_URL, ROOT_PAGE_DESCRIPTION, ROOT_PAGE_TITLE } from '$lib/data/constants/constants';

	const { children } = $props();
</script>

<svelte:head>
	<title>{ROOT_PAGE_TITLE}</title>
	<meta name="description" content={ROOT_PAGE_DESCRIPTION} />
	<meta property="image" content={META_IMAGE_URL} />
</svelte:head>

<TopNavigation showAboutButton={false}></TopNavigation>

<Background></Background>

<div class="page-container desktop:min-w-[900px]">
	<div class="page flex flex-col items-center">
		<div class="page-title-label">Ranald's Gift</div>
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
	.page-title-label {
		text-transform: uppercase;
		position: relative;
		top: 0;
		color: #c15b24;
		font-size: 3em;
		letter-spacing: 5px;
		text-shadow: 1px 1px #000;
	}
</style>