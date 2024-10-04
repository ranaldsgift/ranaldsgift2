<script lang="ts">
	type Props = {
		level: number;
	};

	let { level }: Props = $props();
</script>

<span
	class="talent-lock-icon justify-self-center"
	style="--size: 40px;
        --fontSize: 10px;
		--talent-tier-level: '{level}';"
></span>

<style>
	.talent-lock-icon {
		width: var(--size);
		height: var(--size);
		display: block;
		position: relative;
		background: url("/images/icons/talent-lock-icon.png");
		background-size: contain;
		font-size: var(--fontSize);
	}
	.talent-lock-icon::after {
		content: var(--talent-tier-level);
		position: absolute;
		width: 100%;
		z-index: 99999999999;
		font-size: 150%;
		color: #c15b24;
		text-align: center;
		top: calc(var(--size) / 2);
		transform: translateY(-30%);
	}
</style>
