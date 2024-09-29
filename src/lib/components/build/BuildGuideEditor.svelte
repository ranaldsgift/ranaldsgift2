<script lang="ts">
	import TextEditor from "../quill/TextEditor.svelte";
	import BuildGuideContainer from "./BuildGuideContainer.svelte";

	type Props = {
		guide?: string;
	};

	let { guide = $bindable() }: Props = $props();
</script>

<div class="guide-editor-container border-09 py-8 px-8 relative">
	<TextEditor bind:content={guide}></TextEditor>
</div>

<style>
	.guide-editor-container {
		position: relative;
	}
</style>
