<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { ICareerTalent } from "$lib/entities/career/CareerTalent";
	import TextEditor from "../quill/TextEditor.svelte";
	import BuildGuideContainer from "./BuildGuideContainer.svelte";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();

	const convertGuideMarkdown = (guide: string | undefined) => {
		if (!guide) return "";

		guide = replaceTalents(guide);
		guide = replaceGear(guide);

		return guide;
	};

	const replaceGear = (guide: string) => {
		const primaryWeaponHtml = `<div class="weapon-icon border-05 size-[60px]" style="background: url('/images/weapons/${build.primaryWeapon.weapon.codename}.png') no-repeat center / calc(100% + 8px), url('/images/backgrounds/icon-background-2.png') no-repeat center / 100% 100%;"></div>`;
		const secondaryWeaponHtml = `<div class="weapon-icon border-05 size-[60px]" style="background: url('/images/weapons/${build.secondaryWeapon.weapon.codename}.png') no-repeat center / calc(100% + 8px), url('/images/backgrounds/icon-background-2.png') no-repeat center / 100% 100%;"></div>`;

		const primaryRegex = new RegExp(`\[(]\\s*Melee\\s*\[)]|\[(]\\s*Primary\\s*\[)]`, "g");
		const secondaryRegex = new RegExp(`\[(]\\s*Secondary\\s*\[)]|\[(]\\s*Ranged\\s*\[)]`, "g");

		guide = guide.replace(primaryRegex, primaryWeaponHtml);
		guide = guide.replace(secondaryRegex, secondaryWeaponHtml);

		return guide;
	};

	const replaceTalents = (guide: string) => {
		let selectedTalents = [build.talent1, build.talent2, build.talent3, build.talent4, build.talent5, build.talent6];

		selectedTalents.forEach((talent) => {
			guide = replaceTalent(talent, guide);
		});

		return guide;
	};

	const replaceTalent = (talent: ICareerTalent | undefined, guide: string) => {
		if (!talent) return guide;

		const regex = new RegExp(`\[(]\\s*Level ${Math.ceil(talent!.talentNumber / 3) * 5}\\s*\[)]`, "g");

		let talentHtml = `<div class="!inline-block talent-lock-icon !size-[60px] text-[0.7rem] " style="background: url('/images/icons/talent-lock-icon.png') no-repeat center / contain; --talent-tier-level: '${Math.ceil(talent!.talentNumber / 3) * 5}';"></div>`;
		talentHtml += `<div class="inline-block border-05 size-[60px]" style="background: url('/images/careers/${build.career.id}/talents/talent-${talent.talentNumber < 10 ? "0" : ""}${talent.talentNumber}.png') no-repeat center / contain"></div>`;
		talentHtml += `<span>${talent.name}</span>`;

		return guide.replace(regex, talentHtml);
	};

	let guide = $derived.by(() => convertGuideMarkdown(build.description));
</script>

<div class="build-description-container border-09 py-5 px-8">
	<TextEditor readOnly={true} content={guide}></TextEditor>
</div>

<style>
	.build-description-container {
		background: linear-gradient(180deg, rgba(43, 18, 18, 0.2784313725490196) 35%, rgba(0, 0, 0, 0.30196078431372547));
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
	}
</style>
