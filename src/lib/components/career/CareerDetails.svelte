<script lang="ts">
	import type { ICareer } from "$lib/entities/career/Career";
	import CooldownBar from "./CooldownBar.svelte";
	import HealthBar from "./HealthBar.svelte";

	type Props = {
		career: ICareer;
	};

	let { career }: Props = $props();
</script>

<div class="career-details-container">
	<div class="career-summary-container">
		<div class="career-name-container">
			<p class="career-name-header">{career.name}</p>
			<p class="career-name">{career.hero.name}</p>
		</div>
		<div class="career-portrait" style="background-image: url('/images/careers/{career.id}/portrait-alt.png')"></div>
		<div class="career-attributes">
			<div class="health-container">
				<p>Health</p>
				<HealthBar health={career.health}></HealthBar>
			</div>
			<div class="cooldown-container">
				<p class="skill-cooldown-label">Skill Cooldown</p>
				<CooldownBar cooldown={career.skill.cooldown}></CooldownBar>
			</div>
		</div>
		<!-- <careerTalentSummary careerId={state.careerId} talents={state.talents}></careerTalentSummary> -->
	</div>
	<div class="career-skill-container">
		<p class="career-skill-header">{career.skill.name}</p>
		<div class="career-ability-icon border-13" style="background-image: url('/images/careers/{career.id}/skill.png')"></div>
		<p class="career-skill-description">{career.skill.description}</p>
	</div>
	<div class="career-passive-container">
		<p class="career-passive-header">{career.passive.name}</p>
		<div class="career-ability-icon border-13" style="background-image: url('/images/careers/{career.id}/passive.png')"></div>
		<p class="career-passive-description">{career.passive.description}</p>
	</div>
	<div class="career-perks-container">
		<p class="career-perks-header">Perks</p>
		{#each career.perks as perk}
			<div class="career-perk-item-container">
				<p class="career-perk-item-header">
					<span class="relative text-[0.6rem] top-[-3px] left-[-4px]">&#9670;</span>{perk.name}
				</p>
				<p class="career-perk-item-description">{perk.description}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.career-details-container {
		display: grid;
		grid-template-areas: "careerSummary careerPerks" "careerPassive careerSkill" "buildSummary buildSummary";
		grid-area: careerDetails;
		color: #c15b24;
		grid-template-rows: minmax(105px, auto) auto 1fr;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: 1fr 1fr;
	}

	.career-details-container .career-ability-icon {
		height: 60px;
		width: 60px;
		background-size: contain;
	}

	.career-perk-item-container {
		display: grid;
		grid-template-rows: auto auto;
		grid-auto-columns: 1fr;
		grid-auto-flow: row;
		margin-left: 5px;
	}

	.career-name-header {
		color: #c15b24;
		font-size: 1.5rem;
	}

	.career-left-container {
		grid-area: careerLeftContainer;
		align-self: start;
	}

	.career-details-container {
		grid-area: careerDetails;
	}

	.career-page > * {
		width: 100%;
	}

	.career-side-container {
		grid-area: careerSideContainer;
		padding: 10px;
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

	.career-side-container {
		background-size: cover;
	}

	.career-side-container {
		grid-area: careerSideContainer;
		padding: 10px;
		display: grid;
		grid-template-rows: 65px 153px 150px 150px 120px;
		grid-template-areas: "careerName" "careerSummary" "careerPassive" "careerSkill" "careerPerks";
		color: #c15b24;
		box-shadow: -1px -1px 0 0 #564640;
	}

	.career-skill-container {
		grid-area: careerSkill;
	}

	.career-passive-container {
		grid-area: careerPassive;
	}

	.career-passive-container,
	.career-skill-container {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 70px 1fr;
		grid-template-areas: "abilityHeader abilityHeader" "abilityIcon abilityDescription";
		grid-gap: 5px;
		align-content: start;
	}

	.career-perks-container {
		grid-area: careerPerks;
	}

	.career-portrait {
		background-repeat: no-repeat;
		background-position: center;
		grid-area: careerPortrait;
		background-size: contain;
	}

	.career-attributes {
		display: grid;
		grid-template-rows: 1fr 1fr;
		text-align: left;
		justify-content: left;
		justify-items: left;
		grid-template-columns: 1fr;
		grid-area: careerAttributes;
		position: relative;
		grid-row-gap: 10px;
	}

	.health-container,
	.cooldown-container {
		width: 100%;
	}

	.career-summary > p {
		width: 100%;
		text-align: left;
		position: relative;
	}

	.career-skill-header::after {
		content: "Career Skill";
	}

	.career-passive-header::after,
	.career-skill-header::after {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 1rem;
		color: #848484;
		margin-top: 5px;
	}

	.career-passive-header::after {
		content: "Passive Ability";
	}

	.career-skill-header::after {
		content: "Career Skill";
	}

	.career-passive-header,
	.career-skill-header,
	.career-perks-header,
	.career-name-header {
		grid-area: abilityHeader;
		text-align: left;
		align-self: end;
		font-size: 1.7rem;
		position: relative;
	}

	.career-passive-header,
	.career-skill-header,
	.career-perks-header {
		padding-right: 4rem;
	}

	.career-passive-header::before,
	.career-skill-header::before,
	.career-perks-header::before,
	.career-name-header::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: 0;
		background-image: linear-gradient(90deg, #808080b3 10%, #80808000);
	}

	.career-ability-icon {
		grid-area: abilityIcon;
		background-repeat: no-repeat;
	}

	.career-passive-description,
	.career-skill-description,
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

	.career-navigation-container {
		grid-area: careerNavigation;
		display: grid;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
	}
</style>
