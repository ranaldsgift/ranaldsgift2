<script lang="ts">
	import MainMenu from "$lib/components/navigation/MainMenu.svelte";

    const { data } = $props();
</script>

<svelte:head>
    <title>Home - ranalds.gift | Your Resource for Vermintide 2 Builds, Mechanics and Gameplay Information - Holy Sigmar, bless this ravaged website.</title>
    <meta 
        name="description"
        content="Your Resource for Vermintide 2 Builds, Mechanics and Gameplay Information - Holy Sigmar, bless this ravaged website."
    >
    <meta property="image" content="/meta_image.png">
</svelte:head>

<MainMenu></MainMenu>