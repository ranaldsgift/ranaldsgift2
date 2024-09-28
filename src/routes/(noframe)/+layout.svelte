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
		<div class="page-title-label text-[2rem] tablet:text-[3rem]">Ranald's Gift</div>
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
		background: none;
		height: 100vh;
		width: 100vw;
    }
	.page {
		padding: 0;
	}
	@media (min-width: 768px) {
		.page {
			padding: 40px 20px !important;
			height: 100vh;
			width: 100vw;
			overflow-y: auto;
			overflow-x: hidden;
			-moz-backface-visibility: hidden; 
			-webkit-backface-visibility: hidden; 
			backface-visibility: hidden;
		}
		.page-container {
			background: none;
		}
	}
	.page-title-label {
		text-transform: uppercase;
		position: relative;
		top: 0;
		color: #c15b24;
		letter-spacing: 5px;
		text-shadow: 1px 1px #000;
	}
</style>