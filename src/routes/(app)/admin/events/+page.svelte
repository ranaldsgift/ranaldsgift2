<script lang="ts">
	import type { IEvent } from "$lib/entities/Event.ts";
	import { goto } from "$app/navigation";

	let { data } = $props();

	let events: IEvent[] = $derived(data.events);
</script>

<div class="page-layout border-01 background-39 m-auto max-w-7xl top-left-shadow relative">
	<div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 pointer-events-none z-0"></div>
	<div class="page-content p-5 text-[1.2rem] relative z-1">
		<div class="grid gap-4">
			{#each events as event}
				<div class="grid grid-cols-5 gap-2 items-center">
					<span class="col-span-1">{event.name}</span>
					<span class="col-span-1">{new Date(event.startDate).toLocaleString()}</span>
					<span class="col-span-1">{new Date(event.endDate).toLocaleString()}</span>
					<span class="col-span-1">{event.isActive ? "Active" : "Inactive"}</span>
					<a href={`/event/${event.id}/edit`} class="col-span-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Edit</a>
				</div>
			{/each}
			<a href="/event/create" class="bg-green-500 text-white p-2 rounded hover:bg-green-600">Add New Event</a>
		</div>
	</div>
</div>
