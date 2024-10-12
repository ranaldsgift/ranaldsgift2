<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { ICareerTalent } from "$lib/entities/career/CareerTalent";
	import BuildHelper from "$lib/helpers/BuildHelper";
	import CareerTalent from "./CareerTalent.svelte";

	type Props = {
		build: ICareerBuild;
		readOnly?: boolean;
	};

	let { build = $bindable(), readOnly = false }: Props = $props();

	let careerId = $derived(build.career.id);
	let showDescriptions = $state(false);

	let talents = $derived(BuildHelper.getCorrectedTalents(build.career.talents, build.career.id));

	let talentButtonHandler = (talent: ICareerTalent) => {
		let tier = Math.ceil(talent.talentNumber / 3);

		if (BuildHelper.isTalentSelected(talent, build)) {
			switch (tier) {
				case 1:
					build.level5Talent = undefined;
					break;
				case 2:
					build.level10Talent = undefined;
					break;
				case 3:
					build.level15Talent = undefined;
					break;
				case 4:
					build.level20Talent = undefined;
					break;
				case 5:
					build.level25Talent = undefined;
					break;
				case 6:
					build.level30Talent = undefined;
					break;
			}
			return;
		}

		switch (tier) {
			case 1:
				build.level5Talent = talent;
				break;
			case 2:
				build.level10Talent = talent;
				break;
			case 3:
				build.level15Talent = talent;
				break;
			case 4:
				build.level20Talent = talent;
				break;
			case 5:
				build.level25Talent = talent;
				break;
			case 6:
				build.level30Talent = talent;
				break;
		}
	};
</script>

<div>
	<div class="career-talents-container relative" data-career={careerId}>
		<div class="hero-talents-grid-bg background-26"></div>
		<div class="hero-talents-grid-border border-01"></div>
		<div class="career-talents">
			<div class="hero-talents-container" data-show-descriptions={showDescriptions}>
				<div class="hero-talents-grid" data-career={careerId}>
					<span class="hero-talents-header">Talents</span>
					<button class="show-talent-descriptions" onclick={() => (showDescriptions = !showDescriptions)}>
						{showDescriptions ? "Hide" : "Show"} Descriptions
					</button>
					{#each talents as talent}
						{#if (talent.talentNumber - 1) % 3 === 0}
							<span
								class="talent-lock-icon justify-self-center"
								style="--size: 84px;
                                --talent-tier-level: '{Math.ceil(talent.talentNumber / 3) * 5}';"
							></span>
						{/if}
						<button
							class="talent-button"
							onclick={() => {
								!readOnly ? talentButtonHandler(talent) : null;
							}}
						>
							<CareerTalent
								state={BuildHelper.isTalentSelected(talent, build) ? "selected" : "unselected"}
								{careerId}
								{talent}
								size="84px"
								transparent={true}
								showDescription={showDescriptions}
								tooltipPosition="top"
							/>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.hero-talents-container[data-show-descriptions="true"] .talent-button {
		height: 100%;
		display: grid;
	}
	.hero-talents-container[data-show-descriptions="true"] .talent-container {
		height: 100%;
	}
	.hero-talents-container {
		grid-area: heroTalents;
		position: relative;
		height: auto;
	}
	@media (min-width: 1000px) {
		.hero-talents-grid {
			grid-auto-rows: auto !important;
			grid-template-rows: unset !important;
			grid-template-columns: 85px 1fr 1fr 1fr !important;
			grid-template-areas:
				"heroTalentsHeader heroTalentsHeader heroTalentsHeader heroTalentsHeader"
				"heroTalentLevel5 heroTalent1 heroTalent2 heroTalent3"
				"heroTalentLevel10 heroTalent4 heroTalent5 heroTalent6"
				"heroTalentLevel15 heroTalent7 heroTalent8 heroTalent9"
				"heroTalentLevel20 heroTalent10 heroTalent11 heroTalent12"
				"heroTalentLevel25 heroTalent13 heroTalent14 heroTalent15"
				"heroTalentLevel30 heroTalent16 heroTalent17 heroTalent18" !important;
			grid-row-gap: 5px;
			position: relative;
			width: calc(100% - 20px);
			height: calc(100% - 20px);
			padding: 10px;
			color: #c15b24;
		}
	}
	.hero-talents-grid {
		position: relative !important;
		display: grid;
		grid-template-rows: 40px repeat(24, 88px);
		grid-template-columns: 1fr;
		grid-template-areas:
			"heroTalentsHeader"
			"heroTalentLevel5"
			"heroTalent1"
			"heroTalent2"
			"heroTalent3"
			"heroTalentLevel10"
			"heroTalent4"
			"heroTalent5"
			"heroTalent6"
			"heroTalentLevel15"
			"heroTalent7"
			"heroTalent8"
			"heroTalent9"
			"heroTalentLevel20"
			"heroTalent10"
			"heroTalent11"
			"heroTalent12"
			"heroTalentLevel25"
			"heroTalent13"
			"heroTalent14"
			"heroTalent15"
			"heroTalentLevel30"
			"heroTalent16"
			"heroTalent17"
			"heroTalent18";
	}
	.hero-talents-header {
		grid-area: heroTalentsHeader;
		font-size: 200%;
		text-transform: uppercase;
		color: #c15b24;
		align-self: center;
		text-shadow: 2px 2px 2px black;
		text-align: center;
	}

	.career-talents-container[data-career="1"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(87, 57, 57, 0.45), rgba(87, 57, 57, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="2"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(89, 98, 61, 0.45), rgba(89, 98, 61, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="3"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(9, 20, 41, 0.45), rgba(9, 20, 41, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="4"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(29, 37, 5, 0.45), rgba(29, 37, 5, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="5"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(10, 54, 63, 0.45), rgba(10, 54, 63, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="6"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(52, 0, 0, 0.45), rgba(52, 0, 0, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="7"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(10, 23, 8, 0.45), rgba(10, 23, 8, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="8"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(13, 26, 43, 0.45), rgba(13, 26, 43, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="9"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(31, 20, 40, 0.45), rgba(31, 20, 40, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="10"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(32, 38, 40, 0.45), rgba(32, 38, 40, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="11"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(40, 31, 15, 0.45), rgba(40, 31, 15, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="12"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(35, 35, 30, 0.45), rgba(35, 35, 30, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="13"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(46, 16, 0, 0.45), rgba(46, 16, 0, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="14"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(36, 6, 2, 0.45), rgba(36, 6, 2, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="15"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(89, 98, 61, 0.45), rgba(89, 98, 61, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="16"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgb(88 63 24 / 45%), rgb(88 63 24 / 45%)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="17"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgb(88 63 24 / 45%), rgb(88 63 24 / 45%)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="18"] .hero-talents-grid-bg {
		background:
			linear-gradient(rgb(98 93 96 / 45%), rgb(49 49 49 / 45%)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="19"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(30, 10, 20, 0.45), rgba(30, 10, 20, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}
	.career-talents-container[data-career="20"] .hero-talents-grid-bg {
		background:
			linear-gradient(-16deg, rgba(30, 10, 20, 0.45), rgba(30, 10, 20, 0.45)),
			url("/images/backgrounds/background26.webp") bottom;
	}

	.hero-talents-grid-bg,
	.hero-talents-grid-border {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}
	.hero-talents-grid-bg {
		background-position-y: bottom;
		-webkit-filter: contrast(175%) saturate(200%);
		filter: contrast(175%) saturate(200%);
	}
	.hero-talents-grid-border {
		background: radial-gradient(rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.45));
	}
	.show-talent-descriptions {
		grid-area: heroTalentsHeader;
		position: absolute;
		right: 5px;
		cursor: pointer;
		top: 8px;
		color: #0096fb;
	}

	.hero-talents-container[data-show-descriptions="true"] .hero-talents-grid {
		grid-template-rows: auto auto auto auto auto auto auto !important;
		position: relative;
	}

	.hero-talents-container[data-show-descriptions="true"] {
		height: auto !important;
	}
	.hero-talents-container[data-show-descriptions="true"] .talent-lock-icon {
		align-self: start;
		height: 85px;
	}

	.hero-talents-container[data-show-descriptions="true"] .talent-lock-icon::after {
		align-content: start;
	}
</style>
