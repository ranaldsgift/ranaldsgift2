<script>
	import { page } from "$app/stores";
</script>

<svelte:head><title>Holy Sigmar! - augs.tools</title></svelte:head>

<div id="page" class="text-white flex flex-col mx-auto top-10 relative">
	<span class="title">Ranald's Gift</span>
	<span class="divider-20 h-[59px]"></span>
	<div class="error">
		<h2 class="text-2xl mt-4">Holy Sigmar!</h2>
		<p class="mb-4">{$page.status} - {$page.error?.message}</p>
	</div>
	<span class="divider-20 h-[59px] rotate-180"></span>
</div>

<style>
	#page {
		min-width: 522px;
		width: fit-content;
		max-width: 1200px;
		margin: 0 auto;
		z-index: 1;
	}
	.error {
		margin: 0 auto;
		width: calc(100% - 20px);
		background: rgba(0, 0, 0, 0.3);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		text-align: center;
		border-left: 1px solid rgba(0, 0, 0, 0.3);
		border-right: 1px solid rgba(0, 0, 0, 0.3);
		animation-name: slide-open;
		animation-duration: 2s;
	}

	@keyframes slide-open {
		0% {
			max-height: 0px;
			overflow: hidden;
			display: none;
		}
		10% {
			max-height: 0px;
			display: block;
		}
		100% {
			max-height: 1000px;
			display: block;
		}
	}

	.title {
		text-transform: uppercase;
		position: relative;
		top: 0;
		color: #c15b24;
		font-size: 3em;
		letter-spacing: 5px;
		text-shadow: 1px 1px #000;
		margin: 0 auto;
	}
</style>
