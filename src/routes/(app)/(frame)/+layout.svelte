<script lang="ts">
	const { children } = $props();
</script>

<div class="frame-container flex-auto w-full h-full hidden tablet:flex overflow-hidden pb-5">
	<div class="page-title title-frame h-[66px]"></div>
	<div class="page-title-background">
		<a class="hover:!no-underline" href="/">Ranald's Gift</a>
	</div>
	<div class="root-container border-06 p-10 rounded-[8px]"></div>
</div>

<div class="page-container desktop:min-w-[900px]">
	<div class="page pb-0 mobile:pb-[20px]">
		{@render children()}
	</div>
</div>

<style>
	a {
		font-size: 1.4rem;
		color: #c15b24;
		text-transform: uppercase;
		font-family: "caslon-antique-bold";
		margin: 5px auto;
		pointer-events: all;
	}
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
		overflow-x: hidden;
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
			background: linear-gradient(45deg, #200000bd, #2000009e), url("/images/backgrounds/background7.webp");
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
	.page-title,
	.page-title-background {
		display: none;
	}
	@media (min-width: 1600px) {
		.page-title {
			display: block;
			text-align: center;
			width: 662px;
			position: absolute;
			z-index: 2;
			top: 3px;
			left: 50%;
			translate: -50% 0%;
			background: url("/images/labels/label-01.png");
		}
		.page-title-background {
			content: "";
			width: 417px;
			height: 42px;
			position: absolute;
			top: 15px;
			z-index: 1;
			left: 50%;
			translate: -50% 0%;
			background: linear-gradient(180deg, #2b1212 35%, #000);
			display: flex;
		}
	}
	.frame-container {
		position: fixed;
		top: 0;
		z-index: 100;
		pointer-events: none;
	}
</style>
