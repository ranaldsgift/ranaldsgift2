<script lang="ts">
	import PageContainer from "$lib/components/containers/PageContainer.svelte";
	import ContentContainer from "$lib/components/ContentContainer.svelte";
	import MainMenu from "$lib/components/navigation/MainMenu.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";

	const { data } = $props();

	const pages = [
		{ title: "Builds", url: "/builds", background: "/images/menu/builds.png" },
		{ title: "Hero Editor", url: "/heroes", background: "/images/menu/hero-editor.png" },
		/* 		{ title: "Careers", url: "/careers" },
		{ title: "Weapons", url: "/weapons" },
		{ title: "Missions", url: "/missions" },
		{ title: "Enemies", url: "/enemies" },
		{ title: "Fight The Tide", url: "/fight-the-tide" },
		{ title: "Breakpoints", url: "/breakpoints" },
		{ title: "Deeds", url: "/deeds" },
		{ title: "Chaos Wastes", url: "/wastes" },
		{ title: "Versus", url: "/versus" },
		{ title: "Weaves", url: "/weaves" }, */
		{ title: "Events", url: "/events", background: "/images/menu/events.png" },
		{ title: "Onslaught Series", url: "/onslaught-series", background: "/images/menu/onslaught-series.png" },
		{ title: "Modded Difficulties", url: "/modded-difficulties", background: "/images/menu/modded-difficulties.png" },
		{ title: "Resources", url: "/resources", background: "/images/menu/resources.png" },
	];
</script>

<PageContainer>
	<TextHeader>Ranald's Gift</TextHeader>
	<div class="divider-21 w-full h-[20px] mb-2"></div>
	<ContentContainer class="max-w-[1200px] m-auto text-center">
		<p>Your Resource for Vermintide 2 Builds, Mechanics and Gameplay Information</p>
		<div class="divider-10 h-[26px] !bg-contain my-2"></div>
		<div class="flex flex-wrap gap-5 max-w-[620px] m-auto justify-center">
			{#each pages as page}
				<a
					class="menu-button flex-1-auto p-5 relative"
					style="--title: '{page.title}'; --background: url('{page.background}')"
					href={page.url}
					>{page.title}
				</a>
			{/each}
		</div>
	</ContentContainer>
</PageContainer>

<style>
	.menu-button {
		color: #9f9065;
		background: url("/images/backgrounds/background25.png");
		min-width: 300px;
		min-height: 100px;
	}
	.menu-button::after {
		content: var(--title);
		display: flex;
		justify-content: start;
		align-items: center;
		position: absolute;
		padding-left: 20px;
		font-size: 2rem;
		text-shadow: 1px 1px #000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:
			linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
			var(--background) center right / contain no-repeat,
			url("/images/backgrounds/background25.png");
		pointer-events: none;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border-image: url("/images/borders/border-08.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		border-image-repeat: repeat;
	}
</style>
