<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import ButtonLink from "$lib/components/ButtonLink.svelte";
	import ContentContainer from "$lib/components/ContentContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";

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

<Seo title="Admin" description="This page can be used by moderators and admins to manage the website data." />

<Breadcrumb links={[{ href: "/", text: "Home" }]}>Admin</Breadcrumb>

<div class="page-layout border-01 background-39 m-auto max-w-7xl top-left-shadow relative">
	<div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 pointer-events-none z-0"></div>
	<div class="page-content p-5 text-[1.2rem] relative z-1">
		<TextHeader>Data Management</TextHeader>
		<div class="divider-21 w-full h-[20px] mb-2"></div>
		<ContentContainer class="max-w-6xl text-xl mx-auto p-6">
			<ul class="grid tablet:grid-cols-3 mobile:grid-cols-2 grid-cols-1 gap-5">
				{#each adminPages as page}
					<li class="w-full flex justify-center"><ButtonLink url={page.url}>{page.name}</ButtonLink></li>
				{/each}
			</ul>
		</ContentContainer>
	</div>
</div>
