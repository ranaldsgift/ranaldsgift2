<script lang="ts">
	import { getUserState } from '$lib/state/UserState.svelte';

	const { children } = $props();

	const userState = getUserState();
</script>

{#if userState.showVideo.value}
<video muted playsInline autoPlay={true} loop={true} poster='/images/backgrounds/home-frame.webp' class="app-background fixed">                
	<source src='/videos/backgrounds/home.mp4' type="video/mp4" />
</video>
{:else}
<img src="/images/backgrounds/home-frame.webp" alt="Home Frame" class="app-background fixed object-cover w-full h-full top-0 left-0 z-[-1]" />
{/if}

<div class="page-container">
	<div class="menu-title-divider divider-12 mb-4"></div>
	<div class="page">
		{@render children()}
	</div>
</div>

<style>
	.root-container {
		position: relative;
		width: 100%;
		height: calc(100% - 40px);
		object-fit: cover;
		top: 40px;
		left: 0;
		margin: 0 20px 0px 20px;
		padding: 20px;
		display: grid;
		grid-template-rows: auto 1fr;
		overflow: hidden;
	}
	video {
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		object-fit: cover;
		position: fixed;
		background: url('/images/background2.jpg') center / cover;
	}
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
	.page-title {
		text-align: center;
		width: 662px;
		position: absolute;
		z-index: 10001;
		top: 3px;
		left: 50%;
		translate: -50% 0%;
		font-size: 1.4rem;
		color: #c15b24;
		line-height: 66px;
		text-transform: uppercase;
		font-family: "caslon-antique-bold";
		pointer-events: all;
	}
	.page-title-background {
		content: '';
		width: 417px;
		height: 42px;
		position: absolute;
		top: 23px;
		z-index: 1;
		left: 50%;
		translate: -50% 0%;
		background: linear-gradient(180deg, #2b1212 35%, #000);
	}
	.frame-container {
		position: fixed;
		top: 0;
		z-index: 10001;
		pointer-events: none;
	}
</style>