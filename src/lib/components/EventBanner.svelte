<script lang="ts">
	import type { IEvent } from "$lib/entities/Event";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { goto } from "$app/navigation";
	import { EventsStore } from "$lib/stores/DataStores";

	let dismissedEvents = $state<number[]>([]);
	let currentEventIndex = $state(0);
	let isMouseOver = $state(false);
	let isMounted = $state(false);

	let events = $state<IEvent[]>([]);

	$effect(() => {
		const endAfterTime = new Date().toISOString().split("T")[0];

		EventsStore.loadData(`isActive=true&endAfter=${endAfterTime}`).then((data) => {
			events = data.items;
		});
	});

	function cycleEvent(forced = false) {
		if (!isMouseOver || forced) {
			let nextIndex = currentEventIndex;
			do {
				nextIndex = (nextIndex + 1) % events.length;
			} while (dismissedEvents.includes(events[nextIndex].id) && dismissedEvents.length < events.length);
			currentEventIndex = nextIndex;
		}
	}

	function dismissEvent(eventId: number) {
		dismissedEvents = [...dismissedEvents, eventId];
		localStorage.setItem("dismissedEvents", JSON.stringify(dismissedEvents));
		cycleEvent(true);
	}

	function handleEventClick(eventId: number) {
		dismissEvent(eventId);
		goto(`/event/${eventId}`);
	}

	function formatDate(date: Date): string {
		return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	}

	let formattedEventDate = $derived.by(() => {
		if (events.length === 0) return "";

		const currentEvent = events[currentEventIndex];
		const { startDate, endDate } = currentEvent;

		let start = new Date(startDate);
		let end = new Date(endDate);

		if (start.getTime() === end.getTime()) {
			return `${formatDate(start)}`;
		} else {
			return `${formatDate(start)} - ${formatDate(end)}`;
		}
	});

	let allEventsDismissed = $derived.by(() => events.every((event: IEvent) => dismissedEvents.includes(event.id)));

	$effect(() => {
		if (events.length > 0) {
			const interval = setInterval(cycleEvent, 5000); // Cycle every 5 seconds
			return () => clearInterval(interval);
		}
	});

	onMount(() => {
		const storedDismissedEvents = localStorage.getItem("dismissedEvents");
		if (storedDismissedEvents) {
			dismissedEvents = JSON.parse(storedDismissedEvents);
		}
		isMounted = true;

		if (events.length > 0) {
			cycleEvent();
		}
	});
</script>

{#if events.length > 0 && !allEventsDismissed && isMounted}
	<div
		class="event-banner border-11 background-22"
		transition:fade={{ duration: 300 }}
		role="banner"
		aria-live="polite"
		onmouseenter={() => (isMouseOver = true)}
		onmouseleave={() => (isMouseOver = false)}
	>
		<div class="event-content">
			{#if !dismissedEvents.includes(events[currentEventIndex].id)}
				{#key currentEventIndex}
					<button
						class="event-button"
						onclick={() => handleEventClick(events[currentEventIndex].id)}
						in:fade={{ duration: 300 }}
						out:fade={{ duration: 300 }}
					>
						<span class="text-white"
							>{new Date(events[currentEventIndex].startDate).getTime() > Date.now() ? "Ongoing" : "Upcoming"} Event:</span
						>
						<span>{events[currentEventIndex].name}</span>
						<span class="event-dates">
							{`-- ${formattedEventDate}`}
						</span>
					</button>
				{/key}
			{/if}
			<div class="action-buttons">
				<button class="dismiss-button" onclick={() => dismissEvent(events[currentEventIndex].id)} aria-label="Dismiss event">
					✕
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.event-banner {
		position: fixed;
		bottom: -5px;
		margin: 0 auto;
		padding: 10px 20px;
		z-index: 1000000;
		font-size: 1.2rem;
		color: #30e158;
		left: 50%;
		transform: translateX(-50%);
	}

	.event-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
	}

	.event-content button:nth-child(n + 2) {
		display: none;
	}

	.event-name-container {
		flex: 1;
		display: flex;
		justify-content: flex-start;
		overflow: hidden;
		justify-content: center;
	}

	.event-button {
		text-align: left;
		background: none;
		border: none;
		cursor: pointer;
		font-size: inherit;
		color: inherit;
		padding: 0 40px 0 0;
		margin: 0 auto;
	}

	.event-dates {
		font-weight: normal;
	}

	.action-buttons {
		display: flex;
		top: 50%;
		transform: translateY(-50%);
		position: absolute;
		right: 20px;
	}

	.dismiss-button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.2em;
		padding: 0;
	}
</style>
