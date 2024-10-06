<script lang="ts">
	type Props = {
		value: string;
		onInput?: (event: Event) => void;
		placeholder?: string;
	};

	let { value = $bindable(), onInput, placeholder = "" }: Props = $props();
</script>

<div class="bg-black">
	<input bind:value oninput={onInput} {placeholder} />
</div>

<style>
	input {
		background: none;
		padding: 0 10px;
		border-image: url("/images/borders/border-05.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		border-image-repeat: repeat;
		position: relative;
	}
	input:focus {
		outline: none;
		box-shadow: inset 0 2px 10px #ffffff4f;
	}
</style>
