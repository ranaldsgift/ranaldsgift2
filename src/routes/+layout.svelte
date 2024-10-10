<script lang="ts">
	import "../app.css";
	import "$lib/styles/Borders.css";
	import "$lib/styles/Background.css";
	import "$lib/styles/Dividers.css";
	import "$lib/styles/Icons.css";
	import { afterNavigate, invalidateAll } from "$app/navigation";
	import { setUserState } from "$lib/state/UserState.svelte.js";
	import { initializeHeroesPageState } from "$lib/state/HeroesPageState.svelte.js";
	import { META_IMAGE_URL, ROOT_PAGE_DESCRIPTION, ROOT_PAGE_TITLE } from "$lib/data/constants/constants.js";
	import { initializeBuildsPageState } from "$lib/state/BuildsPageState.svelte.js";
	import { initializeBuildEditorPageState } from "$lib/state/BuildEditorPageState.svelte.js";
	import { initializeBuildCreatorPageState } from "$lib/state/BuildCreatorPageState.svelte.js";
	import { initializeWindowState } from "$lib/state/WindowState.svelte.js";
	import { previousPage } from "$lib/stores/PageStores.svelte.js";

	let { data, children } = $props();

	let user = $derived(data.sessionUserProfile);
	let session = $derived(data.session);
	let supabase = $derived(data.supabase);
	let userState = setUserState(data.sessionUserProfile);
	initializeHeroesPageState();
	initializeBuildsPageState();
	initializeBuildEditorPageState();
	initializeBuildCreatorPageState();
	initializeWindowState();

	$effect(() => {
		const { data: supabaseData } = supabase.auth.onAuthStateChange((_, newSession) => {
			console.debug('Auth state change');
			if (newSession?.expires_at !== session?.expires_at || _ === 'INITIAL_SESSION') {
				console.debug('Invalidating all');
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

	afterNavigate(({from}) => {
		previousPage.url = from?.url.pathname || previousPage.url;
	}) 
</script>

<svelte:head>
	<title>{ROOT_PAGE_TITLE}</title>
	<meta name="description" content={ROOT_PAGE_DESCRIPTION} />
	<meta property="image" content={META_IMAGE_URL} />
</svelte:head>

{@render children()}
