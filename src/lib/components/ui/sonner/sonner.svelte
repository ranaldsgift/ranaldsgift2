<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";

	type $$Props = SonnerProps;
</script>

<Sonner
	class="toaster group label-02"
	toastOptions={{
		classes: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
		},
	}}
	{...$$restProps}
/>

<style>
	:global(li[data-sonner-toast]) {
		padding: 15px;
		background-color: #000000 !important;
		border-image: url("/images/borders/border-03.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		border-image-repeat: repeat;
		text-align: center;
		justify-content: center;
		align-items: center;
	}
	:global(li[data-sonner-toast] > div[data-content]) {
		text-align: center;
		color: #928962 !important;
		text-transform: uppercase;
		font-family: "caslon-antique-bold";
		font-size: 1rem;
	}
	:global(:where([data-sonner-toast]) :where([data-icon])) {
		width: auto !important;
		padding-left: 10px !important;
		color: white !important;
	}
</style>
