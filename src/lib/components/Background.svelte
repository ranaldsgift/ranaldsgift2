<script lang="ts">
	import { page } from "$app/stores";
	import { getUserState } from "$lib/state/UserState.svelte";
	const userState = getUserState();

	let clipPathState = $derived($page.route.id?.includes("(app)"));

	type layoutType = "app" | "noframe" | "emporium" | "root";

	let layoutState: layoutType = $derived.by(() => {
		if ($page.route.id?.includes("(app)")) return "app";

		if ($page.route.id?.includes("(noframe)")) return "noframe";

		if ($page.route.id?.includes("(emporium)")) return "emporium";

		return "root";
	});

	let videoUrl = $derived.by(() => {
		if (layoutState === "emporium") return "/videos/backgrounds/emporium.webm";

		return "/videos/backgrounds/home.mp4";
	});

	let videoPlayer: HTMLVideoElement | null = $state(null);

	$effect(() => {
		if (videoPlayer) {
			videoPlayer.src = videoUrl;
		}
	});
</script>

{#if userState.showVideo.value}
	<!-- <img src="/videos/backgrounds/home.gif" alt="Main Background Video" /> -->
	<video
		muted
		playsInline
		autoPlay={true}
		loop={true}
		class="app-background fixed {clipPathState ? 'clipped' : ''}"
		bind:this={videoPlayer}
	>
		<source src={videoUrl} type="video/mp4" />
	</video>
{:else}
	<div class="app-background image fixed object-cover w-full h-full top-0 left-0 z-[-1] {clipPathState ? 'clipped' : ''}"></div>
{/if}

<style>
	.app-background.image {
		background: url(/images/backgrounds/home-frame.webp) no-repeat top left / cover;
		left: 0;
		width: 100vw;
	}
	video {
		top: 0;
		left: 0px;
		position: fixed;
		background: url("/images/background2.jpg") top left / cover;
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		max-width: none;
		pointer-events: none;
	}

	img {
		top: 0;
		left: 0px;
		position: fixed;
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		max-width: none;
	}
</style>
