<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import TextEditor from "$lib/components/quill/TextEditor.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import { ROOT_API_URL } from "$lib/data/constants/constants.js";
	import { error } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";

	let { data } = $props();

	if (!data.event) {
		error(404, "Event not found");
	}

	const startDateTime = new Date(data.event.startDate);
	const endDateTime = new Date(data.event.endDate);

	let startDate = $state(new Date(startDateTime.getTime() - startDateTime.getTimezoneOffset() * 60000).toISOString().slice(0, -1));
	let endDate = $state(new Date(endDateTime.getTime() - endDateTime.getTimezoneOffset() * 60000).toISOString().slice(0, -1));

	async function saveEvent() {
		if (!data.event) {
			error(500, "Event not found");
		}
		data.event.startDate = new Date(startDate);
		data.event.endDate = new Date(endDate);
		try {
			const response = await fetch(`${ROOT_API_URL}/event/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data.event),
			});

			if (response.ok) {
				toast("Event saved!", { position: "bottom-center" });
			} else {
				const json = await response.json();
				toast(json.error, { position: "bottom-center" });
			}
		} catch (error) {
			console.error("Error saving event:", error);
			toast("Failed to save event. Please try again.", { position: "bottom-center" });
		}
	}
</script>

{#if data.event}
<Seo
	title="Edit Event"
	description={data.event.description}
/>

<Breadcrumb links={[{ href: "/", text: "Home" }, { href: "/events", text: "Events" }, { href: `/event/${data.event.id}`, text: data.event.name }]}>Edit</Breadcrumb>

<PageButtonContainer>
	<button class="button-02" onclick={saveEvent}>Save</button>
	<a class="button-02" href={`/event/${data.event.id}`}>Cancel</a>
</PageButtonContainer>

<div class="max-w-6xl mx-auto p-6 background-14 border-04 rounded shadow">
	<h1 class="text-2xl font-bold mb-6">Edit Event</h1>
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