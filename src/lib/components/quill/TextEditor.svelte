<script lang="ts">
	import type Quill from "quill";
	import { afterUpdate, onMount } from "svelte";

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"],
	];

	export let readOnly = false;
	export let content: string;

	let quill: Quill;
	let editor: HTMLElement;

	onMount(async () => {
		const { default: Quill } = await import("quill");
		await import("./CustomBlot");

		quill = new Quill(editor, {
			theme: "snow",
			readOnly,
			modules: {
				toolbar: readOnly ? false : toolbarOptions,
				resize: {
					locale: {
						// change them depending on your language
						altTip: "Hold down the alt key to zoom",
						floatLeft: "Left",
						floatRight: "Right",
						center: "Center",
						restore: "Restore",
					},
				},
			},
		});

		quill.on("text-change", (delta, oldDelta, source) => {
			if (source == "user") {
				content = quill.getSemanticHTML();
			}
		});
	});

	afterUpdate(async () => {
		if (quill) {
			const delta = quill.clipboard.convert({ html: content });
			quill.setContents(delta);
		}
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
