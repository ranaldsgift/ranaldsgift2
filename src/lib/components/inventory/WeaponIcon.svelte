<script lang="ts">
	import type { IWeapon } from "$lib/entities/Weapon";

	type Props = {
		weapon: IWeapon;
		class?: string;
		size?: string;
	};

	let { weapon, class: CLASS = "", size = "62px" }: Props = $props();
</script>

<div
	class="weapon-icon border-04 {CLASS}"
	style="--size: {size}; background: url('/images/weapons/{weapon.codename}.png') no-repeat center / calc(100% + 8px), 
                        url('/images/backgrounds/icon-background-2.png') no-repeat center / 100% 100%;"
>
	<div class="tooltip border-35">
		<span class="name header-underline">{weapon.name}</span>
		<span class="description">
			{weapon.tooltips.map((tooltip) => tooltip.name).join(", ")}
		</span>
	</div>
</div>

<style>
	.weapon-icon {
		height: var(--size);
		width: var(--size);
		grid-area: itemIcon;
	}
	.weapon-icon:before:hover {
		display: none !important;
	}
	.weapon-icon {
		box-shadow: inset 0 5px 2px white;
	}
	.weapon-icon.selected {
		border-image: url("/images/borders/border-30.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		border-image-repeat: repeat;
	}
	.weapon-icon:hover {
		cursor: pointer;
	}
	.weapon-icon > .tooltip {
		padding: 1.5rem;
		z-index: 1000;
		background: linear-gradient(0deg, #000000cf, #00000030), url("/images/backgrounds/background29.png");
		background-size: cover;
		text-transform: none;
		position: absolute;
		display: none;
		grid-auto-flow: row;
		grid-row-gap: 5px;
		box-shadow: inset 0 0 10px 5px #000000;
		translate: calc(-100% + 82px) calc(-100% - 10px);
		width: max-content;
	}
	.weapon-icon:hover > .tooltip {
		display: grid;
	}

	.weapon-icon .tooltip .description {
		text-transform: capitalize;
	}
</style>
