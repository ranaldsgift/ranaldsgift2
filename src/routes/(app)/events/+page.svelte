<script lang="ts">
	import Breadcrumbs from "$lib/components/Breadcrumb.svelte";
	import ContentContainer from "$lib/components/ContentContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";

	let { data } = $props();
</script>

<Seo
	title="Events"
	description="View upcoming and past Onslaught Series and other community events."
	image="/images/onslaught-series/tournament-series.png"
/>

<Breadcrumbs links={[{ href: "/", text: "Home" }]}>Events</Breadcrumbs>

<div class="page-layout border-01 background-39 m-auto max-w-7xl top-left-shadow relative">
	<div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 pointer-events-none z-0"></div>
	<div class="page-content p-5 text-[1.2rem] relative z-1">
		<div class="grid gap-8">
			{#if data.activeEvents.length > 0}
				<section>
					<TextHeader>Active Events</TextHeader>
					<div class="divider-21 w-full h-[20px] mb-2"></div>
					<div class="flex flex-wrap gap-4 justify-center">
						{#each data.activeEvents as event}
							<ContentContainer>
								<h3 class="text-xl font-semibold"><a href="/event/{event.id}">{event.name}</a></h3>
								<p>Start: {new Date(event.startDate).toDateString()}</p>
								<p>End: {new Date(event.endDate).toDateString()}</p>
							</ContentContainer>
						{/each}
					</div>
				</section>
			{/if}

			{#if data.upcomingEvents.length > 0}
				<section>
					<TextHeader>Upcoming Events</TextHeader>
					<div class="divider-21 w-full h-[20px] mb-2"></div>
					<div class="flex flex-wrap gap-4 justify-center">
						{#each data.upcomingEvents as event}
							<ContentContainer>
								<h3 class="text-xl font-semibold"><a href="/event/{event.id}">{event.name}</a></h3>
								<p>Start: {new Date(event.startDate).toDateString()}</p>
								<p>End: {new Date(event.endDate).toDateString()}</p>
							</ContentContainer>
						{/each}
					</div>
				</section>
			{/if}

			{#if data.pastEvents.length > 0}
				<section>
					<h2 class="text-2xl font-bold mb-4">Past Events</h2>
					<ul class="space-y-4">
						{#each data.pastEvents as event}
							<li class="p-4 rounded-lg">
								<h3 class="text-xl font-semibold"><a href="/event/{event.id}">{event.name}</a></h3>
								<p>Start: {new Date(event.startDate).toLocaleString()}</p>
								<p>End: {new Date(event.endDate).toLocaleString()}</p>
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		</div>
	</div>
</div>
