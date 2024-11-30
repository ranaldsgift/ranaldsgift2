<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { ICareer } from "$lib/entities/career/Career";
	import CareerBuildPortrait from "./CareerBuildPortrait.svelte";
	import CooldownBar from "./CooldownBar.svelte";
	import HealthBar from "./HealthBar.svelte";

	type Props = {
		build: ICareerBuild;
		career: ICareer;
	};

	const { build, career }: Props = $props();

	let health = $derived.by(() => {
		if (!build.necklace || (build.necklace.property1?.name !== "Health" && build.necklace.property2?.name !== "Health")) {
			return build.career.health;
		}

		let healthModifier = 0;

		if (build.necklace.property1?.name === "Health") {
			if (build.necklace.property1Value) {
				healthModifier = build.necklace.property1Value / 100;
			}
			healthModifier = build.necklace.property1.maximumValue / 100;
		}

		if (build.necklace.property2?.name === "Health") {
			if (build.necklace.property2Value) {
				healthModifier = build.necklace.property2Value / 100;
			}
			healthModifier = build.necklace.property2.maximumValue / 100;
		}

		return build.career.health * (1 + healthModifier);
	});

	let cooldown = $derived.by(() => {
		if (
			!build.trinket ||
			(build.trinket.property1?.name !== "Cooldown Reduction" && build.trinket.property2?.name !== "Cooldown Reduction")
		) {
			return build.career.skill.cooldown;
		}

		let cooldownModifier = 0;

		if (build.trinket.property1?.name === "Cooldown Reduction") {
			if (build.trinket.property1Value) {
				cooldownModifier = build.trinket.property1Value / 100;
			}
			cooldownModifier = build.trinket.property1.maximumValue / 100;
		}

		if (build.trinket.property2?.name === "Cooldown Reduction") {
			if (build.trinket.property2Value) {
				cooldownModifier = build.trinket.property2Value / 100;
			}
			cooldownModifier = build.trinket.property2.maximumValue / 100;
		}

		return build.career.skill.cooldown * (1 - cooldownModifier);
	});
</script>

<div class="career-summary-container">
	<div class="career-name-container mobile:block hidden">
		<p class="career-name-header header-gradient-underline">{career.name}</p>
		<p class="career-name">{career.hero.name}</p>
	</div>
	<div class="career-portrait-container">
		<CareerBuildPortrait {build} size="160px"></CareerBuildPortrait>
	</div>
	<div class="career-attributes max-w-[400px] mobile:block hidden">
		<div class="health-container">
			<p>Health</p>
			<HealthBar {health}></HealthBar>
		</div>
		<div class="cooldown-container">
			<p class="skill-cooldown-label">Skill Cooldown</p>
			<CooldownBar {cooldown}></CooldownBar>
		</div>
	</div>
</div>

<style>
	.career-name-header {
		color: #c15b24;
		font-size: 1.5rem;
	}
	.career-summary-container {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.career-portrait-container {
		grid-area: careerPortrait;
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
	@media (min-width: 480px) {
		.career-summary-container {
			width: auto;
			display: grid;
			align-items: start;
			grid-area: careerSummary;
			grid-row-gap: 10px;
			grid-column-gap: 20px;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			grid-template-columns: auto minmax(225px, 1fr);
			grid-template-rows: auto 1fr;
			grid-template-areas: "careerPortrait careerName" "careerPortrait careerAttributes";
		}
		.career-portrait {
			height: 175px;
			background-size: contain;
			border: none;
			background: var(--background) center right / contain no-repeat;
		}
	}
</style>
