<script lang="ts">
	type Props = {
		children: () => any;
        class?: string;
	};

	let { children, class: className }: Props = $props();
</script>

<div class="input-wrapper {className}">
    {@render children()}
</div>

<style>
    .input-wrapper {
        font-size: 1.2rem;
    }
	.input-wrapper > :global(input) {
		background: black;
		padding: 0 10px;
		border-image: url("/images/borders/border-05.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		border-image-repeat: repeat;
		position: relative;
	}
	.input-wrapper> :global(input:focus) {
		outline: none;
		box-shadow: inset 0 2px 10px #ffffff4f;
	}
</style>
