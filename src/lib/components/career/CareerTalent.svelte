<script lang="ts">
	import type { ICareerTalent } from "$lib/entities/career/CareerTalent";
	import CareerTalentIcon from "./CareerTalentIcon.svelte";

	type Props = {
		talent: ICareerTalent | null | undefined;
		careerId: number;
		state?: "selected" | "unselected" | "default";
		size?: string;
		transparent?: boolean;
		showDescription?: boolean;
		tooltipPosition?: "top" | "bottom";
	};

	let {
		talent,
		careerId,
		state = "default",
		size = "40px",
		transparent = false,
		showDescription = false,
		tooltipPosition = "bottom",
	}: Props = $props();
</script>

{#if talent}
	<div
		class="talent-container {state}"
		data-career={careerId}
		data-show-description={showDescription}
		data-tooltip-position={tooltipPosition}
	>
		<div class="talent-button-wrapper {transparent ? 'bg-transparent' : 'background-26'}" style="--iconSize: {size}">
			{#if talent}
				<div class="talent-icon-wrapper">
					<CareerTalentIcon {size} {careerId} talentNumber={talent.talentNumber} class="z-[0]"></CareerTalentIcon>
				</div>
				<p class="talent-name">{talent.name}</p>
				<p class="talent-description max-mobile:!w-full">{talent.description}</p>
			{:else}
				<span class="talent-icon"></span>
				<p class="talent-name">No Talent Selected</p>
				<p class="talent-description"></p>
			{/if}
		</div>
	</div>
{:else}
	<div class="talent-container">
		<p class="talent-name">No Talent Selected</p>
	</div>
{/if}

<style>
	.talent-container:hover .talent-name {
		background: linear-gradient(-16deg, rgb(79 79 79 / 29%) 30%, transparent);
	}
	.talent-icon-wrapper {
		box-shadow:
			inset 0 10px 10px -10px #fff,
			0 -1px 0 0 #564640,
			2px 4px 5px 1px #000;
	}
	@media (min-width: 460px) {
		.talent-container[data-show-description="false"] .talent-description {
			left: -10px;
		}
	}

	.talent-container.unselected > * > :global(*) {
		filter: grayscale(1);
	}
	.talent-container[data-show-description="false"] .talent-description {
		left: 0px;
		height: auto;
	}
	.talent-container[data-show-description="true"] {
		height: 100%;
	}
	.talent-container[data-show-description="true"] .talent-description {
		text-align: left;
		grid-area: talentDescription;
		visibility: visible;
		position: relative;
		bottom: auto;
		box-shadow: inset 0 0 5px 1px #000;
		padding: 10px 20px;
		color: #fff;
	}
	.talent-container[data-show-description="true"] .talent-button-wrapper {
		grid-template-areas: "talentIcon talentName" "talentDescription talentDescription";
		grid-template-rows: 80px 1fr;
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
		grid-template-columns: var(--iconSize) 1fr;
		height: 100%;
		position: relative;
		box-sizing: border-box;
		z-index: initial;
	}
	.talent-button-wrapper::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-image: url("/images/borders/border-01.png");
		border-image-slice: 15 15;
		border-image-width: 15px;
		border-width: 1px;
		border-style: solid;
		border-image-repeat: repeat;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: inset 0 10px 10px -10px #fff;
	}
	.talent-container.selected .talent-button-wrapper::after {
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
	.talent-container .talent-description {
		font-size: 1.5rem;
		background: #0d0d0d;
		padding: 10px;
	}
	.talent-container[data-show-description="false"][data-tooltip-position="top"] .talent-description {
		transform: translateY(-100%);
		top: 0;
	}
	.talent-container[data-show-description="false"] .talent-description {
		pointer-events: none;
		position: absolute;
		left: 0px;
		top: 100%;
		border-image: url("/images/borders/border-02.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		color: #c0c0c0;
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
	.talent-container .talent-name {
		position: relative;
		z-index: 2;
	}
	.talent-container .talent-name::after {
		color: #c15b24;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		padding-left: 8px;
		padding-right: 10px;
	}
	.talent-container .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		filter: contrast(175%) saturate(200%);
		z-index: -1;
	}

	.talent-container[data-career="1"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(87, 57, 57, 0.45), rgba(87, 57, 57, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="2"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(89, 98, 61, 0.45), rgba(89, 98, 61, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="3"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(9, 20, 41, 0.45), rgba(9, 20, 41, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="4"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(29, 37, 5, 0.45), rgba(29, 37, 5, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="5"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(10, 54, 63, 0.45), rgba(10, 54, 63, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="6"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(52, 0, 0, 0.45), rgba(52, 0, 0, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="7"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(10, 23, 8, 0.45), rgba(10, 23, 8, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="8"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(13, 26, 43, 0.45), rgba(13, 26, 43, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="9"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(31, 20, 40, 0.45), rgba(31, 20, 40, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="10"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(32, 38, 40, 0.45), rgba(32, 38, 40, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="11"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(40, 31, 15, 0.45), rgba(40, 31, 15, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="12"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(35, 35, 30, 0.45), rgba(35, 35, 30, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="13"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(46, 16, 0, 0.45), rgba(46, 16, 0, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="14"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(36, 6, 2, 0.45), rgba(36, 6, 2, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="15"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(89, 98, 61, 0.45), rgba(89, 98, 61, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="16"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgb(88 63 24 / 45%), rgb(88 63 24 / 45%)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="17"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgb(88 63 24 / 45%), rgb(88 63 24 / 45%)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="18"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(rgb(98 93 96 / 45%), rgb(49 49 49 / 45%)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="19"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(30, 10, 20, 0.45), rgba(30, 10, 20, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
	.talent-container[data-career="20"] .talent-button-wrapper:not(.bg-transparent) .talent-name::before {
		background:
			linear-gradient(-16deg, rgba(30, 10, 20, 0.45), rgba(30, 10, 20, 0.45)),
			url("/images/backgrounds/background26.webp") left / auto;
	}
</style>
