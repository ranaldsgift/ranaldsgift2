<script lang="ts">
	import "../app.css";
	import "../lib/styles/Borders.css";
	import "../lib/styles/Background.css";
	import "../lib/styles/Icons.css";
	import { afterNavigate, invalidate, invalidateAll } from "$app/navigation";
	import TopNavigation from "$lib/components/navigation/TopNavigation.svelte";
	import { previousPage } from "$lib/stores/PageStores.svelte";
	import { setUserState } from "$lib/state/UserState.svelte.js";
	import { initializeHeroesPageState } from "$lib/state/HeroesPageState.svelte.js";
	import { MenuState } from "$lib/state/MenuState.svelte.js";
	import MainMenu from "$lib/components/navigation/MainMenu.svelte";
	let { data, children } = $props();

	let user = $derived(data.sessionUserProfile);
	let session = $derived(data.session);
	let supabase = $derived(data.supabase);
	let userState = setUserState(data.sessionUserProfile);
	initializeHeroesPageState();

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at || _ === 'INITIAL_SESSION') {
				invalidateAll();
			}
			
			setTimeout(() => {
				if (newSession && _ !== 'SIGNED_OUT') {
					userState.user = user;
				}
				else {
					userState.reset();
				}
			}, 0);
		});

		return () => data.subscription.unsubscribe();

/* 		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at || _ === 'INITIAL_SESSION') 
			{
				invalidateAll();
			}

			setTimeout(() => {
				if (newSession && _ !== 'SIGNED_OUT') {
					userState.user = user;
				}
				else {
					userState.reset();
				}
			}, 0);
		});
		return () => data.subscription.unsubscribe(); */
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
	<title>{MenuState.isOpen ? 'Menu - ranalds.gift' : 'ranalds.gift | Holy Sigmar, Bless This Ravaged Website'}</title>
</svelte:head>
	
<div id="root-container">
	<!-- Use wallpaper by default unless the user has stored the preference in their user profile or local storage cookie -->
	{#if userState.showVideo}
	<video muted playsInline autoPlay={true} loop={true} poster='/videos/backgrounds/home-frame.jpg' class="fixed">                
		<source src='/videos/backgrounds/home.mp4' type="video/mp4" />
	</video>
	{:else}
		<img src="/images/backgrounds/home-frame.jpg" alt="Home Frame" class="fixed object-cover w-full h-full top-0 left-0" />
	{/if}

	<TopNavigation></TopNavigation>

	{#if MenuState.isOpen}	
		<div id="page-container">
			<MainMenu></MainMenu>
		</div>
	{:else}
		<a class="page-title label-01" href="/">Ranald's Gift</a>
		<div class="page-title-background"></div>
		<div id="page-container" class="border-06 background7 p-10">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	#root-container {
		position: absolute;
		width: 100%;
		height: 100vh;
		object-fit: cover;
		top: 0;
		left: 0;
		overflow-y: auto;
		padding: 0 20px;
	}
	video {
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		object-fit: cover;
		position: fixed;
	}
    #page-container {
		position: relative;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        justify-items: center;
        align-items: center;
        width: 100%;
		min-height: calc(100% - 70px);
		border-radius: 8px;
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
		top: 26px;
		z-index: 1;
		left: 50%;
		translate: -50% 0%;
		background: linear-gradient(180deg, #2b1212 35%, #000);
	}
</style>