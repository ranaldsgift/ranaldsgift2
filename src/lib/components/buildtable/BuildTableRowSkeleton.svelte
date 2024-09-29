<script>
	import Skeleton from "../ui/skeleton/skeleton.svelte";
</script>

<div class="build-list-item-container">
	<div class="build-list-item-skeleton h-[177px] w-full border-31">
		<div class="career-portrait h-[120px] w-[100px] border-04">
			<Skeleton class="h-full w-full"></Skeleton>
		</div>
		<div class="build-description-container">
			<div class="build-name header-underline w-full h-[27px] pb-[5px]">
				<Skeleton class="h-full max-w-[250px]"></Skeleton>
			</div>
			<div class="build-hero max-w-[100px] h-[15px] w-full">
				<Skeleton class="h-full w-full"></Skeleton>
			</div>
			<div class="build-creation-info max-w-[150px] h-[15px] w-full">
				<Skeleton class="h-full w-full"></Skeleton>
			</div>
		</div>
		<div class="pointer-events-none z-[1] mr-2 mt-2">
			<div class="build-rating rating-icon"></div>
		</div>
		<div class="weapons flex gap-2">
			<div class="weapon-container">
				<div class="weapon-icon w-[45px] h-[45px] border-04">
					<Skeleton class="h-full w-full"></Skeleton>
				</div>
				<div class="trait-icon w-[45px] h-[45px] border-04">
					<Skeleton class="h-full w-full"></Skeleton>
				</div>
			</div>
			<div class="weapon-container">
				<div class="weapon-icon w-[45px] h-[45px] border-04">
					<Skeleton class="h-full w-full"></Skeleton>
				</div>
				<div class="trait-icon w-[45px] h-[45px] border-04">
					<Skeleton class="h-full w-full"></Skeleton>
				</div>
			</div>
		</div>
		<div class="traits">
			<div>
				<div class="trait-icon w-[45px] h-[45px] border-04">
					<Skeleton class="h-full w-full"></Skeleton>
				</div>
			</div>
			<div>
				<div class="trait-icon w-[45px] h-[45px] border-04">
					<Skeleton class="h-full w-full"></Skeleton>
				</div>
			</div>
			<div>
				<div class="trait-icon w-[45px] h-[45px] border-04">
					<Skeleton class="h-full w-full"></Skeleton>
				</div>
			</div>
		</div>
		<div class="build-footer pt-[5px]">
			<div class="roles w-[150px] h-[15px]">
				<Skeleton class="h-full w-full"></Skeleton>
			</div>
			<div class="patch-number">
				<Skeleton class="w-[75px] h-[15px]"></Skeleton>
			</div>
		</div>
	</div>
</div>

<style>
	.build-list-item-skeleton {
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
		background-image: linear-gradient(rgba(87, 57, 57, 0.3), rgba(87, 57, 57, 0.3)),
			radial-gradient(closest-corner, #0000007a, #000000ba), linear-gradient(to bottom, #1d1d1d78, #00000017),
			url("/images/backgrounds/background39.png");
	}
	.career-portrait {
		grid-area: heroIcon;
		align-self: center;
		margin-left: 15px;
	}

	.build-description-container {
		grid-area: buildDescription;
		justify-items: start;
		text-align: left;
		display: grid;
		margin-top: 10px;
	}

	.weapons {
		grid-area: buildWeapons;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 5px;
	}

	.weapon-container {
		display: grid;
		grid-template-areas: "itemIcon traitIcon";
		grid-column-gap: 5px;
	}

	.traits {
		grid-area: buildTraits;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: 5px;
	}

	.build-footer {
		grid-area: buildFooter;
	}

	.build-rating {
		grid-area: buildRating;
		background: url("/images/icons/rating-icon.png");
		background-size: contain;
		background-repeat: no-repeat;
		width: 62px;
		height: 64px;
		display: block;
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
	@media (max-width: 768px) {
		.build-list-item-skeleton {
			grid-template-areas:
				"heroIcon heroIcon"
				"buildDescription buildRating"
				"buildWeapons buildWeapons"
				"buildTraits buildTraits"
				"buildFooter buildFooter" !important;
			grid-template-columns: 1fr auto !important;
			grid-template-rows: auto auto auto auto 40px !important;
			padding: 15px 0 0 15px;
		}
		.build-list-item-skeleton .build-creation-info {
			grid-template-columns: min-content auto;
			grid-template-rows: auto auto;
			grid-auto-flow: row !important;
		}
		.build-rating {
			padding-right: 0px;
		}
		.career-portrait {
			height: 65px !important;
			width: calc(100% - 15px) !important;
			margin: 0;
			box-sizing: border-box;
			margin-left: 0 !important;
			margin-right: 15px !important;
		}
		.build-description-container,
		.build-list-item-skeleton .build-rating {
			margin-top: 0px !important;
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
