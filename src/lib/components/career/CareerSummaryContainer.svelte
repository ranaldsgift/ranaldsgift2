<script lang="ts">
	import type { ICareer } from "$lib/entities/career/Career";
	import type { Snippet } from "svelte";
	import CooldownBar from "./CooldownBar.svelte";
	import HealthBar from "./HealthBar.svelte";

	type Props = {
		career: ICareer;
	};

	const { career }: Props = $props();
</script>

<div class="career-summary-container">
	<div class="career-name-container">
		<p class="career-name-header header-gradient-underline">{career.name}</p>
		<p class="career-name">{career.hero.name}</p>
	</div>
	<div class="career-portrait" style="background-image: url('/images/careers/{career.id}/portrait-alt.png')"></div>
	<div class="career-attributes max-w-[400px]">
		<div class="health-container">
			<p>Health</p>
			<HealthBar health={career.health}></HealthBar>
		</div>
		<div class="cooldown-container">
			<p class="skill-cooldown-label">Skill Cooldown</p>
			<CooldownBar cooldown={career.skill.cooldown}></CooldownBar>
		</div>
	</div>
</div>

<style>
	.career-name-header {
		color: #c15b24;
		font-size: 1.5rem;
	}
	.career-summary-container {
		grid-area: careerSummary;
		display: grid;
		grid-template-rows: auto 1fr;
		grid-template-columns: 145px 1fr;
		grid-row-gap: 10px;
		grid-column-gap: 20px;
		grid-template-areas: "careerPortrait careerName" "careerPortrait careerAttributes";
		align-items: start;
	}
	.career-summary-container .career-portrait {
		height: 175px;
	}
	.career-portrait {
		background-repeat: no-repeat;
		background-position: center;
		grid-area: careerPortrait;
		background-size: contain;
	}

	.career-name-container {
		grid-area: careerName;
	}

	.career-name-header {
		text-transform: uppercase;
	}

	.career-name {
		text-align: left;
		color: #c8c8c8;
		font-size: 110%;
	}
</style>
