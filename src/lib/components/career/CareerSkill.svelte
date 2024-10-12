<script lang="ts">
	import type { ICareer } from "$lib/entities/career/Career";
	import BuildHelper from "$lib/helpers/BuildHelper";

	type Props = {
		career: ICareer;
	};

	const { career }: Props = $props();

	let skillDescription = $derived(BuildHelper.getCorrectedSkill(career)?.description ?? "");
</script>

<div class="career-skill-container">
	<p class="career-skill-header">{career.skill.name}</p>
	<div class="career-ability-icon border-13" style="background-image: url('/images/careers/{career.id}/skill.png')"></div>
	<p class="career-skill-description">{skillDescription}</p>
</div>

<style>
	.career-skill-container {
		grid-area: careerSkill;
	}
	.career-skill-container {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 70px 1fr;
		grid-template-areas: "abilityHeader abilityHeader" "abilityIcon abilityDescription";
		grid-gap: 5px;
		align-content: start;
	}
	.career-skill-header::after {
		content: "Career Skill";
	}

	.career-skill-header::after {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 1rem;
		color: #848484;
		margin-top: 5px;
	}

	.career-skill-header {
		grid-area: abilityHeader;
		text-align: left;
		align-self: end;
		font-size: 1.7rem;
		position: relative;
	}

	.career-skill-header {
		padding-right: 4rem;
	}

	.career-skill-header::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: 0;
		background-image: linear-gradient(90deg, #808080b3 10%, #80808000);
	}

	.career-skill-description {
		text-align: left;
		color: #c8c8c8;
		font-size: 110%;
	}
</style>
