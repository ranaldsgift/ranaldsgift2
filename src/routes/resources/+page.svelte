<script lang="ts">
	type ResourceList = {
		title: string;
		links: {
			title: string;
			url: string;
			description?: string | undefined;
		}[];
	};

	const resources: ResourceList[] = [
		{
			title: "Official Links",
			links: [
				{
					title: "Fatshark Vermintide Site",
					url: "http://www.vermintide.com/",
				},
				{
					title: "Fatshark Vermintide Forum",
					url: "https://forums.fatsharkgames.com/",
				},
				{
					title: "Fatshark Vermintide Discord",
					url: "https://discordapp.com/invite/vermintide",
				},
				{
					title: "Vermintide 2 Steam",
					url: "https://store.steampowered.com/app/552500/Warhammer_Vermintide_2/",
				},
				{
					title: "Vermintide 1 Steam",
					url: "https://store.steampowered.com/app/235540/Warhammer_End_Times__Vermintide/",
				},
			],
		},
		{
			title: "Vermintide 2 Resources",
			links: [
				{
					title: "Vermintide 2 Wiki",
					url: "https://vermintide2.gamepedia.com/Vermintide_2_Wiki",
				},
				{
					title: "Delete Your Console Logs. Save Space!",
					url: "https://www.reddit.com/r/Vermintide/comments/ifoizm/reminder_vermintide_1_and_vermintide_2_never/",
				},
				{
					title: "Breakpoint Calculator",
					url: "https://www.reddit.com/r/Vermintide/comments/11dm2rg/revised_damage_and_breakpoint_spreadsheet_v1402/",
				},
				{
					title: "Comprehensive Movement Tech Spreadsheet",
					url: "https://www.reddit.com/r/Vermintide/comments/kk6yqu/a_comprehensive_spreadsheet_about_movement_tech/",
				},
				{
					title: "Out-of-Game VT2 Armory Mod Reference",
					url: "https://www.reddit.com/r/Vermintide/comments/j94ssl/outofgame_vt2_armory_mod_reference/",
				},
				{
					title: "Patrol Pathing on All Maps",
					url: "https://www.reddit.com/r/Vermintide/comments/kxe3zh/i_created_a_guide_that_maps_all_patrol_paths_on/",
				},
				{
					title: "Biggest Changes Since Release",
					url: "https://www.reddit.com/r/Vermintide/comments/ibfx2n/the_biggest_changes_and_additions_since_release/",
				},
				{
					title: "Everything You Wish Fatshark Told You",
					url: "https://www.reddit.com/r/Vermintide/comments/90qola/a_list_of_everything_you_wish_fatshark_told_you/",
				},
				{
					title: "Vermintide 2 New & Returning Player FAQ",
					url: "https://www.reddit.com/r/Vermintide/comments/f6d0wm/vermintide_22_returning_new_players_faq/",
				},
			],
		},
		{
			title: "Vermintide 1 Resources",
			links: [
				{
					title: "Vermintide 1 Wiki",
					url: "https://vermintide.gamepedia.com/Vermintide_Wiki",
				},
				{
					title: "Ubersreik Survival Manual",
					url: "https://www.reddit.com/r/Vermintide/comments/7j2nr1/community_challenge_verminscribes_1_voting/",
				},
				{
					title: "Weapon Damage & Stats",
					url: "https://docs.google.com/spreadsheets/d/1h3GnI6sIS77oXnCzE05k7KTkOoGJ3UezeVi24miBBoM/edit#gid=1035311592",
				},
				{
					title: "User Guides, Tools, and Resources Index",
					url: "https://www.reddit.com/r/Vermintide/wiki/index",
				},
				{
					title: "Grimalackt's QoL Mods",
					url: "https://www.reddit.com/r/Vermintide/comments/7vk92o/110_quality_of_life_modpack_v15_cheatfree_w/",
				},
				{
					title: "Verminitde Mod Framework (VMF)",
					url: "https://www.reddit.com/r/Vermintide/comments/7aua2w/vermintide_mod_framework_0180_no_cheat_version/",
				},
			],
		},
		{
			title: "Console Resources",
			links: [
				{
					title: "Cataclysm Enemy Health Pools",
					url: "https://www.reddit.com/r/Vermintide/comments/geqhx0/xbox_enemy_health_pools_cata/",
				},
				{
					title: "Vermintide Exterminators United (Xbox Club)",
					url: "https://account.xbox.com/en-US/clubs/profile?clubid=3379865725306954",
				},
				{
					title: "PS4 Master Resource List",
					url: "https://www.reddit.com/r/Vermintide/comments/aeehqd/ps4_master_resource_list/",
				},
			],
		},
		{
			title: "Related Subreddits",
			links: [
				{
					title: "Vermintide LFG",
					url: "https://www.reddit.com/r/VermintideLFG/",
				},
				{
					title: "Darktide",
					url: "https://www.reddit.com/r/DarkTide/",
				},
				{
					title: "Warhammer",
					url: "https://www.reddit.com/r/warhammer/",
				},
				{
					title: "Warhammer 40k",
					url: "https://www.reddit.com/r/Warhammer40k/",
				},
				{
					title: "Warhammer Fantasy",
					url: "https://www.reddit.com/r/WarhammerFantasy/",
				},
			],
		},
		{
			title: "Discord Communities",
			links: [
				{
					title: "Shark Crew",
					url: "https://discord.com/invite/yNPwa57",
					description:
						"A Fatshark community discord dedicated to Vermintide, Warhammer content, and similar PVE material. Many North America Vermintide players here so come join us!",
				},
				{
					title: "Blood Moon Inn",
					url: "https://discord.gg/jk7xPCBcHA",
					description:
						"Vermintide community Discord. A tavern for both new and veteran players. Thousands upon thousands of players. REEEEE!",
				},
				{
					title: "Red Moon Inn",
					url: "https://discord.gg/kR62Je5QSn",
					description:
						"The Red Moon Inn is where players of all skill levels can play together and exchange tips & tricks. We don't take ourselves too seriously so come and enjoy the ride!",
				},
				{
					title: "Squirrel Squad",
					url: "https://discord.gg/NeTZxZ7",
					description:
						"A community of enthusiastic, passionate, and friendly folks who just love Vermintide. First and foremost, we promote productive conversation and an avenue for new players to find others to play with.",
				},
				{
					title: "Vermintide Modders",
					url: "https://discord.gg/GAQMw4W",
					description:
						"The place for everyone into modding any of the Vermintide games. Like their description states: It's the definitive place to find helpful modding resources, advice, and the latest modding-related news.",
				},
				{
					title: "VT Modded Community",
					url: "https://discord.gg/eUtYqpa",
					description:
						"A server for growing modded as a whole and collect, share and gather knowledge about any kind of modded content. Great place to discuss and ask questions regarding True Solos, Onslaught, Deathwish, etc.",
				},
			],
		},
		{
			title: "Guides by Royale w/ Cheese",
			links: [
				{
					title: "Full collection of all Royale w/ Cheese guides",
					url: "https://steamcommunity.com/id/dylanrong/myworkshopfiles/?section=guides&appid=552500",
				},
				{
					title: "[Legend] All Careers]",
					url: "https://steamcommunity.com/sharedfiles/filedetails/?id=2034609078",
				},
				{
					title: "[Cataclysm] Markus Kruber",
					url: "https://steamcommunity.com/sharedfiles/filedetails/?id=1831243904",
				},
				{
					title: "[Cataclysm] Bardin Goreksson",
					url: "https://steamcommunity.com/sharedfiles/filedetails/?id=1832306381",
				},
				{
					title: "[Cataclysm] Kerillian",
					url: "https://steamcommunity.com/sharedfiles/filedetails/?id=1833337461",
				},
				{
					title: "[Cataclysm] Victor Saltzpyre",
					url: "https://steamcommunity.com/sharedfiles/filedetails/?id=1833338040",
				},
				{
					title: "[Cataclysm] Sienna Fuegonasus",
					url: "https://steamcommunity.com/sharedfiles/filedetails/?id=1833925976",
				},
			],
		},
	];
</script>

<div id="page">
	<div class="flex flex-wrap gap-5 justify-center">
		{#each resources as { title, links }}
			<div class="border-13 background-22">
				<h2 class="label label-15">{title}</h2>
				<div class="links-container">
					{#each links as { title, url, description }}
						<div class="link-container">
							<p><a href={url}>{title}</a></p>
							{#if description}
								<p class="tooltip">{description}</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	#page {
		max-width: 1200px;
	}

	a {
		color: #c15b24;
	}

	.links-container {
		box-shadow: inset 0px 8px 10px 0px #000000;
		padding: 16px 20px;
	}

	.label {
		font-size: 1.4rem;
	}

	.link-container {
		font-size: 1.1rem;
		max-width: 320px;
	}

	.tooltip {
		display: none;
	}
</style>
