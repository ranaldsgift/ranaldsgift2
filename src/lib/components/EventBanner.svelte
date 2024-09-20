<script lang="ts">
	import type { IEvent } from "$lib/entities/Event";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { goto } from "$app/navigation";

	let { events = [] } = $props<{ events: IEvent[] }>();
	let dismissedEvents = $state<number[]>([]);
	let currentEventIndex = $state(0);
	let isMouseOver = $state(false);
	let isMounted = $state(false);

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
		if (startDate.getTime() === endDate.getTime()) {
			return `${formatDate(startDate)}`;
		} else {
			return `${formatDate(startDate)} - ${formatDate(endDate)}`;
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
			<div class="event-name-container">
				{#if !dismissedEvents.includes(events[currentEventIndex].id)}
					{#key currentEventIndex}
						<button
							class="event-button"
							onclick={() => handleEventClick(events[currentEventIndex].id)}
							in:fade={{ duration: 300 }}
							out:fade={{ duration: 300 }}
						>
							<span class="text-white">Upcoming Event:</span>
							<span>{events[currentEventIndex].name}</span>
							<span class="event-dates">
								{`-- ${formattedEventDate}`}
							</span>
						</button>
					{/key}
				{/if}
			</div>
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
		bottom: -4px;
		left: 50px;
		right: 50px;
		margin: 0 auto;
		padding: 10px;
		z-index: 1000000;
		height: 60px;
	}

	.event-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
	}

	.event-name-container {
		flex: 1;
		display: flex;
		justify-content: flex-start;
		overflow: hidden;
		justify-content: center;
		font-size: 1.2rem;
		color: #928962;
		color: #30e158;
	}

	.event-button {
		white-space: nowrap;
		position: absolute;
		text-align: center;
		margin: 0 auto;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		font-size: inherit;
		color: inherit;
		padding: 0;
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
