<script lang="ts">
	import type { ICareer } from "$lib/entities/career/Career";
	import BuildHelper from "$lib/helpers/BuildHelper";

	type Props = {
		career: ICareer;
	};

	const { career }: Props = $props();

	let correctedPerks = $derived(BuildHelper.getCorrectedPerks(career));
</script>

<div class="career-perks-container">
	<p class="career-perks-header">Perks</p>
	{#each correctedPerks as perk}
		<div class="career-perk-item-container">
			<p class="career-perk-item-header">
				<span class="relative text-[0.6rem] top-[-3px] left-[-4px]">&#9670;</span>{perk.name}
			</p>
			<p class="career-perk-item-description">{perk.description}</p>
		</div>
	{/each}
</div>

<style>
	.career-perk-item-container {
		display: grid;
		grid-template-rows: auto auto;
		grid-auto-columns: 1fr;
		grid-auto-flow: row;
		margin-left: 5px;
	}

	.career-perks-container {
		grid-area: careerPerks;
	}

	.career-perks-header {
		grid-area: abilityHeader;
		text-align: left;
		align-self: end;
		font-size: 1.7rem;
		position: relative;
	}

	.career-perks-header {
		padding-right: 4rem;
	}

	.career-perks-header::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: 0;
		background-image: linear-gradient(90deg, #808080b3 10%, #80808000);
	}

	.career-perk-item-description {
		text-align: left;
		color: #c8c8c8;
		font-size: 110%;
	}
	.career-perk-item-header {
		font-size: 120%;
		text-align: left;
	}

	.career-perk-item-description {
		margin-left: 13px;
	}

	.career-perks-container > * {
		margin-bottom: 5px;
	}
</style>
