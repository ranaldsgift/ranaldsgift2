<script lang="ts">
	import "../app.css";
	import "../lib/styles/Borders.css";
	import "../lib/styles/Background.css";
	import "../lib/styles/Dividers.css";
	import "../lib/styles/Icons.css";
	import { invalidateAll } from "$app/navigation";
	import { setUserState } from "$lib/state/UserState.svelte.js";
	import { initializeHeroesPageState } from "$lib/state/HeroesPageState.svelte.js";
	import { META_IMAGE_URL, ROOT_PAGE_DESCRIPTION, ROOT_PAGE_TITLE } from "$lib/data/constants/constants.js";
	import { Toaster } from "$lib/components/ui/sonner";
	import EventBanner from "$lib/components/EventBanner.svelte";

	let { data, children } = $props();

	let user = $derived(data.sessionUserProfile);
	let session = $derived(data.session);
	let supabase = $derived(data.supabase);
	let userState = setUserState(data.sessionUserProfile);
	initializeHeroesPageState();

	$effect(() => {
		const { data: supabaseData } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at || _ === 'INITIAL_SESSION') {
				invalidateAll();
			}
		});

		return () => supabaseData.subscription.unsubscribe();
	});

	$effect(() => {
		if (user && session) {
			if (userState.user?.id !== user.id) {
				userState.user = user;
				userState.showVideo.value = user.showVideo;
			}
		}
		else {
			userState.reset();
		}
	});

	$effect(() => {
		if (userState.showVideo.value) {
			document.body.classList.add('show-video');
		}
		else {
			document.body.classList.remove('show-video');
		}
	});
</script>

<svelte:head>
	<title>{ROOT_PAGE_TITLE}</title>
	<meta name="description" content={ROOT_PAGE_DESCRIPTION} />
	<meta property="image" content={META_IMAGE_URL} />
</svelte:head>

<Toaster />

<div>
	{@render children()}
</div>

<EventBanner events={data.events} />

<style>
	.app-background {
		clip-path: polygon(0% 0%, 0% 100%, 40px 100%, 40px 60px, calc(100% - 40px) 60px, calc(100% - 40px) calc(100% - 40px), 40px calc(100% - 40px), 40px 100%, 100% 100%, 100% 0%);
		z-index: 9999;
	}
	.root-container {
		position: relative;
		width: 100%;
		height: calc(100% - 50px);
		object-fit: cover;
		top: 50px;
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
    	margin: 70px 40px 0px;
		padding-bottom: 40px;
	}
	.page-title {
		text-align: center;
		width: 662px;
		position: absolute;
		z-index: 10001;
		top: 13px;
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