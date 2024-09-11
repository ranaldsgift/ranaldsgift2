<script lang="ts">
	import { getUserState } from "$lib/state/UserState.svelte";

	type Props = {
		clipPath?: boolean;
	};

	const { clipPath = false }: Props = $props();

	const userState = getUserState();
</script>

{#if userState.showVideo.value}
	<video
		muted
		playsInline
		autoPlay={true}
		loop={true}
		poster="/images/backgrounds/home-frame.webp"
		class="app-background fixed {clipPath ? 'clipped' : ''}"
	>
		<source src="/videos/backgrounds/home.mp4" type="video/mp4" />
	</video>
{:else}
	<div class="app-background image fixed object-cover w-full h-full top-0 left-0 z-[-1] {clipPath ? 'clipped' : ''}"></div>
{/if}

<style>
	.app-background.clipped {
		clip-path: polygon(
			0% 0%,
			0% 100%,
			40px 100%,
			40px 60px,
			calc(100% - 40px) 60px,
			calc(100% - 40px) calc(100% - 40px),
			40px calc(100% - 40px),
			40px 100%,
			100% 100%,
			100% 0%
		);
		z-index: 9999;
	}
	.app-background.image {
		background: url(/images/backgrounds/home-frame.webp) no-repeat center left / calc(100% + 32px) 100%;
	}
	video {
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		object-fit: cover;
		position: fixed;
		background: url("/images/background2.jpg") center / cover;
	}
</style>
