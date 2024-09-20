<script lang="ts">
	import ButtonLink from "$lib/components/ButtonLink.svelte";

	const adminPages = [
		{
			name: "Events",
			url: "/admin/events",
		},
		{
			name: "Patches",
			url: "/admin/patches",
		},
		{
			name: "Careers",
			url: "/admin/careers",
		},
		{
			name: "Weapons",
			url: "/admin/weapons",
		},
		{
			name: "Properties",
			url: "/admin/properties",
		},
		{
			name: "Traits",
			url: "/admin/traits",
		},
		{
			name: "Enemies",
			url: "/admin/enemies",
		},
		{
			name: "Missions",
			url: "/admin/missions",
		},
		{
			name: "Difficulties",
			url: "/admin/difficulties",
		},
		{
			name: "Diff. Modifiers",
			url: "/admin/difficulty-modifiers",
		},
		{
			name: "Twitch Settings",
			url: "/admin/twitch-settings",
		},
		{
			name: "Build Roles",
			url: "/admin/build-roles",
		},
		/* 		{
			name: "Books",
			url: "/admin/books",
		},
		{
			name: "Potions",
			url: "/admin/potions",
		}, */
	];
</script>

<div class="max-w-6xl text-xl mx-auto mt-8 p-6 background-14 border-04 rounded shadow">
	<h1 class="mb-6">Use the following pages to manage various ranalds.gift data tables.</h1>
	<div class="divider-06 h-[48px]"></div>
	<ul class="grid grid-cols-3 gap-5">
		{#each adminPages as page}
			<li class="w-full flex justify-center"><ButtonLink url={page.url}>{page.name}</ButtonLink></li>
		{/each}
	</ul>
</div>
