<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import CareerTalentIcon from "../career/CareerTalentIcon.svelte";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();

	const getSelectedTalents = (build: ICareerBuild) => {
		return [
			build.level5Talent,
			build.level10Talent,
			build.level15Talent,
			build.level20Talent,
			build.level25Talent,
			build.level30Talent,
		];
	};

	const getTalentString = (build: ICareerBuild) => {
		const talents = getSelectedTalents(build);
		const talentsString = talents.map((talent) => {
			let talentString = "0";
			if (talent?.talentNumber) {
				let talentModulo = talent.talentNumber % 3;
				talentString = talentModulo === 0 ? "3" : talentModulo.toString();
			}
			return talentString;
		});
		return talentsString.join(" - ");
	};
</script>

<div class="build-talent-summary max-mobile:w-full background-25 border-05 glass p-3 z-10">
	<div
		class="talent-string-container flex items-center justify-center gap-4 col-span-2 tablet:col-span-4 w-full px-2 text-center text-[#f0d9af] text-[1.3rem]"
	>
		<span class="skull-2"></span>
		{getTalentString(build)}
		<span class="skull-2"></span>
	</div>
	<div class="divider-21 w-full h-[20px] mb-2 col-span-2 tablet:col-span-4"></div>
	<div class="talents-container">
		{#each getSelectedTalents(build) as talent, index}
			<div class="talent-container-wrapper">
				<span
					class="talent-lock-icon justify-self-center"
					style="--size: 40px;
				--fontSize: 10px;
				--talent-tier-level: '{(index + 1) * 5}';"
				></span>
				{#if talent}
					<div class="talent-container selected" data-career={build.career.id}>
						<div class="talent-button-wrapper background-26">
							<CareerTalentIcon size="40px" careerId={build.career.id} talentNumber={talent.talentNumber} class="z-[0]"
							></CareerTalentIcon>
							<p class="talent-name background-13">{talent.name}</p>
							<p class="talent-description">{talent.description}</p>
						</div>
					</div>
				{:else}
					<div class="talent-container">
						<p class="talent-name">No Talent Selected</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.talents-container {
		grid-area: buildTalentSummary;
		grid-template-columns: auto;
		row-gap: 5px;
		column-gap: 10px;
		display: grid;
	}
	.talent-container-wrapper {
		display: grid;
		grid-template-columns: 40px auto;
		gap: 5px;
	}
	@media (min-width: 768px) {
		.talents-container {
			grid-template-columns: auto auto;
			grid-template-rows: repeat(3, 1fr);
			grid-auto-flow: column;
		}
	}
	.talent-container:not(.selected) {
		filter: grayscale(1);
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
		grid-template-columns: 40px 1fr;
		height: 100%;
		position: relative;
		box-sizing: border-box;
		z-index: initial;
		box-shadow: inset 0 10px 10px -10px #fff;
	}
	.talent-button-wrapper::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-image: url("/images/borders/border-16.png");
		border-image-slice: 36 157;
		border-image-width: auto;
		border-style: solid;
		border-image-repeat: repeat;
		box-sizing: border-box;
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
	}
	.talent-container.selected .talent-button-wrapper,
	.talent-container:hover .talent-button-wrapper {
		border-radius: 3px;
	}
	.talent-description {
		pointer-events: none;
		position: absolute;
		left: 0;
		top: 100%;
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
		box-sizing: border-box;
		z-index: 10;
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
	.talent-container[data-career="1"] .talent-name {
		background: linear-gradient(-16deg, rgba(87, 57, 57, 0.43) 30%, transparent);
	}
	.talent-container[data-career="2"] .talent-name {
		background: linear-gradient(-16deg, rgba(89, 98, 61, 0.45) 30%, transparent);
	}
	.talent-container[data-career="3"] .talent-name {
		background: linear-gradient(-16deg, rgba(9, 20, 41, 0.65) 30%, transparent);
	}
	.talent-container[data-career="4"] .talent-name {
		background: linear-gradient(-16deg, rgba(29, 37, 5, 0.65) 30%, transparent);
	}
	.talent-container[data-career="5"] .talent-name {
		background: linear-gradient(-16deg, rgba(10, 54, 63, 0.65) 30%, transparent);
	}
	.talent-container[data-career="6"] .talent-name {
		background: linear-gradient(-16deg, rgba(52, 0, 0, 0.65) 30%, transparent);
	}
	.talent-container[data-career="7"] .talent-name {
		background: linear-gradient(-16deg, rgba(10, 23, 8, 0.65) 30%, transparent);
	}
	.talent-container[data-career="8"] .talent-name {
		background: linear-gradient(-16deg, rgba(13, 26, 43, 0.65) 30%, transparent);
	}
	.talent-container[data-career="9"] .talent-name {
		background: linear-gradient(-16deg, rgba(31, 20, 40, 0.65) 30%, transparent);
	}
	.talent-container[data-career="10"] .talent-name {
		background: linear-gradient(-16deg, rgba(32, 38, 40, 0.65) 30%, transparent);
	}
	.talent-container[data-career="11"] .talent-name {
		background: linear-gradient(-16deg, rgba(40, 31, 15, 0.65) 30%, transparent);
	}
	.talent-container[data-career="12"] .talent-name {
		background: linear-gradient(-16deg, rgba(35, 35, 30, 0.65) 30%, transparent);
	}
	.talent-container[data-career="13"] .talent-name {
		background: linear-gradient(-16deg, rgba(46, 16, 0, 0.65) 30%, transparent);
	}
	.talent-container[data-career="14"] .talent-name {
		background: linear-gradient(-16deg, rgba(36, 6, 2, 0.65) 30%, transparent);
	}
	.talent-container[data-career="15"] .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.talent-container[data-career="16"] .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.talent-container[data-career="17"] .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.talent-container[data-career="18"] .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.talent-container[data-career="19"] .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.talent-container[data-career="20"] .talent-name {
		background: linear-gradient(-16deg, rgba(30, 10, 20, 0.65) 30%, transparent);
	}
	.skull-2 {
		background: url("/images/icons/skull-3.png") no-repeat center center;
		background-size: contain;
		display: inline-block;
		width: 25px;
		height: 25px;
	}
</style>
