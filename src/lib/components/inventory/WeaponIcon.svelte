<script lang="ts">
	import type { IWeapon } from "$lib/entities/Weapon";

	type Props = {
		weapon: IWeapon;
		class?: string;
	};

	let { weapon, class: CLASS = "" }: Props = $props();
</script>

<div
	class="weapon-icon border-04 {CLASS}"
	style="background: url('/images/weapons/{weapon.codename}.png') no-repeat center / calc(100% + 8px), 
                        url('/images/backgrounds/icon-background-2.png') no-repeat center / 100% 100%;"
>
	<div class="tooltip border-35">
		<span class="name header-underline">{weapon.name}</span>
		<span class="description">
			{weapon.description}
		</span>
	</div>
</div>

<style>
	.weapon-icon {
		height: 62px;
		width: 62px;
	}
	.weapon-icon:before:hover {
		display: none !important;
	}
	.weapon-icon {
		box-shadow: inset 0 2px 2px white;
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
		z-index: 3;
		max-width: 400px;
		transform: translateY(calc(-100% - 10px));
		background: linear-gradient(0deg, #000000cf, #00000030), url("/images/backgrounds/background29.png");
		background-size: cover;
		text-transform: none;
		position: absolute;
		display: grid;
		grid-auto-flow: row;
		grid-row-gap: 5px;
		box-shadow: inset 0 0 10px 5px #000000;
		visibility: hidden;
	}
	.weapon-icon:hover > .tooltip {
		visibility: visible;
	}

	.weapon-icon .tooltip .description {
		text-transform: capitalize;
	}
</style>
