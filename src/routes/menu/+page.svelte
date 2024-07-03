<script lang="ts">
	import MainMenu from '$lib/components/navigation/MainMenu.svelte';
	import { MenuState } from '$lib/state/MenuState.svelte';

	MenuState.isOpen = true;
</script>

<MainMenu></MainMenu>