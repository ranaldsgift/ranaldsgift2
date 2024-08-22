<script lang="ts">
	import { LegacyDataHelper } from "$lib/helpers/LegacyDataHelper.ts";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { getUserState } from "$lib/state/UserState.svelte";
	import { toast } from "svelte-sonner";

	type Props = {
		build: ICareerBuild;
		patchNumber?: string;
	};

	const { build, patchNumber }: Props = $props();

	const userState = getUserState();

	const lastUpdatedText = $derived.by(() => {
		return `${LegacyDataHelper.getDaysSinceDate(build.dateModified)} days ago`;
	});

	let ratingCount = $state(build.userRatings?.length ?? 0);

	let ratedByUser = $state(userState.user?.ratedBuilds?.map((ratedBuild) => ratedBuild.id).includes(build.id) ?? false);
	let favoritedByUser = $state(userState.user?.favoriteBuilds?.map((ratedBuild) => ratedBuild.id).includes(build.id) ?? false);

	const handleRating = async () => {
		if (userState.user) {
			const response = await fetch(`/api/build/${build.id}/rate`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
			});

			const json = await response.json();

			if (response.ok) {
				ratedByUser = json.rated;
				if (json.rated) {
					ratingCount++;
				} else {
					ratingCount--;
				}
				toast(json.message, {
					position: "bottom-center",
				});
			} else {
				toast(json.error, {
					position: "bottom-center",
				});
			}
		}
	};

	const handleFavorite = async () => {
		if (userState.user) {
			const response = await fetch(`/api/build/${build.id}/favorite`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
			});

			const json = await response.json();

			if (response.ok) {
				favoritedByUser = json.favorited;
				toast(json.message, {
					position: "bottom-center",
				});
			} else {
				toast(json.error, {
					position: "bottom-center",
				});
			}
		}
	};
</script>

<div class="build-header-details-container">
	<div class="header-layout">
		<span class="build-header heading">{build.name}</span>
		<button
			data-favorite={`${favoritedByUser ? "true" : "false"}`}
			type="submit"
			class="favorite-icon"
			title="Favorite"
			onclick={handleFavorite}
		></button>
		<div class="rating flex">
			<span class="rating-count" title="Number of ratings">{ratingCount}</span>
			<button data-rated={ratedByUser ? "true" : "false"} class="rating-icon my-[-4px]" title="Rating" onclick={handleRating}
			></button>
		</div>
	</div>
	<div class="build-information-container">
		<div class="build-creation-info">
			<span class="build-author-by">by</span>
			<a href={`/user/${build.user?.id}`} class="build-author">{build.user?.name}</a>
			<span class="date-updated">{`updated ${lastUpdatedText}`}</span>
		</div>
		<span class="text-divider-02"></span>
		<div><span>Patch&nbsp;&nbsp;</span><span class="patch-number">{patchNumber}</span></div>
	</div>
</div>

<style>
	.header-layout {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 5px 20px;
	}
	.build-header {
		color: #c15b24;
		font-size: 2rem;
		text-transform: uppercase;
		text-shadow: 1px 1px #000;
	}
	.build-information-container {
		grid-area: buildInformation;
		display: flex;
		flex-wrap: wrap;
		grid-column-gap: 10px;
		background-color: #440c0c3b;
		position: relative;
		padding: 3px 10px;
		border-top: 1px solid #f0d9af5e;
		border-bottom: 1px solid #f0d9af5e;
		align-items: center;
		width: calc(100% - 3px);
		z-index: 0;
		background: linear-gradient(45deg, #000000, #000000e0), url("/images/backgrounds/background19.png");
	}
	.build-author {
		color: #0096fb;
		justify-self: left;
		font-size: 1.4em;
		text-decoration: none;
	}
	.patch-number {
		justify-self: left;
		font-size: 1.4em;
		color: #f0d9af;
		text-decoration: none;
	}
	.rating {
		margin-left: auto;
	}
	.rating-count {
		align-self: center;
		font-size: 2rem;
	}
	.favorite-icon[data-favorite="false"] {
		filter: grayscale(1);
	}
	.favorite-icon {
		background: url("/images/icons/favorite.png") no-repeat center;
		width: 22px;
		height: 51px;
	}
</style>
