<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { error } from "@sveltejs/kit";
	import BuildCreationInfo from "../build/BuildCreationInfo.svelte";
	import BuildRating from "../build/BuildRating.svelte";
	import WeaponIcon from "../inventory/WeaponIcon.svelte";
	import TraitIcon from "../inventory/TraitIcon.svelte";
	import { getWindowState } from "$lib/state/WindowState.svelte";
	import CareerTalentIcon from "../career/CareerTalentIcon.svelte";
	import BuildHelper from "$lib/helpers/BuildHelper";
	import CareerBuildPortrait from "../career/CareerBuildPortrait.svelte";
	import ItemIcon from "../inventory/ItemIcon.svelte";
	import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";
	
	type Props = {
		build: ICareerBuild;
		compact?: boolean;
	};

	const { build, compact = false }: Props = $props();

	let selectedTalents = $derived.by(() => { return BuildHelper.getTalents(build) });

	const windowState = getWindowState();

	if (!build.careerId) {
		error(404, "Career Data for the build failed to load.");
	}
</script>

{#if build.careerId}
<div class="build-list-item-container">
	<a class="link-overlay" href={`/build/${build.id}`} data-sveltekit-preload-data="tap">&nbsp;</a>
	<div class="build-list-item desktop:h-full" data-career={build.careerId} data-build={build.id} data-compact={compact}>
		
		<CareerBuildPortrait build={build} class="justify-self-end mr-[10px]"></CareerBuildPortrait>
		<div class="build-description-container ml-[15px]">
			<p class="build-name header-underline">{build.name}</p>
			<div class="flex gap-1"><p class="build-hero">{build.career.name}</p>
				<BuildCreationInfo {build}></BuildCreationInfo>
			</div>
		</div>
		<div class="pointer-events-none z-[1] build-rating mt-[10px]">
			<BuildRating {build}></BuildRating>
		</div>
		<div class="weapons grid ml-[15px]">
			{#if build.primaryWeapon.weapon}
			<div class="weapon-container">
				<ItemIcon itemBuild={build.primaryWeapon} itemType={ItemTypeEnum.Weapon} size="45px"></ItemIcon>
				 {#if build.primaryWeapon.trait}
					<TraitIcon trait={build.primaryWeapon.trait} size="45px"></TraitIcon>
				{/if}
			</div>
			{/if}
			{#if build.secondaryWeapon.weapon}
			<div class="weapon-container">
				<ItemIcon itemBuild={build.secondaryWeapon} itemType={ItemTypeEnum.Weapon} size="45px"></ItemIcon>
				 {#if build.secondaryWeapon.trait}
					<TraitIcon trait={build.secondaryWeapon.trait} size="45px"></TraitIcon>
				{/if}
			</div>
			{/if}
		</div>
		<div class="talents grid ml-[15px]">
			{#each selectedTalents as talent, index}
			{#if build.level && build.level >= (index + 1) * 5}
			<div class="talent-icon-container" style="--overlay: {talent?.talentNumber ? talent.talentNumber % 3 === 0  ? `'3'` : `'${talent.talentNumber % 3}'` : `'0'`}">
				<CareerTalentIcon talentNumber={talent?.talentNumber ?? 0} careerId={build.careerId} size="45px"></CareerTalentIcon>
			</div>
			{/if}
			{/each}
		</div>
		<div class="traits grid">
			<div class="flex flex-col gap-1">
				<ItemIcon itemBuild={build.necklace} itemType={ItemTypeEnum.Necklace} size="45px"></ItemIcon>
				<TraitIcon trait={build.necklace.trait!} size="45px"></TraitIcon>
			</div>
			<div class="flex flex-col gap-1">
				<ItemIcon itemBuild={build.charm} itemType={ItemTypeEnum.Charm} size="45px"></ItemIcon>
				<TraitIcon trait={build.charm.trait!} size="45px"></TraitIcon>
			</div>
			<div class="flex flex-col gap-1">
				<ItemIcon itemBuild={build.trinket} itemType={ItemTypeEnum.Trinket} size="45px"></ItemIcon>
				<TraitIcon trait={build.trinket.trait!} size="45px"></TraitIcon>
			</div>
		</div>
		<div class="build-footer pt-[5px] !z-0 pr-[10px] mr-[2px]">
			<p class="roles">{build.roles?.map((role) => { return role.name; }).join(' / ')}</p>
			<p class="patch-number">{`Update ${build.patchNumber}`}</p>
		</div>
	</div>
</div>
{/if}

<style>
	.weapon-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.career-portrait {
		width: 100px;
		height: 120px;
		grid-area: heroIcon;
		justify-self: right;
		align-self: center;
		background-repeat: no-repeat;
		background-size: contain;
		margin-left: 15px;
		margin-right: 5px;
	}

	.build-list-item {
		display: grid;
		grid-template-columns: 110px auto auto 1fr auto;
		position: relative;
		grid-template-rows: auto 45px 100px 40px;
		grid-row-gap: 5px;
		grid-template-areas:
			"buildDescription buildDescription buildDescription buildRating"
			"buildTalents buildTalents buildTalents careerPortrait"
			"buildWeapons buildTraits buildTraits careerPortrait"
			"buildFooter buildFooter buildFooter buildFooter";
		text-transform: uppercase;
		cursor: pointer;
		grid-column-gap: 5px;
		pointer-events: none;
	}
	.build-list-item :global(.build-author) {
		pointer-events: all;
	}
	a.link-overlay {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.build-list-item-container {
		position: relative;
	}
	.build-list-item-container :global(.weapon-icon) {		
		background-size: 100% !important;
	}
	.edit-build-page .build-list-item .weapons,
	.edit-build-page .build-list-item .traits {
		display: none;
	}
	.edit-build-page .build-list-item .build-hero-icon {
		width: 80px;
		height: 94px;
	}
	.edit-build-page .build-list-item {
		grid-template-columns: 100px auto 1fr;
		grid-column-gap: 5px;
	}
	.build-hero-icon {
		width: 100px;
		height: 120px;
		grid-area: heroIcon;
		justify-self: right;
		align-self: center;
		background-repeat: no-repeat;
		background-size: contain;
		margin-left: 15px;
	}
	.build-name {
		font-size: 1.2em;
		align-self: end;
		justify-self: left;
		color: #c15b24;
	}
	.build-description-container {
		grid-area: buildDescription;
		justify-items: start;
		text-align: left;
		display: grid;
		margin-top: 10px;
	}
	.build-list-item .talents {
		grid-area: buildTalents;
		display: grid;
		grid-template-columns: repeat(6, 45px);
		grid-column-gap: 5px;
		height: 45px;
	}
	.weapons {
		grid-area: buildWeapons;
		grid-template-columns: repeat(2, 45px);
		grid-column-gap: 5px;
	}
	.traits {
		grid-area: buildTraits;
		grid-template-columns: repeat(3, 45px);
		grid-column-gap: 5px;
	}
	.build-footer {
		grid-area: buildFooter;
		background: linear-gradient(to right, #0000, #ffffff14);
		display: grid;
		grid-template-columns: auto auto;
		grid-column-gap: 10px;
		align-content: center;
		font-size: 0.8em;
		justify-content: right;
		padding-bottom: 5px;
	}
	.build-footer .patch-number {
		justify-self: right;
		color: #31d014;
	}
	.build-footer > p {
		align-content: center;
		display: inline-block;
	}
	.weapon-icon:hover::before {
		height: auto;
		width: 400px;
		display: grid;
		position: absolute;
		background: radial-gradient(#440c0ca8 10%, #0000 60%) #2d1212;
		bottom: 60px;
		right: -190px;
		border-image: url("/images/borders/border-10.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		padding: 5px;
		white-space: pre;
		text-transform: initial;
		align-content: center;
		z-index: 1;
	}

	.trait-icon:hover::before {
		/*content: 'Hitting more than 3 enemies in one swing generates temporary health.';*/
		height: auto;
		width: 400px;
		display: grid;
		position: absolute;
		background: radial-gradient(#440c0ca8 10%, #0000 60%) #2d1212;
		bottom: 60px;
		right: -190px;
		border-image: url("/images/borders/border-10.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		padding: 5px;
		white-space: pre;
		text-transform: initial;
		align-content: center;
		z-index: 1;
	}
	.traits .trait-icon:nth-child(1):hover::before {
		right: -142px;
	}
	.traits .trait-icon:nth-child(2):hover::before {
		right: -91px;
	}

	.traits .trait-icon:hover::before {
		right: -40px;
	}

	.build-list-item > * {
		z-index: 1;
	}
	.build-list-item .talent-icon {
		box-shadow: inset 0 0 65px #0000009e;
	}
	.trait-icon {
		background-repeat: no-repeat !important;
		background-position: center !important;
		background-size: calc(100% - 12px) !important;
	}
	.build-author a {
		align-self: center;
		color: #0096fb;
		text-transform: capitalize;
		justify-self: left;
		padding-left: 5px;
	}
	.build-footer .roles {
		text-overflow: ellipsis;
		overflow: hidden;
		justify-content: left;
		text-align: left;
		white-space: nowrap;
		color: #c8c8c8;
		display: inline-block;
	}
	.roles {
		color: #c8c8c8;
	}
	.build-list-item {
		color: #c8c8c8;
	}
	.build-author-by,
	.build-author {
		text-transform: initial;
	}
	.build-list-item .talent-icon[data-talent="1"]::after,
	.build-list-item .talent-icon[data-talent="2"]::after,
	.build-list-item .talent-icon[data-talent="3"]::after {
		content: "";
	}
	.build-list-item .talent-icon[data-talent="1"]::after {
		content: "1";
	}
	.build-list-item .talent-icon[data-talent="2"]::after {
		content: "2";
	}
	.build-list-item .talent-icon[data-talent="3"]::after {
		content: "3";
	}
	.build-author {
		color: #0096fb;
	}
	.date-updated {
		text-transform: lowercase;
	}

	.build-list-item[data-career="1"]:before {
		background-image: linear-gradient(rgba(87, 57, 57, 0.3), rgba(87, 57, 57, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="2"]:before {
		background-image: linear-gradient(rgba(89, 98, 61, 0.3), rgba(89, 98, 61, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="3"]:before {
		background-image: linear-gradient(rgba(9, 20, 41, 0.3), rgba(9, 20, 41, 0.3)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="4"]:before {
		background-image: linear-gradient(rgba(29, 37, 5, 0.3), rgba(29, 37, 5, 0.3)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="5"]:before {
		background-image: linear-gradient(rgba(10, 54, 63, 0.3), rgba(10, 54, 63, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="6"]:before {
		background-image: linear-gradient(rgba(52, 0, 0, 0.3), rgba(52, 0, 0, 0.3)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="7"]:before {
		background-image: linear-gradient(rgba(10, 23, 8, 0.3), rgba(10, 23, 8, 0.3)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="8"]:before {
		background-image: linear-gradient(rgba(13, 26, 43, 0.3), rgba(13, 26, 43, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="9"]:before {
		background-image: linear-gradient(rgba(31, 20, 40, 0.3), rgba(31, 20, 40, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="10"]:before {
		background-image: linear-gradient(rgba(32, 38, 40, 0.3), rgba(32, 38, 40, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="11"]:before {
		background-image: linear-gradient(rgba(40, 31, 15, 0.3), rgba(40, 31, 15, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="12"]:before {
		background-image: linear-gradient(rgba(35, 35, 30, 0.3), rgba(35, 35, 30, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="13"]:before {
		background-image: linear-gradient(rgba(46, 16, 0, 0.3), rgba(46, 16, 0, 0.3)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="14"]:before {
		background-image: linear-gradient(rgba(36, 6, 2, 0.3), rgba(36, 6, 2, 0.3)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="15"]:before {
		background-image: linear-gradient(rgba(30, 10, 20, 0.3), rgba(30, 10, 20, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="16"]:before {
		background-image: linear-gradient(rgb(88, 63, 24, 0.3), rgb(88, 63, 24, 0.3)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="17"]:before {
		background-image: linear-gradient(rgb(88, 63, 24, 0.3), rgb(88, 63, 24, 0.3)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="18"]:before {
		background-image: linear-gradient(rgb(98 93 96 / 30%), rgb(49 49 49 / 30%)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="19"]:before {
		background-image: linear-gradient(rgb(98 93 96 / 30%), rgb(49 49 49 / 30%)), radial-gradient(closest-corner, #0000007a, #000000ba),
			linear-gradient(to bottom, #1d1d1d78, #00000017), url("/images/backgrounds/background39.png");
	}
	.build-list-item[data-career="20"]:before {
		background-image: linear-gradient(-16deg, rgba(30, 10, 20, 0.45), rgba(30, 10, 20, 0.45)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.build-list-item:before {
		transition: box-shadow 0.1s ease-in-out;
	}
	.build-list-item-container:hover .build-list-item:before {
		box-shadow: 0 0 10px 2px #ffd700;
		/* background: radial-gradient(closest-corner, #00000090, #000000dc), linear-gradient(to bottom, #1d1d1d78, #00000017), url('/images/backgrounds/background39.png'); */
	}
	.build-list-item:after {
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		border-image: url("/images/borders/border-31.png");
		border-image-slice: 67;
		border-image-width: 67px;
		border-style: solid;
		border-image-repeat: repeat;
		box-sizing: border-box;
		pointer-events: none;
		box-shadow: inset 0 0 6px 3px #000;
	}
	.build-list-item-container:hover .build-list-item::after {
		background: linear-gradient(45deg, #ffffff08, transparent);
		box-shadow: none;
	}
	.build-list-item:before {
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		/* background-image: radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017), url('/images/backgrounds/background39.png'); */
		filter: saturate(285%) contrast(120%);
	}
	.build-rating {
		grid-area: buildRating;
		justify-self: end;
	}
	.build-list-item .rating-icon {
		height: 50px;
		width: 50px;
	}
	.build-list-item .rating {
		margin: 10px 10px 0 0;
	}
	.rating-count {
		font-size: 2em;
		height: 50px;
		align-self: center;
		align-content: center;
		display: grid;
	}
	.build-list-item .weapon-icon,
	.build-list-item .trait-icon {
		width: 45px;
		height: 45px;
		box-sizing: border-box;
	}

	.talent-icon-container {	
		position: relative;
	}
	.talent-icon-container::before {
		margin: 4px;
		overflow: hidden;
		content: var(--overlay);
		position: absolute;
		top: 0;
		left: 0;
		height: calc(100% - 8px);
		width: calc(100% - 8px);
		z-index: 1;
		display: grid;
		align-content: center;
		justify-content: center;
		background: radial-gradient(rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.4) 70%, transparent 100%);
		font-size: 1.2rem;
		color: #fff;
		text-shadow: 0 0 10px #1900ff;
	}
	.talent-icon-container::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border-image: url("/images/borders/border-04.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		border-image-repeat: repeat;
		box-sizing: border-box;
		pointer-events: none;
		box-shadow: inset 0 0 6px 3px #000;
	}

	@media (max-width: 768px) {
    .build-list-item {
        grid-template-areas:
            "careerPortrait careerPortrait careerPortrait"
            "buildDescription buildDescription buildRating"
            "buildTalents buildTalents buildTalents"
            "buildWeapons buildTraits buildTraits"
            "buildFooter buildFooter buildFooter" !important;
        grid-template-columns: auto 1fr auto !important;
        grid-template-rows: auto auto auto auto 40px !important;
		
        padding: 15px 0 0 15px;
    }
    .build-list-item .build-creation-info {
        grid-template-columns: min-content auto;
        grid-template-rows: auto auto;
        grid-auto-flow: row !important;
    }    
    .date-updated {
        grid-column: 1 / 3;
    }
    .rating {
        padding-right: 0px;
    }
    .build-hero-icon {
        height: 65px !important;
        width: calc(100% - 15px) !important;
        margin: 0;
        box-sizing: border-box;
        margin-left: 0 !important;
        margin-right: 15px !important;
    }
    .build-description-container, .build-list-item .rating {
        margin-top: 0px !important;
    }
    .hero-icon-container {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
    }
	.career-portrait {
        height: 65px !important;
        width: calc(100% - 15px) !important;
        margin: 0;
        box-sizing: border-box;
        margin-left: 0 !important;
        margin-right: 15px !important;
    }
}
</style>
