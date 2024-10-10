<script lang="ts">
	import type Quill from "quill";
	import type { Delta } from "quill/core";
	import { afterUpdate, onMount } from "svelte";

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"],
	];

	export let readOnly = false;
	export let content: string | undefined;

	let quill: Quill;
	let editor: HTMLElement;

	onMount(async () => {
		const { default: Quill } = await import("quill");
		await import("./CustomBlot");

		quill = new Quill(editor, {
			placeholder: "Write something...",
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
				let combinedDelta = delta.compose(oldDelta);
				if (isDeltaEmptyOrWhitespace(combinedDelta)) {
					content = "";
				} else {
					content = quill.getSemanticHTML();
				}
			}
		});
	});

	function isDeltaEmptyOrWhitespace(delta: Delta) {
		if (delta.ops.length === 0) {
			return true;
		}
		for (const op of delta.ops) {
			if (op.insert && typeof op.insert === "string" && op.insert.trim() !== "") {
				return false;
			}
		}
		return true;
	}

	afterUpdate(async () => {
		if (quill && readOnly) {
			const delta = quill.clipboard.convert({ html: content });
			quill.setContents(delta);
		}
	});
</script>

<div class="editor-wrapper text-[1.2rem] {readOnly ? 'readonly' : ''}">
	<div bind:this={editor}>{@html content}</div>
</div>

<style>
	@import "https://cdn.quilljs.com/1.3.6/quill.snow.css";

	:global(.ql-toolbar) {
		border: solid white;
		border-width: 0 0 1px 0 !important;
		position: relative;
		background: radial-gradient(ellipse at bottom, rgba(106, 55, 29, 0.4117647058823529) 15%, transparent),
			url("/images/backgrounds/background22.png");
	}
	:global(.editor-wrapper:not(.readonly) .ql-editor) {
		background: black;
	}
	:global(.ql-container) {
		border: none !important;
		font-size: inherit;
		font-family: caslon-antique;
	}
	:global(.editor-wrapper) {
		position: relative;
	}
	:global(.editor-wrapper:not(.readonly))::after {
		content: "";
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-image: url("/images/borders/border-01.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		border-image-repeat: repeat;
		pointer-events: none;
	}
</style>
