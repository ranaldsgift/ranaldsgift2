<script lang="ts">
	import Background from '$lib/components/Background.svelte';
	import TopNavigation from '$lib/components/navigation/TopNavigation.svelte';

	const { children } = $props();
</script>

<TopNavigation></TopNavigation>

<Background clipPath={true}></Background>

<div class="frame-container flex-auto w-full h-full hidden tablet:flex overflow-hidden pb-5">
	<a class="page-title hover:!no-underline" href="/">Ranald's Gift</a>
	<div class="page-title-background"></div>
	<div class="root-container border-06 p-10 rounded-[8px]">
	</div>
</div>

<div class="page-container desktop:min-w-[900px]">
	<div class="page">
		{@render children()}
	</div>
</div>

<style>
	.root-container {
		position: relative;
		width: 100%;
		height: calc(100% - 40px);
		object-fit: cover;
		top: 40px;
		left: 0;
		margin: 0 20px 0px 20px;
		padding: 20px;
		display: grid;
		grid-template-rows: auto 1fr;
		overflow: hidden;
	}
	.page {
    	margin: 47px 0px;
		padding: 0;
		width: 100%;
		height: calc(100vh - 47px);
		overflow-y: auto;
		padding-bottom: 20px;
	}
    .page-container {
		position: relative;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        justify-items: center;
        align-items: start;
		border-radius: 8px;
		margin: 0 auto;
		height: 100vh;
		width: 100vw;
    }
	@media (min-width: 768px) {
		.page {
			padding: 20px !important;
			background: linear-gradient(45deg, #200000bd, #2000009e), url('/images/backgrounds/background7.webp');
			height: calc(100vh - 100px);
			width: calc(100vw - 80px);
			margin: 60px 40px 50px;
			overflow-y: auto;
			overflow-x: hidden;
			-moz-backface-visibility: hidden; 
			-webkit-backface-visibility: hidden; 
			backface-visibility: hidden;
		}
	}
	.page-title {
		display: none;
	}
	@media (min-width: 1600px) {
	.page-title {
		display: block;
		text-align: center;
		width: 662px;
		position: absolute;
		z-index: 10001;
		top: 3px;
		left: 50%;
		translate: -50% 0%;
		font-size: 1.4rem;
		color: #c15b24;
		line-height: 66px;
		text-transform: uppercase;
		font-family: "caslon-antique-bold";
		pointer-events: all;
		background: url('/images/labels/label-01.png');
	}
	.page-title-background {
		content: '';
		width: 417px;
		height: 42px;
		position: absolute;
		top: 23px;
		z-index: 1;
		left: 50%;
		translate: -50% 0%;
		background: linear-gradient(180deg, #2b1212 35%, #000);
	}
}
	.frame-container {
		position: fixed;
		top: 0;
		z-index: 10001;
		pointer-events: none;
	}
</style>