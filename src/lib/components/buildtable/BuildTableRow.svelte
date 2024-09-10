<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { error } from "@sveltejs/kit";
	import BuildCreationInfo from "../build/BuildCreationInfo.svelte";
	import BuildRating from "../build/BuildRating.svelte";
	import WeaponIcon from "../inventory/WeaponIcon.svelte";
	import TraitIcon from "../inventory/TraitIcon.svelte";
	import BuildHelper from "$lib/helpers/BuildHelper";
	import type { IPatch } from "$lib/entities/Patch";

	type Props = {
		build: ICareerBuild;
		patches: IPatch[];
	};

	const { build, patches }: Props = $props();

	if (!build.careerId) {
		error(404, "Career Data for the build failed to load.");
	}

	let patch = $state(BuildHelper.getPatch(build, patches));
</script>

<div class="build-list-item-container">
	<a class="link-overlay" href={`/build/${build.id}`} data-sveltekit-preload-data="tap">&nbsp;</a>
	<div class="build-list-item" data-career={build.careerId} data-build={build.id}>
		<div class="career-portrait border-04" style="background-image: url('/images/careers/{build.careerId}/portrait.png')"></div>
		<div class="build-description-container">
			<p class="build-name header-underline">{build.name}</p>
			<p class="build-hero">{build.career.name}</p>
			<BuildCreationInfo {build}></BuildCreationInfo>
		</div>
		<div class="pointer-events-none z-[1] mr-2 mt-2">
			<BuildRating {build}></BuildRating>
		</div>
		<div class="weapons">
			<div class="weapon-container">
				<WeaponIcon weapon={build.primaryWeapon.weapon} size="45px"></WeaponIcon>
				<TraitIcon trait={build.primaryWeapon.trait!} size="45px"></TraitIcon>
				</div>
			<div class="weapon-container">
				<WeaponIcon weapon={build.secondaryWeapon.weapon} size="45px"></WeaponIcon>            
				<TraitIcon trait={build.secondaryWeapon.trait!} size="45px"></TraitIcon>
			</div>
		</div>
		<div class="traits">
			<div>
			<TraitIcon trait={build.necklace.trait!} size="45px"></TraitIcon>
		</div>
		<div>
			<TraitIcon trait={build.charm.trait!} size="45px"></TraitIcon>
		</div>
		<div>
			<TraitIcon trait={build.trinket.trait!} size="45px"></TraitIcon>
		</div>
		</div>
		<div class="build-footer pt-[5px]">
			<p class="roles">{build.roles?.map((role) => { return role.name; }).join(' / ')}</p>
			<p class="patch-number">{`Update ${patch?.number}`}</p>
		</div>
	</div>
</div>

<style>
	.weapon-container {
		display: grid;
		grid-template-areas: "itemIcon traitIcon";
		grid-column-gap: 5px;
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
	}

	.build-list-item {
		display: grid;
		grid-template-columns: auto auto auto 1fr auto;
		position: relative;
		grid-template-rows: auto 45px 40px;
		grid-row-gap: 5px;
		grid-template-areas:
			"heroIcon buildDescription buildDescription buildDescription buildRating"
			"heroIcon buildWeapons buildTraits empty2 empty2"
			"heroIcon buildFooter buildFooter buildFooter buildFooter";
		text-transform: uppercase;
		cursor: pointer;
		grid-column-gap: 10px;
		pointer-events: none;
	}
	.build-list-item :global(.build-author),
	.build-list-item :global(.traits > *),
	.build-list-item :global(.weapons > *) {
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
	.build-list-item-container :global(.trait-icon),
	.build-list-item-container :global(.weapon-icon) {		
		background-size: calc(100% - 12px) !important;
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
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 5px;
	}
	.traits {
		grid-area: buildTraits;
		display: grid;
		grid-template-columns: repeat(3, 45px);
		grid-column-gap: 5px;
	}
	.build-footer {
		grid-area: buildFooter;
		background: linear-gradient(to right, #0000, #ffffff14);
		padding-right: 10px;
		justify-self: right;
		display: grid;
		grid-template-columns: auto auto;
		grid-column-gap: 10px;
		align-content: center;
		font-size: 0.8em;
		width: calc(100% - 10px);
		justify-content: right;
		padding-bottom: 5px;
		margin: 0 4px 2px 0;
	}
	.build-hero {
		font-size: 0.8em;
		align-self: center;
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
	.build-list-item .talents {
		display: none;
	}
	.build-author {
		color: #0096fb;
	}
	.date-updated {
		text-transform: lowercase;
	}

	/* 
.build-list-item[data-career='1'] {
    background-image: linear-gradient(to bottom, #200000d6, #1e0000), url('/images/backgrounds/background39.png');
} */

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
	.build-list-item .rating-icon {
		height: 50px;
		width: 50px;
	}
	.rating {
		grid-area: buildRating;
		display: grid;
		grid-auto-flow: column;
		align-content: start;
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
</style>
