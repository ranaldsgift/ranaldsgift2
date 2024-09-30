<script lang="ts">
	import { LegacyDataHelper } from "$lib/helpers/LegacyDataHelper.ts";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();

	const lastUpdatedText = $derived.by(() => {
		if (!build.dateModified) {
			return "";
		}
		return `${LegacyDataHelper.getTimeSinceText(build.dateModified)}`;
	});
</script>

<div class="build-creation-info">
	<span class="build-author-by">by</span>
	<a href={`/user/${build.user?.id}`} class="build-author">{build.user?.name}</a>
	<span class="date-updated">{`updated ${lastUpdatedText}`}</span>
</div>

<style>
	.build-creation-info {
		text-transform: none;
	}
	a {
		color: #0096fb;
	}
</style>
