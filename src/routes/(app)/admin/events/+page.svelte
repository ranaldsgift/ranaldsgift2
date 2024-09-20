<script lang="ts">
	import type { IEvent } from "$lib/entities/Event.ts";
	import { goto } from "$app/navigation";

	let { data } = $props();

	let events: IEvent[] = $derived(data.events);
</script>

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
