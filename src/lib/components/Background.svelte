<script lang="ts">
	import { page } from "$app/stores";
	import { getUserState } from "$lib/state/UserState.svelte";

	const userState = getUserState();

	let clipPathState = $derived($page.route.id?.includes("(app)"));
</script>

{#if userState.showVideo.value}
	<video
		muted
		playsInline
		autoPlay={true}
		loop={true}
		poster="/images/backgrounds/home-frame.webp"
		class="app-background fixed {clipPathState ? 'clipped' : ''}"
	>
		<source src="/videos/backgrounds/home.mp4" type="video/mp4" />
	</video>
{:else}
	<div class="app-background image fixed object-cover w-full h-full top-0 left-0 z-[-1] {clipPathState ? 'clipped' : ''}"></div>
{/if}

<style>
	.app-background.image {
		background: url(/images/backgrounds/home-frame.webp) no-repeat top left / cover;
		left: -25px;
		width: calc(100% + 50px);
	}
	video {
		top: 0;
		left: -25px;
		position: fixed;
		background: url("/images/background2.jpg") top left / cover;
		width: calc(100% + 50px);
		height: 100vh;
		object-fit: cover;
		max-width: none;
	}
</style>
