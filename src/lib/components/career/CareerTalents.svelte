<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { ICareerTalent } from "$lib/entities/career/CareerTalent";
	import BuildHelper from "$lib/helpers/BuildHelper";
	import CareerTalentIcon from "./CareerTalentIcon.svelte";

	type Props = {
		build: ICareerBuild;
		readOnly?: boolean;
	};

	let { build = $bindable(), readOnly = false }: Props = $props();

	let careerId = $derived(build.career.id);
	let showDescriptions = $state(false);

	let talentButtonHandler = (talent: ICareerTalent) => {
		let tier = Math.ceil(talent.talentNumber / 3);

		if (BuildHelper.isTalentSelected(talent, build)) {
			switch (tier) {
				case 1:
					build.talent1 = undefined;
					break;
				case 2:
					build.talent2 = undefined;
					break;
				case 3:
					build.talent3 = undefined;
					break;
				case 4:
					build.talent4 = undefined;
					break;
				case 5:
					build.talent5 = undefined;
					break;
				case 6:
					build.talent6 = undefined;
					break;
			}
			return;
		}

		switch (tier) {
			case 1:
				build.talent1 = talent;
				break;
			case 2:
				build.talent2 = talent;
				break;
			case 3:
				build.talent3 = talent;
				break;
			case 4:
				build.talent4 = talent;
				break;
			case 5:
				build.talent5 = talent;
				break;
			case 6:
				build.talent6 = talent;
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
					{#each build.career.talents as talent}
						{#if (talent.talentNumber - 1) % 3 === 0}
							<span
								class="talent-lock-icon justify-self-center"
								style="--size: 84px;
                                --talent-tier-level: '{Math.ceil(talent.talentNumber / 3) * 5}';"
							></span>
						{/if}
						<div class="talent-container {BuildHelper.isTalentSelected(talent, build) ? 'selected' : ''}">
							<button
								class="talent-button-wrapper"
								onclick={() => {
									!readOnly ? talentButtonHandler(talent) : null;
								}}
							>
								<CareerTalentIcon size="84px" {careerId} talentNumber={talent.talentNumber} class="z-[-1]"
								></CareerTalentIcon>
								<p class="talent-name">{talent.name}</p>
								<p class="talent-description">{talent.description}</p>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.talent-container:not(.selected) {
		filter: grayscale(1);
	}
	.talent-container.unselected {
		filter: grayscale(0);
	}
	.talent-container {
		background-repeat: no-repeat;
		position: relative;
		background-color: rgba(0, 0, 0, 0.5215686274509804);
		background-position: 0;
		background: none;
		padding: 0;
		box-shadow: 0px -1px 0 0 #564640;
	}
	.talent-button-wrapper {
		width: 100%;
		display: grid;
		grid-template-areas: "talentIcon talentName";
		background: none;
		grid-template-columns: 82px 1fr;
		height: 100%;
		position: relative;
		border-image: url("/images/borders/border-02.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		border-image-repeat: repeat;
		box-sizing: border-box;
		z-index: initial;
		box-shadow: inset 0 10px 10px -10px #fff;
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

	.hero-talents-grid > * {
		z-index: 1;
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
	.talent-container.selected .talent-button-wrapper {
		border-image: url("/images/borders/border-16.png");
		border-image-slice: 36 157;
		border-image-width: auto;
		border-style: solid;
		border-image-repeat: repeat;
	}
	.talent-container .talent-name {
		font-size: 1.5rem;
		align-content: center;
		height: 100%;
		display: grid;
		text-align: left;
		font-family: caslon-antique-bold;
		color: #c15b24;
		padding-left: 8px;
		padding-right: 10px;
		z-index: -1;
	}
	.talent-container.selected .talent-button-wrapper,
	.talent-container:hover .talent-button-wrapper {
		border-radius: 3px;
	}
	.talent-description {
		pointer-events: none;
		position: absolute;
		height: 100%;
		left: 0;
		bottom: calc(100% + 6px);
		width: calc(100% + 20px);
		font-size: 1.5rem;
		background: #0d0d0d;
		border-image: url("/images/borders/border-02.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		color: #c0c0c0;
		font-family: caslon-antique-bold;
		padding: 10px;
		text-align: left;
		box-shadow: 0px 0px 5px 1px black;
		visibility: hidden;
		z-index: -1;
		filter: grayscale(0);
		box-sizing: border-box;
	}
	.hero-talents-container[data-show-descriptions="false"] .talent-description {
		transform: translateX(-10px);
		height: auto;
	}
	.hero-talents-container[data-show-descriptions="true"] {
		height: auto;
	}
	.hero-talents-container[data-show-descriptions="true"] .hero-talents-grid {
		position: relative;
		grid-template-rows: 40px repeat(6, min-content);
	}
	.hero-talents-container[data-show-descriptions="true"] .talent-description {
		grid-area: talentDescription;
		visibility: visible;
		position: relative;
		bottom: auto;
	}
	.hero-talents-container[data-show-descriptions="true"] .talent-button-wrapper {
		grid-template-areas: "talentIcon talentName" "talentDescription talentDescription";
		grid-template-rows: 80px 1fr;
	}
	.talent-container:hover .talent-description {
		visibility: visible;
	}
	.talent-container:hover .talent-description:hover {
		visibility: hidden;
	}
	.talent-name {
		grid-area: talentName;
	}
	.talent-container:hover {
		cursor: pointer;
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

	.career-talents-container[data-career="1"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="1"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(87, 57, 57, 0.43) 30%, transparent);
	}
	.career-talents-container[data-career="2"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="2"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(89, 98, 61, 0.45) 30%, transparent);
	}
	.career-talents-container[data-career="3"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="3"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(9, 20, 41, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="4"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="4"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(29, 37, 5, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="5"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="5"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(10, 54, 63, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="6"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="6"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(52, 0, 0, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="7"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="7"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(10, 23, 8, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="8"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="8"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(13, 26, 43, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="9"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="9"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(31, 20, 40, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="10"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="10"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(32, 38, 40, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="11"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="11"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(40, 31, 15, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="12"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="12"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(35, 35, 30, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="13"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="13"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(46, 16, 0, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="14"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="14"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(36, 6, 2, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="15"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="15"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="16"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="16"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="17"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="17"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="18"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="18"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="19"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="19"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.career-talents-container[data-career="20"] .talent-container.selected .talent-name,
	.career-talents-container[data-career="20"] .talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
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
	.hero-talents-container[data-show-descriptions="true"] .talent-container .talent-description {
		visibility: visible;
		position: relative;
		bottom: unset;
	}

	.hero-talents-container[data-show-descriptions="true"] .talent-container .talent-button-wrapper {
		grid-template-areas:
			"talentIcon talentName"
			"talentDescription talentDescription";
		grid-template-rows: 83px 1fr;
	}

	.hero-talents-container[data-show-descriptions="true"] .hero-talents-grid {
		grid-template-rows: auto auto auto auto auto auto auto !important;
		position: relative;
	}

	.hero-talents-container[data-show-descriptions="true"] {
		height: auto !important;
	}
	.hero-talents-container[data-show-descriptions="true"] .talent-description {
		grid-area: talentDescription;
		border: none;
		width: 100%;
		box-shadow: inset 0px 0px 5px 1px black;
	}
	.hero-talents-container[data-show-descriptions="true"] .talent-lock-icon {
		align-self: start;
		height: 85px;
	}

	.hero-talents-container[data-show-descriptions="true"] .talent-lock-icon::after {
		align-content: start;
		margin-top: 34px;
	}
</style>
