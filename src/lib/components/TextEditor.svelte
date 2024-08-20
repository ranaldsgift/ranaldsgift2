<script lang="ts">
	import { onMount } from "svelte";

	let editor: HTMLElement;

	export let readOnly = false;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"],
	];

	export let content: string;

	onMount(async () => {
		const { default: Quill } = await import("quill");

		let quill = new Quill(editor, {
			theme: "snow",
			readOnly,
			modules: {
				toolbar: readOnly ? false : toolbarOptions,
			},
		});
	});
</script>

<div class="editor-wrapper text-[1.2rem]">
	<div bind:this={editor}>{@html content}</div>
</div>

<style>
	@import "https://cdn.quilljs.com/1.3.6/quill.snow.css";

	:global(.ql-container) {
		border: none !important;
		font-size: inherit;
		font-family: caslon-antique;
	}
</style>
