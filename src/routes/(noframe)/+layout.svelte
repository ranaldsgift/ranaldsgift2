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

<div class="page-container desktop:min-w-[900px]">
	<div class="page flex flex-col items-center">
		<div class="page-title-label text-[2rem] tablet:text-[3rem]">Ranald's Gift</div>
		{@render children()}
	</div>
</div>

<style>
  .page-container {
		position: relative;
    display: flex;
    justify-content: center;
    align-items: start;
		border-radius: 8px;
		margin: 0 auto;
		background: none;
		height: 100vh;
		width: 100vw;
		overflow-y: auto;
		overflow-x: hidden;
    }
	.page {
		padding-top: 47px;
	}
	@media (min-width: 768px) {
		.page {
			padding: 40px 20px;
			height: 100vh;
			width: 100vw;
			margin-top: 0px;
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