<script lang="ts">
	import { page } from "$app/stores";
	import { getUserState } from "$lib/state/UserState.svelte";
	const userState = getUserState();

	let clipPathState = $derived($page.route.id?.includes("(app)"));

	type layoutType = "app" | "noframe" | "emporium" | "frame";

	let layoutState: layoutType = $derived.by(() => {
		if ($page.route.id?.includes("(frame)")) return "frame";

		if ($page.route.id?.includes("(noframe)")) return "noframe";

		if ($page.route.id?.includes("(emporium)")) return "emporium";

		return "app";
	});

	let posterUrl = $derived.by(() => {
		if (layoutState === "emporium") return "/videos/backgrounds/emporium.png";

		return "/videos/backgrounds/home-frame.png";
	});

	let backgroundImageUrl = $derived.by(() => {
		if (layoutState === "emporium") return "url('/videos/backgrounds/emporium.png')	";

		return "url('/videos/backgrounds/home-frame.png')";
	});
</script>

{#if userState.showVideo.value}
	<!-- <img src="/videos/backgrounds/home.gif" alt="Main Background Video" /> -->
	<video
		class="app-background fixed {clipPathState ? 'clipped' : ''} {layoutState === 'emporium' ? 'block' : 'hidden'}"
		muted
		playsInline
		autoPlay={true}
		loop={true}
		poster={posterUrl}
		src="/videos/backgrounds/emporium.mp4"
		style="--background: {backgroundImageUrl}"
	>
	</video>
	<video
		class="app-background fixed {clipPathState ? 'clipped' : ''} {layoutState !== 'emporium' ? 'block' : 'hidden'}"
		muted
		playsInline
		autoPlay={true}
		loop={true}
		poster={posterUrl}
		src="/videos/backgrounds/home.mp4"
		style="--background: {backgroundImageUrl}"
	>
	</video>
{:else}
	<div
		class="app-background image fixed object-cover w-full h-full top-0 left-0 z-[-1] {clipPathState ? 'clipped' : ''}"
		style="--background: {backgroundImageUrl}"
	></div>
{/if}

<style>
	.app-background.image {
		background: var(--background) center / cover;
		left: 0;
		width: 100vw;
	}
	video {
		top: 0;
		left: 0px;
		position: fixed;
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		max-width: none;
		pointer-events: none;
		background-color: black;
		background-image: var(--background);
		background-size: cover;
		background-position: center;
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
