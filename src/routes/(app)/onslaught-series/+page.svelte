<script lang="ts">
	import ButtonLink from "$lib/components/ButtonLink.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import TextHeader from "$lib/components/TextHeader.svelte";
</script>

<Seo
	title="Onslaught Series"
	description="Onslaught Series is a platform that aims to introduce players to modded difficulties as well as being the stomping grounds for events, both fun and serious. All skill levels are welcome. All events are open to the public, which means anyone can register to participate without meeting any prior qualifications."
	image="/images/onslaught-series/tournament-series.png"
/>

<div class="page-layout border-01 background-39 m-auto max-w-7xl top-left-shadow relative">
	<div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 pointer-events-none z-0"></div>
	<div class="page-content p-5 text-[1.2rem] relative z-1">
		<TextHeader>Onslaught Series</TextHeader>
		<div class="divider-21 w-full h-[20px] mb-2"></div>
		<p class="mx-auto !mb-8">
			Onslaught Series is a platform that aims to introduce players to modded difficulties as well as being the stomping grounds for
			events, both fun and serious. All skill levels are welcome. All events are open to the public, which means anyone can register
			to participate without meeting any prior qualifications.
			<br />
			<br />
			Onslaught Series events are typically streamed on the
			<a href="https://www.twitch.tv/fightthetide" target="_blank">FightTheTide Twitch channel</a> and shoutcasted live by members of
			the community. You can also find an archive of past events on the
			<a href="https://www.youtube.com/channel/UCqdpLLAFvlFEuNLoQC2Kqsw" target="_blank">FightTheTide YouTube channel</a>.
			<br />
			<br />
			For more information about the Onslaught Series, and to register for any of the events, visit the
			<a href="https://discord.gg/4mm6sCAS4a" target="_blank">Onslaught Series Discord</a>.
		</p>
		<div>
			<TextHeader>Current Series</TextHeader>
			<div class="divider-21 w-full h-[20px] mb-2"></div>
			<div class="grid min-[1440px]:grid-cols-3 gap-4">
				<div class="border-01 p-5 background-14">
					<img src="/images/onslaught-series/tournament-series.png" alt="Tournament Series" />
					<div class="divider-03 w-full h-[20px] my-2"></div>
					<TextHeader>Tournament Series</TextHeader>
					<p class="mb-4 p-2">
						The Onslaught Tournament Series is a recurring tournament event where players compete with their teammates to
						complete a series of maps in an allotted time against other teams in the game's Adventure Mode.
						<br />
						<br />
						While we do not place game experience limits on who can join, it is recommended that players have some level of Onslaught
						experience before participating. Pre-made teams are highly encouraged to register together.
						<br />
						<br />
						We recognise that not all players are ready to compete on the highest difficulties that the modded realm has to offer.
						As such, the tournaments are broken into four skill tiers and we encourage teams to self-sort themselves into their desired
						skill level. At the end of the allotted time, the teams will be scored based on their performance following a scoring
						system. For complete details about the Tournament Series, see the
						<a href="https://docs.google.com/document/d/1_NtL67wkaRKmMkEezCxorH8Az54roAYBXb9WQFMUczc/edit">rules</a>.
						<br />
						<br />
						Tournaments usually have prize pools that are typically awarded to the top team in each skill tier. The goal of the Tournament
						Series is to reward skilled play and encourage teams to challenge themselves when they feel ready to take the next step.
						The higher the tier, the higher the prize incentive.
					</p>
				</div>
				<div class="border-01 p-5 background-14">
					<img src="/images/onslaught-series/captain-series.png" alt="Captain Series" />
					<div class="divider-03 w-full h-[20px] my-2"></div>
					<TextHeader>Captain Series</TextHeader>
					<p class="p-2">
						The Onslaught Captain Series is a recurring learning event designed to provide players with an environment focused
						on learning and helping people have a good introductory experience with modded difficulties.
						<br />
						<br />
						Our goal is to help ease players who are new to the Deathwish and Onslaught mods into the modded community, and to help
						provide a path for players of all experiences to progress to higher difficulties commonly played inside our portion of
						the modded community.
						<br />
						<br />
						We also want to help people feel comfortable in our community, and to provide a way for people to dip their toes into
						the waters of modded difficulties to see if it's something they're interested in.
					</p>
				</div>
				<div class="border-01 p-5 background-14">
					<div class="background-40 max-w-[320px] mx-auto">
						<img src="/images/onslaught-series/fun-runs.png" alt="Fun Runs" />
					</div>
					<div class="divider-03 w-full h-[20px] my-2"></div>
					<TextHeader>Fun Runs</TextHeader>
					<p class="p-2">
						Fun Runs are a recurring event where the idea is to have players come together, meet others, form some teams, and
						play modded Vermintide together in a fun and relaxed setting. It is not meant to be overly competitive.
						<br />
						<br />
						Fun Runs, to change things up a little, will always follow a unique theme that may involve specific game modifiers or
						challenges.
					</p>
				</div>
			</div>
		</div>
		<div class="mt-8">
			<ul class="flex gap-5 justify-center">
				<li class="p-4 border-10 background-30">
					<p>Tournament + Captain Series Logo Art by:</p>
					<p class="flex gap-4">
						<a href="https://www.instagram.com/midiankai/" target="_blank">
							Midiankai&nbsp;&nbsp;
							<img
								src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg"
								alt="Instagram"
								class="inline-block w-6 h-6 invert"
							/>
						</a>
						<a href="https://x.com/midiankai" target="_blank">
							<img
								src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg"
								alt="X (formerly Twitter)"
								class="inline-block w-6 h-6 invert"
							/>
						</a>
					</p>
				</li>
				<li class="p-4 border-10 background-30">
					<p>Fun Runs Logo Art by:</p>
					<p class="flex gap-4">
						<a href="https://www.instagram.com/azeelio_art/" target="_blank">
							azeelio_art&nbsp;&nbsp;
							<img
								src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg"
								alt="Instagram"
								class="inline-block w-6 h-6 invert"
							/>
						</a>
						<a href="https://x.com/azeelio_art" target="_blank">
							<img
								src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg"
								alt="X (formerly Twitter)"
								class="inline-block w-6 h-6 invert"
							/>
						</a>
						<a href="https://www.reddit.com/user/azeelio/" target="_blank">
							<img
								src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/reddit.svg"
								alt="Reddit"
								class="inline-block w-6 h-6 invert"
							/>
						</a>
					</p>
				</li>
			</ul>
		</div>
		<div class="mt-8">
			<TextHeader>Tournament Breakdown</TextHeader>
			<div class="divider-21 w-full h-[20px] mb-2"></div>
			<iframe
				class="w-full aspect-video"
				src="https://www.youtube.com/embed/jFbhZWNTjbU"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
			<div class="mt-8">
				<ul class="flex gap-5 justify-center">
					<li class="p-4 border-10 background-30">
						<p>How Does Competitive Vermintide Work? by:</p>
						<p class="flex gap-4">
							<a href="https://www.youtube.com/@TrixMelee" target="_blank">
								Trix&nbsp;&nbsp;
								<img
									src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg"
									alt="Youtube"
									class="inline-block w-6 h-6 invert"
								/>
							</a>
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	img {
		max-width: 320px;
		margin: 0 auto;
	}
	p {
		max-width: 672px;
		margin: 0 auto;
	}
</style>
