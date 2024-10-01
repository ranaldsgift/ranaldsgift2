<script>
	import { page } from "$app/stores";
	import Background from "$lib/components/Background.svelte";
</script>

<svelte:head><title>Holy Sigmar! - augs.tools</title></svelte:head>

<div id="page" class="text-white flex flex-col relative w-[100vw] h-[100vh] items-center bg-black z-[-1]">
	<!-- 	<span class="divider-20 h-[59px]"></span>
	<div class="error">
		<h2 class="text-2xl mt-4">Holy Sigmar!</h2>
		<p class="mb-4">{$page.status} - {$page.error?.message}</p>
	</div>
	<span class="divider-20 h-[59px] rotate-180"></span> -->

	<div class="relative w-[500px] max-w-[calc(100vw-40px)] mt-[140px] mobile:mt-[190px]">
		<img src="/images/backgrounds/blood1.png" alt="Defeated" class="blood-1 absolute top-[-35%] left-[-22%] max-w-[160%] z-[-1]" />
		<img src="/images/backgrounds/blood2.png" alt="Defeated" class="blood-2 absolute top-[20%] left-[20%] max-w-[40%] z-[-1]" />
		<img src="/images/backgrounds/defeated.png" alt="Defeated" class="defeated-image" />
		<span class="defeated-text absolute top-[-80px]" style="--fontSize: 4.5rem">Defeated</span>
		<p class="error-message absolute" style="--fontSize: 2rem">{$page.status} - {$page.error?.message}</p>
	</div>
	<div class="blood-splatter-1"></div>
	<div class="blood-splatter-2"></div>
</div>

<style>
	.defeated-text {
		font-size: 4.5rem;
		color: red;
		text-transform: uppercase;
		text-shadow: 1px 1px #000;
		left: 50%;
		transform: translateX(-50%);
		animation-name: zoomOutAndFadeInText;
		animation-duration: 1.8s;
	}
	.error-message {
		font-size: 2rem;
		bottom: -70px;
		left: 50%;
		transform: translateX(-50%);
		animation-name: errorFade;
		animation-duration: 1.3s;
	}
	.blood-1 {
		animation-name: reveal;
		animation-duration: 1s;
	}
	.blood-2 {
		animation-name: revealTopToBottom;
		animation-duration: 3s;
	}
	.defeated-image {
		animation-name: zoomOutAndFadeIn;
		animation-duration: 1.3s;
	}
	@keyframes errorFade {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0;
			font-size: calc(var(--fontSize) + 5px);
		}
		80% {
		}
		95% {
			font-size: var(--fontSize);
			opacity: 1;
		}
		100% {
			font-size: var(--fontSize);
			opacity: 1;
		}
	}

	@keyframes zoomOutAndFadeInText {
		0% {
			opacity: 0;
		}
		80% {
			font-size: calc(var(--fontSize) + 10px);
			opacity: 0;
		}
		95% {
			font-size: var(--fontSize);
			opacity: 1;
		}
		100% {
			font-size: var(--fontSize);
			opacity: 1;
		}
	}

	@keyframes zoomOutAndFadeIn {
		0% {
			transform: scale(4);
			opacity: 0;
		}
		50% {
			transform: scale(4);
			opacity: 0;
		}
		95% {
			transform: scale(0.99);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes revealTopToBottom {
		0% {
			opacity: 0;
			clip-path: inset(0 0 100% 0); /* Fully clipped */
		}
		20% {
			opacity: 1;
			clip-path: inset(0 0 100% 0); /* Fully clipped */
		}
		100% {
			opacity: 1;
			clip-path: inset(0); /* Fully revealed */
		}
	}

	@keyframes reveal {
		0% {
			opacity: 1;
			clip-path: inset(0 100% 100% 0); /* Fully clipped */
		}
		100% {
			clip-path: inset(0); /* Fully revealed */
		}
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
