<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import ContentContainer from "$lib/components/ContentContainer.svelte";
import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import TextEditor from "$lib/components/quill/TextEditor.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";
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
<Seo
	title={data.event.name}
	description={data.event.description}
/>

<Breadcrumb links={[{ href: "/", text: "Home" }, { href: "/events", text: "Events" }]}>{data.event.name}</Breadcrumb>

{#if userState.isPrivileged}
<PageButtonContainer>
	<a class="button-02" href={`/event/${data.event.id}/edit`}>Edit</a>
</PageButtonContainer>
{/if}

<ContentContainer class="max-w-6xl mx-auto p-5">
	<TextHeader>{data.event.name}</TextHeader>
	<div class="divider-21 w-full h-[20px] mb-2"></div>
	<div class="space-y-4">
		<div class="grid justify-center">
			<p><strong>Starts:</strong> {formattedStartDate}</p>
			<p><strong>Ends:</strong> {formattedEndDate}</p>
		</div>
		<div>
			<TextEditor readOnly={true} content={data.event.description!}></TextEditor>
		</div>
	</div>
</ContentContainer>
{/if}
