<script lang="ts">
	import "../app.css";
	import "../lib/styles/Borders.css";
	import "../lib/styles/Background.css";
	import "../lib/styles/Icons.css";
	import { afterNavigate, invalidateAll } from "$app/navigation";
	import TopNavigation from "$lib/components/navigation/TopNavigation.svelte";
	import { previousPage } from "$lib/stores/PageStores.svelte";
	import { setUserState } from "$lib/state/UserState.svelte.js";
	import { initializeHeroesPageState } from "$lib/state/HeroesPageState.svelte.js";
	import { MenuState } from "$lib/state/MenuState.svelte.js";
	import MainMenu from "$lib/components/navigation/MainMenu.svelte";
	import { page } from "$app/stores";
	import { ROOT_PAGE_TITLE } from "$lib/data/constants/constants.js";
	import { Toaster } from "$lib/components/ui/sonner";

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

	afterNavigate((nav) => {
		MenuState.isOpen = nav.to?.url.pathname === "/" ? true : false;

        const page = document.getElementById('page');
        if (page && nav.type === 'link' && nav.from?.url.pathname !== nav.to?.url.pathname) {
            page.scrollTop = 0;
        }
		previousPage.url = nav.from?.url.pathname ?? '/';
    });
</script>

<svelte:head>
	<title>{MenuState.isOpen && $page.url.pathname !== '/' ? 'Menu - ranalds.gift' : ROOT_PAGE_TITLE}</title>
</svelte:head>

<Toaster />

<TopNavigation></TopNavigation>

{#if userState.showVideo.value}
<video muted playsInline autoPlay={true} loop={true} poster='/images/backgrounds/home-frame.webp' class="fixed">                
	<source src='/videos/backgrounds/home.mp4' type="video/mp4" />
</video>
{:else}
<img src="/images/backgrounds/home-frame.webp" alt="Home Frame" class="fixed object-cover w-full h-full top-0 left-0 z-[-1]" />
{/if}
{#if MenuState.isOpen}
<div id="page-container" class="top-10">
	<MainMenu></MainMenu>
</div>
{:else if $page.error}
<div>
	{@render children()}
</div>
{:else}
<div class="flex-auto w-full h-full flex overflow-hidden pb-5">
	<a class="page-title label-01" href="/">Ranald's Gift</a>
	<div class="page-title-background"></div>
	<div id="root-container" class="border-06 background7 p-10 rounded-[8px]">
		<div id="page-container">
			{@render children()}
		</div>
	</div>
</div>
{/if}

<style>
	#root-container {
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
    #page-container {
		position: relative;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        justify-items: center;
        align-items: center;
		min-width: 900px;
        width: 100%;
		border-radius: 8px;
		margin: 0 auto;
		overflow-y: auto;
		overflow-x: hidden;
    }
	.page-title {
		text-align: center;
		width: 662px;
		position: absolute;
		z-index: 2;
		top: 13px;
		left: 50%;
		translate: -50% 0%;
		font-size: 1.4rem;
		color: #c15b24;
		line-height: 66px;
		text-transform: uppercase;
		font-family: "caslon-antique-bold";
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
</style>