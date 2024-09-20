<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import TextEditor from "$lib/components/quill/TextEditor.svelte";
	import { getUserState } from "$lib/state/UserState.svelte.js";
	import { error } from "@sveltejs/kit";

	let { data } = $props();

	if (!data.event) {
		error(404, "Event not found");
	}

	const userState = getUserState();

	function formatDate(date: Date): string {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	let formattedStartDate = $derived(formatDate(new Date(data.event.startDate)));
	let formattedEndDate = $derived(formatDate(new Date(data.event.endDate)));
</script>

{#if data.event}
	<div class="page-layout max-w-6xl mx-auto p-6 background-14 border-04 rounded shadow">
		{#if userState.isPrivileged}
			<PageButtonContainer>
				<a class="button-02" href={`/event/${data.event.id}/edit`}>Edit</a>
			</PageButtonContainer>
		{/if}
		<h1 class="text-2xl font-bold mb-6">{data.event.name}</h1>

		<div class="space-y-4">
			<div>
				<p><strong>Start Date:</strong> {formattedStartDate}</p>
				<p><strong>End Date:</strong> {formattedEndDate}</p>
			</div>
			<div>
				<TextEditor readOnly={true} content={data.event.description!}></TextEditor>
			</div>
		</div>
	</div>
{/if}
