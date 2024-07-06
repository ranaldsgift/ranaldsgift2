<script lang="ts">
	import type { ICareerTalent } from "$lib/entities/Career";

	type Props = {
		talents: ICareerTalent[];
		careerId: number;
		talent1?: number;
		talent2?: number;
		talent3?: number;
		talent4?: number;
		talent5?: number;
		talent6?: number;
	};

	let {
		talents,
		careerId,
		talent1 = $bindable(),
		talent2 = $bindable(),
		talent3 = $bindable(),
		talent4 = $bindable(),
		talent5 = $bindable(),
		talent6 = $bindable(),
	}: Props = $props();

	let showDescriptions = $state(false);

	let talentButtonHandler = (talentNumber: number, tier: number) => {
		switch (tier) {
			case 1:
				talent1 = talentNumber;
				break;
			case 2:
				talent2 = talentNumber;
				break;
			case 3:
				talent3 = talentNumber;
				break;
			case 4:
				talent4 = talentNumber;
				break;
			case 5:
				talent5 = talentNumber;
				break;
			case 6:
				talent6 = talentNumber;
				break;
		}
	};
</script>

<div>
	<div class="career-talents-container relative" data-career={careerId}>
		<div class="hero-talents-grid-bg background-26"></div>
		<div class="hero-talents-grid-border border-01"></div>
		<div class="career-talents-header">
			<p class="career-talents-header-text">Talents</p>
		</div>
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
								class="talent-lock-icon"
								style="background: url('/images/icons/talent-lock-icon.png') no-repeat center;
                                --talent-tier-level: '{Math.round(talent.talentNumber / 3 + 1) * 5}';"
							></span>
						{/if}
						<div
							class="talent-container {[talent1, talent2, talent3, talent4, talent5, talent6].includes(talent.talentNumber)
								? 'selected'
								: ''}"
						>
							<button
								class="talent-button-wrapper"
								onclick={() => talentButtonHandler(talent.talentNumber, Math.ceil(talent.talentNumber / 3))}
							>
								<span
									class="talent-icon size-[84px] block"
									style="background-image: url('/images/careers/{careerId}/talents/talent-{talent.talentNumber < 10
										? '0'
										: ''}{talent.talentNumber}.png')"
								></span>
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
	.talent-container:nth-of-type(3n + 1) {
		box-shadow: inset 0 10px 10px -10px #fff;
	}

	.talent-container {
		background-repeat: no-repeat;
		position: relative;
		background-color: rgba(0, 0, 0, 0.5215686274509804);
		box-shadow: inset 0 10px 10px -10px #fff;
		background-position: 0;
		background: none;
		padding: 0;
	}
	.talent-icon {
		background-position: center center !important;
		position: relative;
		z-index: -1;
	}
	.talent-icon::after {
		align-content: center;
		display: grid;
		height: 100%;
		color: #fff;
		text-shadow:
			-1px -1px 0 #000,
			1px -1px 0 #000,
			-1px 1px 0 #000,
			1px 1px 0 #000;
		font-size: 150%;
	}
	.talent-lock-icon {
		width: 76px;
		height: 76px;
		display: block;
		position: relative;
	}
	.talent-lock-icon::after {
		content: var(--talent-tier-level);
	}

	.talent-lock-icon::after {
		position: absolute;
		height: 100%;
		width: 100%;
		display: grid;
		align-content: center;
		z-index: 99999999999;
		font-size: 150%;
		color: #c15b24;
		margin-top: 6px;
		text-align: center;
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
	}

	.hero-talents-container {
		grid-area: heroTalents;
		position: relative;
		height: auto;
	}

	.hero-talents-grid {
		display: grid;
		grid-auto-rows: auto;
		grid-template-columns: 85px 1fr 1fr 1fr;
		grid-template-areas:
			"heroTalentsHeader heroTalentsHeader heroTalentsHeader heroTalentsHeader"
			"heroTalentLevel5 heroTalent1 heroTalent2 heroTalent3"
			"heroTalentLevel10 heroTalent4 heroTalent5 heroTalent6"
			"heroTalentLevel15 heroTalent7 heroTalent8 heroTalent9"
			"heroTalentLevel20 heroTalent10 heroTalent11 heroTalent12"
			"heroTalentLevel25 heroTalent13 heroTalent14 heroTalent15"
			"heroTalentLevel30 heroTalent16 heroTalent17 heroTalent18";
		grid-row-gap: 5px;
		position: relative;
		width: calc(100% - 20px);
		height: calc(100% - 20px);
		padding: 10px;
		color: #c15b24;
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
	.talent-container:nth-of-type(3n + 1) {
		box-shadow: inset 0px 10px 10px -10px white;
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
	.hero-talents-container.show-descriptions {
		height: auto;
	}
	.hero-talents-container.show-descriptions .hero-talents-grid {
		position: relative;
		grid-template-rows: 40px repeat(6, min-content);
	}
	.hero-talents-container.show-descriptions .talent-description {
		grid-area: talentDescription;
		visibility: visible;
		position: relative;
		bottom: auto;
	}
	.hero-talents-container.show-descriptions .talent-button-wrapper {
		grid-template-areas: "talentIcon talentName" "talentDescription talentDescription";
		grid-template-rows: 80px 1fr;
	}
	.talent-container:hover .talent-description {
		visibility: visible;
	}
	.talent-container:hover .talent-description:hover {
		visibility: hidden;
	}
	.hero-talents-grid .talent-icon {
		grid-area: talentIcon;
		width: 82px;
		height: 82px;
	}
	.talent-icon {
		background-repeat: no-repeat;
	}
	.talent-container .talent-icon {
		background-position-x: calc(50% + 2px) !important;
		box-shadow:
			inset 0px 10px 10px -10px white,
			2px 0px 5px 1px black;
		z-index: -1;
	}
	.talent-button-wrapper {
		box-shadow: 0px -1px 0 0 #564640;
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

	.hero-talents-container.tier-1-selected .hero-talent.tier-1:not(.selected),
	.hero-talents-container.tier-2-selected .hero-talent.tier-2:not(.selected),
	.hero-talents-container.tier-3-selected .hero-talent.tier-3:not(.selected),
	.hero-talents-container.tier-4-selected .hero-talent.tier-4:not(.selected),
	.hero-talents-container.tier-5-selected .hero-talent.tier-5:not(.selected),
	.hero-talents-container.tier-6-selected .hero-talent.tier-6:not(.selected) {
		filter: grayscale(1);
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
