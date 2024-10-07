<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import TextEditor from "$lib/components/quill/TextEditor.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import { ROOT_API_URL } from "$lib/data/constants/constants";
	import type { IEvent } from "$lib/entities/Event";

	let event: Partial<IEvent> = $state({
		name: "",
		description: "",
		startDate: new Date(),
		endDate: new Date(),
		isActive: true,
	});

	async function saveEvent() {
		try {
			const response = await fetch(`${ROOT_API_URL}/event/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(event),
			});

			if (response.ok) {
				alert("Event saved successfully!");
				goto("/admin/events");
			} else {
				throw new Error("Failed to save event");
			}
		} catch (error) {
			console.error("Error saving event:", error);
			alert("Failed to save event. Please try again.");
		}
	}
</script>

<Seo
	title="Create New Event"
/>

<Breadcrumb links={[{ href: "/", text: "Home" }, { href: "/events", text: "Events" }]}>Create New Event</Breadcrumb>

<div class="max-w-6xl mx-auto mt-8 p-6 background-28 border-04 rounded shadow">
	<h1 class="text-2xl font-bold mb-6">Create New Event</h1>

	<form onsubmit={saveEvent} use:enhance class="space-y-4">
		<div>
			<label for="name" class="block mb-1">Event Name:</label>
			<input id="name" bind:value={event.name} required class="w-full p-2 border rounded" />
		</div>

		<div>
			<label for="description" class="block mb-1">Description:</label>
			<!-- <textarea id="description" bind:value={event.description} rows="4" class="w-full p-2 border rounded"></textarea> -->
			 <div class="border-2"><TextEditor bind:content={event.description!}></TextEditor></div>
		</div>

		<div>
			<label for="startDate" class="block mb-1">Start Date:</label>
			<input id="startDate" type="datetime-local" bind:value={event.startDate} required class="w-full p-2 border rounded" />
		</div>

		<div>
			<label for="endDate" class="block mb-1">End Date:</label>
			<input id="endDate" type="datetime-local" bind:value={event.endDate} required class="w-full p-2 border rounded" />
		</div>

		<div>
			<label class="flex items-center">
				<input type="checkbox" bind:checked={event.isActive} class="mr-2" />
				<span>Is Active</span>
			</label>
		</div>

		<button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"> Save Event </button>
	</form>
</div>

<style>
	input {
		color: #000;
	}
</style>