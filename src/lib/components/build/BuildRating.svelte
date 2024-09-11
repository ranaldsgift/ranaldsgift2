<script lang="ts">
	import { CareerBuildsStore } from "$lib/stores/DataStores";
	import { invalidateAll } from "$app/navigation";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { getUserState } from "$lib/state/UserState.svelte";
	import { toast } from "svelte-sonner";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();

	const userState = getUserState();

	let ratedByUser = $derived(userState.user?.ratedBuilds?.map((ratedBuild) => ratedBuild.id).includes(build.id) ?? false);
	let ratingCount = $state(build.ratingsCount ?? 0);

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
				if (json.rated) {
					userState.addRating(build);
					ratingCount++;
				} else {
					userState.removeRating(build);
					ratingCount--;
				}
				toast(json.message, {
					position: "bottom-center",
				});
				invalidateAll();
				CareerBuildsStore.invalidateAll();
			} else {
				toast(json.error, {
					position: "bottom-center",
				});
			}
		}
	};
</script>

<div class="rating flex">
	<span class="rating-count" title="Number of ratings">{ratingCount}</span>
	<button data-rated={ratedByUser ? "true" : "false"} class="rating-icon my-[-4px]" title="Rating" onclick={handleRating}></button>
</div>

<style>
	.rating {
		margin-left: auto;
	}
	.rating-count {
		align-self: center;
		font-size: 2rem;
	}
	.rating-icon {
		background: url("/images/icons/rating-icon.png");
		background-size: contain;
		background-repeat: no-repeat;
		width: 62px;
		height: 64px;
		display: block;
	}
	.rating-icon:hover,
	.rating-icon[data-rated="true"] {
		background: url("/images/icons/rated-icon.png");
		cursor: pointer;
	}
</style>
