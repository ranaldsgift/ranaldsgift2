<script lang="ts">
	import { DateHelper } from './../../../lib/helpers/DateHelper.ts';
	import Breadcrumbs from "$lib/components/Breadcrumb.svelte";
	import ContentContainer from "$lib/components/ContentContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";
	import type { IEvent } from "$lib/entities/Event";

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
					<TextHeader>Ongoing Events</TextHeader>
					<div class="divider-21 w-full h-[20px] mb-2"></div>
					{@render eventList(data.activeEvents)}
				</section>
			{/if}

			{#if data.upcomingEvents.length > 0}
				<section>
					<TextHeader>Upcoming Events</TextHeader>
					<div class="divider-21 w-full h-[20px] mb-2"></div>
					{@render eventList(data.upcomingEvents)}
				</section>
			{/if}

			{#if data.pastEvents.length > 0}
				<section>
					<TextHeader>Past Events</TextHeader>
					<div class="divider-21 w-full h-[20px] mb-2"></div>
					{@render eventList(data.pastEvents)}
				</section>
			{/if}
		</div>
	</div>
</div>

{#snippet eventSummary(event: IEvent)}
<a href="/event/{event.id}" class="event-button">
	<ContentContainer class="border-31">
		<h3 class="text-xl font-semibold hover:underline text-center mb-1">{event.name}</h3>
		<div class="divider-10 h-[26px] !bg-contain my-2"></div>
		<div class="grid grid-cols-1 text-center gap-x-2 !text-white">
			<span class="italic">Start</span>
			<span>{DateHelper.formatDateWithTimeZone(event.startDate)}</span>
			<span class="italic">End</span>
			<span>{DateHelper.formatDateWithTimeZone(event.endDate)}</span>
		</div>
	</ContentContainer>
</a>
{/snippet}

{#snippet eventList(events: IEvent[])}
<div class="flex flex-wrap gap-4 justify-center">
	{#each events as event}
		{@render eventSummary(event)}
	{/each}
</div>
{/snippet}

<style>
.event-button {
	text-decoration: none;
}
.event-button:hover h3 {
	text-decoration: underline;
}
</style>