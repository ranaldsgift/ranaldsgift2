<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import TextEditor from "$lib/components/quill/TextEditor.svelte";
	import { error } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";

	let { data } = $props();

	if (!data.event) {
		error(404, "Event not found");
	}

	let startDate = $state((new Date(data.event.startDate.getTime() - data.event.startDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -1));
	let endDate = $state((new Date(data.event.endDate.getTime() - data.event.endDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -1));

	async function saveEvent() {
		if (!data.event) {
			error(500, "Event not found");
		}
		data.event.startDate = new Date(startDate);
		data.event.endDate = new Date(endDate);
		try {
			const response = await fetch("/api/event/save", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data.event),
			});

			if (response.ok) {
				toast("Event saved successfully!", { position: "bottom-center" });
			} else {
				throw new Error("Failed to save event");
			}
		} catch (error) {
			console.error("Error saving event:", error);
			alert("Failed to save event. Please try again.");
		}
	}
</script>

{#if data.event}
<div class="max-w-6xl mx-auto p-6 background-14 border-04 rounded shadow">
	<h1 class="text-2xl font-bold mb-6">Edit Event</h1>

	<PageButtonContainer>
		<button class="button-02" onclick={saveEvent}>Save</button>
		<a class="button-02" href={`/event/${data.event.id}`}>Cancel</a>
	</PageButtonContainer>

	<form class="space-y-4">
		<div>
			<label for="name" class="block mb-1">Event Name:</label>
			<input id="name" bind:value={data.event.name} required class="w-full p-2 border rounded" />
		</div>

		<div>
			<label for="description" class="block mb-1">Description:</label>
			<!-- <textarea id="description" bind:value={event.description} rows="4" class="w-full p-2 border rounded"></textarea> -->
			 <div class="border-2"><TextEditor bind:content={data.event.description!}></TextEditor></div>
		</div>

		<div>
			<label for="startDate" class="block mb-1">Start Date:</label>
			<input id="startDate" type="datetime-local" bind:value={startDate} required class="w-full p-2 border rounded" />
		</div>

		<div>
			<label for="endDate" class="block mb-1">End Date:</label>
			<input id="endDate" type="datetime-local" bind:value={endDate} required class="w-full p-2 border rounded" />
		</div>

		<div>
			<label class="flex items-center">
				<input type="checkbox" bind:checked={data.event.isActive} class="mr-2" />
				<span>Is Active</span>
			</label>
		</div>
		</form>
	</div>
{/if}

<style>
	input {
		color: #000;
	}
</style>