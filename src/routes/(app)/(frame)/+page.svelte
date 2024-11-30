<script lang="ts">
	import PageContainer from "$lib/components/containers/PageContainer.svelte";
	import ContentContainer from "$lib/components/ContentContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";
	import { META_IMAGE_URL, ROOT_PAGE_DESCRIPTION, ROOT_PAGE_TITLE } from "$lib/data/constants/constants";

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
		{ title: "Stats", url: "/careers", background: "/images/menu/stats.png" },
		{ title: "Events", url: "/events", background: "/images/menu/events.png" },
		{ title: "Onslaught Series", url: "/onslaught-series", background: "/images/menu/onslaught-series.png" },
		{ title: "Modded Difficulties", url: "/modded-difficulties", background: "/images/menu/modded-difficulties.png" },
		{ title: "Resources", url: "/resources", background: "/images/menu/resources.png" },
	];
</script>

<Seo title="Home" description={ROOT_PAGE_DESCRIPTION} image={META_IMAGE_URL} />

<PageContainer>
	<TextHeader>Ranald's Gift</TextHeader>
	<div class="divider-21 w-full h-[20px] mb-2"></div>
	<ContentContainer class="max-w-[1200px] m-auto text-center">
		<p>Your Resource for Vermintide 2 Builds, Mechanics and Gameplay Information</p>
		<div class="divider-10 h-[26px] !bg-contain my-2"></div>
		<div class="grid grid-cols-2 gap-5 max-w-[820px] m-auto justify-center">
			{#each pages as page, index}
				<a
					class="menu-button p-5 relative"
					class:col-span-2={index === 0}
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
			linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
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
		transition: background 0.3s ease; /* Add transition for smooth effect */
	}
	.menu-button:hover::after {
		background:
			linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.3)),
			var(--background) center right / contain no-repeat,
			url("/images/backgrounds/background25.png");
	}
</style>
