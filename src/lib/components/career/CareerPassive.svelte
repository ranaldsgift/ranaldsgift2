<script lang="ts">
	import type { ICareer } from "$lib/entities/career/Career";

	type Props = {
		career: ICareer;
	};

	const { career }: Props = $props();
</script>

<div class="career-passive-container">
	<p class="career-passive-header">{career.passive.name}</p>
	<div class="career-ability-icon border-13" style="background-image: url('/images/careers/{career.id}/passive.png')"></div>
	<p class="career-passive-description">{career.passive.description}</p>
</div>

<style>
	.career-passive-container {
		display: grid;
		grid-area: careerPassive;
		grid-template-rows: auto auto;
		grid-template-columns: 70px 1fr;
		grid-template-areas: "abilityHeader abilityHeader" "abilityIcon abilityDescription";
		grid-gap: 5px;
		align-content: start;
	}
	.career-passive-header::after {
		content: "Passive Ability";
	}

	.career-passive-header::after {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 1rem;
		color: #848484;
		margin-top: 5px;
	}

	.career-passive-header {
		grid-area: abilityHeader;
		text-align: left;
		align-self: end;
		font-size: 1.7rem;
		position: relative;
	}

	.career-passive-header {
		padding-right: 4rem;
	}

	.career-passive-header::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: 0;
		background-image: linear-gradient(90deg, #808080b3 10%, #80808000);
	}

	.career-passive-description {
		text-align: left;
		color: #c8c8c8;
		font-size: 110%;
	}
</style>
