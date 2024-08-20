<script lang="ts">
	type Props = {
		careerId: number;
		talentNumber: number;
		size: string;
		class?: string;
	};

	const { careerId, talentNumber, size, class: CLASS }: Props = $props();
</script>

<span
	class="talent-icon block {CLASS}"
	style="--size: {size}; background: url('/images/careers/{careerId}/talents/talent-{talentNumber < 10
		? '0'
		: ''}{talentNumber}.png') no-repeat center / contain"
></span>

<style>
	.talent-icon {
		width: var(--size);
		height: var(--size);
	}
</style>
