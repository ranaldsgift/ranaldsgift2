<script lang="ts">
	import TeamManager from "./team/TeamManager.svelte";

	let activeTab = $state<string | null>(null);
	let tabContainer: HTMLDivElement;

	$effect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (tabContainer && !tabContainer.contains(event.target as Node)) {
				activeTab = null;
			}
		}

		window.addEventListener("click", handleClickOutside);
		return () => window.removeEventListener("click", handleClickOutside);
	});
</script>

<div class="fixed bottom-1 left-5 flex flex-col gap-2 pb-16 z-[100]" bind:this={tabContainer}>
	<div class="absolute bottom-0 flex gap-2">
		<button
			class="p-2 border-02 size-[50px] bg-black/70 hidden"
			class:active={activeTab === "builds"}
			onclick={() => (activeTab = activeTab === "builds" ? null : "builds")}
		>
			<img src="/images/icons/anvil-icon.png" alt="Builds" />
		</button>
		<button
			class="p-2 border-02 size-[50px] bg-black/70"
			class:active={activeTab === "teams"}
			onclick={() => (activeTab = activeTab === "teams" ? null : "teams")}
		>
			<img src="/images/icons/team.png" alt="Teams" />
		</button>
	</div>
	{#if activeTab === "builds"}
		<div class="p-4 bg-background border-02 rounded-t-lg">
			<!-- Builds content here -->
			<p>Builds Content</p>
		</div>
	{/if}

	{#if activeTab === "teams"}
		<div class="bg-black/70">
			<TeamManager />
		</div>
	{/if}
</div>
