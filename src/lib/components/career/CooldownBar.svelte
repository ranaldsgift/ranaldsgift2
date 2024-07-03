<script lang="ts">
	type Props = {
		cooldown: number;
	};

	const { cooldown }: Props = $props();
	const MAX_COOLDOWN_DURATION = 120;
	const cooldownBarWidth = $derived((cooldown / MAX_COOLDOWN_DURATION) * 100);
</script>

<div class="cooldown-bar">
	<div class="stat-container" style="--cooldown-bar-width: {cooldownBarWidth}%">
		<span class="text-white">{cooldown.toString()}s</span>
	</div>
</div>

<style>
	.cooldown-bar {
		width: 100%;
		border-radius: 2px;
		height: 35px;
		position: relative;
	}
	.cooldown-bar::after {
		border-image: url("/images/borders/border-11.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-image-repeat: repeat;
		border-style: solid;
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		height: 100%;
		width: 100%;
		z-index: 1;
		box-sizing: border-box;
	}
	.cooldown-bar::before {
		background-image: url("/images/backgrounds/background18.png");
		background-size: cover;
		background-repeat: no-repeat;
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		height: 100%;
		width: 100%;
	}
	.cooldown-bar .stat-container {
		width: var(--cooldown-bar-width);
	}
	.cooldown-bar .stat-container {
		background:
			linear-gradient(90deg, #2b1d7eb3, #6c48a8b3 100%),
			url("/images/backgrounds/background-42.png") center / cover;
	}
	.stat-container {
		color: #f0d9af;
		justify-content: center;
		align-content: center;
		display: grid;
		height: 100%;
		position: absolute;
		z-index: 1;
		grid-auto-flow: column;
		grid-template-rows: 1fr;
		grid-auto-columns: auto;
		align-items: center;
		box-shadow: inset 0px 5px 2px 2px #ffffff60;
		font-size: 1.2em;
		border-radius: 0 15px 15px 0;
	}
</style>
