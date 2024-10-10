<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import type { ICareerTalent } from "$lib/entities/career/CareerTalent";
	import TextEditor from "../quill/TextEditor.svelte";

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
		if (build.primaryWeapon.weapon) {
			const primaryWeaponHtml = `<div class="weapon-icon border-02 size-[60px]" style="background: url('/images/weapons/${build.primaryWeapon.weapon.codename}.png') no-repeat center / calc(100% + 8px), url('/images/backgrounds/icon-background-2.png') no-repeat center / 100% 100%;"></div>`;
			const primaryRegex = new RegExp(`\[(]\\s*Melee\\s*\[)]|\[(]\\s*Primary\\s*\[)]`, "g");
			guide = guide.replace(primaryRegex, primaryWeaponHtml);
		}

		if (build.secondaryWeapon.weapon) {
			const secondaryWeaponHtml = `<div class="weapon-icon border-02 size-[60px]" style="background: url('/images/weapons/${build.secondaryWeapon.weapon.codename}.png') no-repeat center / calc(100% + 8px), url('/images/backgrounds/icon-background-2.png') no-repeat center / 100% 100%;"></div>`;
			const secondaryRegex = new RegExp(`\[(]\\s*Secondary\\s*\[)]|\[(]\\s*Ranged\\s*\[)]`, "g");
			guide = guide.replace(secondaryRegex, secondaryWeaponHtml);
		}

		if (build.necklace) {
			const necklaceHtml = `<div class="necklace-icon border-02 size-[60px]" style="background: url('/images/icons/necklace-icon.png') no-repeat center / auto, #000;"></div>`;
			const necklaceRegex = new RegExp(`\[(]\\s*Necklace\\s*\[)]`, "g");
			guide = guide.replace(necklaceRegex, necklaceHtml);
		}

		if (build.charm) {
			const charmHtml = `<div class="charm-icon border-02 size-[60px]" style="background: url('/images/icons/charm-icon.png') no-repeat center / auto, #000;"></div>`;
			const charmRegex = new RegExp(`\[(]\\s*Charm\\s*\[)]`, "g");
			guide = guide.replace(charmRegex, charmHtml);
		}

		if (build.trinket) {
			const trinketHtml = `<div class="trinket-icon border-02 size-[60px]" style="background: url('/images/icons/trinket-icon.png') no-repeat center / auto, #000;"></div>`;
			const trinketRegex = new RegExp(`\[(]\\s*Trinket\\s*\[)]`, "g");
			guide = guide.replace(trinketRegex, trinketHtml);
		}

		return guide;
	};

	const replaceTalents = (guide: string) => {
		let selectedTalents = [
			build.level5Talent,
			build.level10Talent,
			build.level15Talent,
			build.level20Talent,
			build.level25Talent,
			build.level30Talent,
		];

		selectedTalents.forEach((talent) => {
			guide = replaceTalent(talent, guide);
		});

		return guide;
	};

	const replaceTalent = (talent: ICareerTalent | null | undefined, guide: string) => {
		if (!talent) return guide;

		const regex = new RegExp(`\[(]\\s*Level ${Math.ceil(talent!.talentNumber / 3) * 5}\\s*\[)]`, "g");

		let talentHtml = `<div class="flex items-center gap-2">`;
		talentHtml += `<div class="!inline-block talent-lock-icon" style="--size: 60px; --fontSize: 14px; background: url('/images/icons/talent-lock-icon.png') no-repeat center / contain; --talent-tier-level: '${Math.ceil(talent!.talentNumber / 3) * 5}';"></div>`;
		talentHtml += `<div class="inline-block border-02 size-[60px]" style="background: url('/images/careers/${build.career.id}/talents/talent-${talent.talentNumber < 10 ? "0" : ""}${talent.talentNumber}.png') no-repeat center / contain"></div>`;
		talentHtml += `<span>${talent.name}</span>`;
		talentHtml += `</div>`;

		return guide.replace(regex, talentHtml);
	};

	let guide = $derived.by(() => convertGuideMarkdown(build.description));
</script>

<div class="build-description-container border-09 py-5 px-8 pb-5 mobile:p-b-[40px] tablet:p-b-[60px]">
	<TextEditor readOnly={true} content={guide}></TextEditor>
</div>

<style>
	.build-description-container {
		color: #000;
		background:
			url("/images/backgrounds/text-background-bottom.png") bottom / 100% auto no-repeat,
			url("/images/backgrounds/text-background.png") top / 100% auto repeat-y;
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
		padding-bottom: 40px;
	}
</style>
