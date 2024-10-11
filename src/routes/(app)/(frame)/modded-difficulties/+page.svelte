<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import ContentButton from "$lib/components/buttons/ContentButton.svelte";
	import ContentContainer from "$lib/components/ContentContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";
</script>

<Seo
	title="Modded Difficulties"
	description="Modded difficulties are intended to make the game more challenging and fun. They are not intended to be easy or forgiving, but rather to be a challenge for players seeking a more difficult experience."
	image="/images/modded-difficulties/modded-difficulties.png"
/>

<Breadcrumb links={[{ href: "/", text: "Home" }]}>Modded Difficulties</Breadcrumb>

<div class="page-layout border-01 background-39 m-auto max-w-7xl top-left-shadow relative">
	<div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 pointer-events-none z-0"></div>
	<div class="page-content p-5 text-[1.2rem] relative z-1">
		<TextHeader>Modded Difficulties</TextHeader>
		<div class="divider-21 w-full h-[20px] mb-2"></div>
		<ContentContainer class="mx-auto !mb-8 w-fit">
			<p>
				Modded difficulties are intended to make the game more challenging and fun. They are not intended to be easy or forgiving,
				but rather to be a challenge for players seeking a more difficult experience.
				<br />
				<br />
				This resource serves as a guide to explain these difficulty modifiers as well as help players find and install the corresponding
				mods.
			</p>
			<div class="divider-03 w-full h-[20px] my-4"></div>
			<p class="text-center">
				<a
					target="_blank"
					href="https://steamcommunity.com/sharedfiles/filedetails/?id=2810038063"
					class="font-bold uppercase text-2xl">Jump right in</a
				>
				<br />
				Grab the mods from the Onslaught Series approved mod pack:
			</p>
			<div class="mt-4">
				<div class="flex gap-5 justify-center">
					<ContentButton url="https://steamcommunity.com/sharedfiles/filedetails/?id=2810038063">
						<span>Onslaught Series approved mods</span>
						<img
							src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/steam.svg"
							alt="Youtube"
							class="inline-block w-6 h-6 invert ml-2"
						/>
					</ContentButton>
				</div>
			</div>
		</ContentContainer>
		<TextHeader>Terminology</TextHeader>
		<div class="divider-21 w-full h-[20px] mb-2"></div>
		<div class="terminology-container grid grid-cols-1 desktop:grid-cols-4 gap-4 mb-8">
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<p class="text-[#0096fb]">Cata/Cata 2/Cata 3:</p>
				<p>
					The three different difficulty tiers of Cataclysm originally introduced by Fatshark for the Weaves game mode, later
					modded to be played in adventure maps. The mod that opens Cata 2 and Cata 3 in adventure mode has been combined with the
					Deathwish mod created by RandomWords.
				</p>
			</ContentContainer>
			<div class="divider-10 h-[26px] !bg-contain my-2 desktop:hidden"></div>
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<p class="text-[#0096fb]">Cataclysm 1 (C1):</p>
				<p>
					The highest difficulty in the official game's Adventure Mode, introduced with the Winds of Magic DLC. Expect more
					hordes, elites, and specials.
				</p>
			</ContentContainer>
			<div class="divider-10 h-[26px] !bg-contain my-2 desktop:hidden"></div>
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<p class="text-[#0096fb]">Cataclysm 2 (C2):</p>
				<p>Is not played by the community and can be disregarded for now.</p>
			</ContentContainer>
			<div class="divider-10 h-[26px] !bg-contain my-2 desktop:hidden"></div>
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<p class="text-[#0096fb]">Cataclysm 3 (C3):</p>
				<p>
					The differences from regular Cataclysm is that the maximum amount of specials has been increased (from 5) and made
					consistent amongst all the factions, additionally enemies have increased health with slightly more mass.
				</p>
			</ContentContainer>
			<div class="divider-10 h-[26px] !bg-contain my-2 desktop:hidden"></div>
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1619024877">Onslaught (ONS):</a>
				<p>
					A difficulty mutator that introduces more elites in hordes, changes the enemy composition of hordes, and also speeds up
					the pacing of a match which makes hordes and specials appear much more frequently. Events are reworked on every map to
					increase difficulty, and occasionally completely new events are added in. There are no empty boss/patrol triggers in
					Onslaught. Onslaught was created by Grimalackt.
				</p>
			</ContentContainer>
			<div class="divider-10 h-[26px] !bg-contain my-2 desktop:hidden"></div>
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2179403386">Onslaught+ (ONS+):</a>
				<p>
					A difficulty mutator that aims to provide a more difficult experience than regular Onslaught. ONS+ introduces more
					elites in hordes, as well as shield units, and some waves include Chaos Warriors. The mod increases the amount of
					ambients that can spawn too. The main changes are related to map triggers and events, so expect larger patrols and more
					bosses. OnslaughtPlus was created by Iceolator.
				</p>
			</ContentContainer>
			<div class="divider-10 h-[26px] !bg-contain my-2 desktop:hidden"></div>
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2848074673">Dutch Spice Tourney Version (Dutch):</a>
				<p>
					A mutator mod in the same vein as Onslaught made by Core specifically for the Onslaught Series. This is the difficulty
					second only to Spicy Onslaught; "Spice the average Dutchie can handle". There are a lot of spawns in Dutch Spice, most
					notably vastly increased Special spawns. Custom enemies are also introduced, such as White Stormvermin, which are normal
					SV but with super armour type and Bestigor HP.
				</p>
			</ContentContainer>
			<div class="divider-10 h-[26px] !bg-contain my-2 desktop:hidden"></div>
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2157602864">Spicy Onslaught (Spicy):</a>
				<p>
					A modded difficulty created by Core. It is currently the highest achievable difficulty and a buffed version of Dutch
					Spice. It cranks everything up Dutch has to offer.
				</p>
			</ContentContainer>
			<div class="divider-10 h-[26px] !bg-contain my-2 desktop:hidden"></div>
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1835393505">Deathwish (DW):</a>
				<p>
					A difficulty modifier that increases enemy stagger resistances. Elites can no longer be interrupted out of their
					overheads with a majority of the classes in the game, and enemies in general tend to stay stunned for a much shorter
					period of time. Stagger damage multipliers are locked at C1 values (less damage dealt to staggered enemies in C3).
					Deathwish was originally created by Grimalackt, but it is now updated and maintained by RandomWords with input from the
					community.
				</p>
			</ContentContainer>
			<div class="divider-10 h-[26px] !bg-contain my-2 desktop:hidden"></div>
			<ContentContainer class="max-w-[672px] flex flex-col gap-5">
				<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1835393505">Deathwish Onslaught (DWONS):</a>
				<p>
					The term for stacking the Deathwish and Onslaught modifiers on top of each other. Often used in conjunction with the
					difficulty level being played (ex. Cata 1 + Onslaught + Deathwish = C1DWONS).
				</p>
			</ContentContainer>
		</div>
		<TextHeader>Modifier Overview</TextHeader>
		<div class="divider-21 w-full h-[20px] mb-2"></div>
		<img class="w-full max-w-[672px] m-auto" src="https://i.imgur.com/ivVTPat.jpeg" alt="Modifier Overview" />
		<p class="text-right">*Infographic created by kuli</p>
	</div>
</div>

<style>
	p {
		max-width: 672px;
		margin: 0 auto;
	}
	.terminology-container > div:not(.divider-10) {
		height: 100%;
		position: relative;
		overflow: hidden;
	}

	.terminology-container > div:not(.divider-10)::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.02));
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		pointer-events: none;
		border-image: url("/images/borders/border-11.png");
		border-image-slice: 15;
		border-image-width: 15px;
		border-style: solid;
		border-image-repeat: repeat;
	}

	.terminology-container > div > * {
		position: relative;
		z-index: 2;
	}
</style>
