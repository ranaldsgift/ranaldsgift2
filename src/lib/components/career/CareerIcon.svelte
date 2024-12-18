<script lang="ts">
	type Props = {
		careerId: number;
		selected?: boolean;
		style?: "portrait" | "icon" | "portrait-wide";
		handler?: (careerId: number) => void;
		class?: string;
	};

	const { careerId, selected = false, style = "portrait", handler, class: CLASS = "" }: Props = $props();
</script>

<!-- Add CSS variable like --mobile-icon-url to use as background image when browsing from mobile -->
<span
	class="career-icon border-02 w-full h-full {selected ? 'selected' : ''} {CLASS}"
	style="background: url('/images/careers/{careerId}/{style}.png') no-repeat center {style === 'portrait-wide'
		? 'right'
		: ''} / contain, url('/images/backgrounds/background29.png') no-repeat center / cover"
>
</span>

<style>
	span.career-icon {
		display: block;
		background-size: cover;
		background-position: center;
	}
</style>
