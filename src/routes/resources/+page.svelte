<script lang="ts">
type ResourceList = {
    title: string;
    links: {
        title: string;url: string,
        description: string
    } [];
};

const resources: ResourceList[] = [{
        title: 'Official Links',
        links: [{
                title: 'Fatshark Vermintide Site',
                url: 'http://www.vermintide.com/',
                description: ''
            },
            {
                title: 'Fatshark Vermintide Forum',
                url: 'https://forums.fatsharkgames.com/',
                description: ''
            },
            {
                title: 'Fatshark Vermintide Discord',
                url: 'https://discordapp.com/invite/vermintide',
                description: ''
            },
            {
                title: 'Vermintide 2 Steam',
                url: 'https://store.steampowered.com/app/552500/Warhammer_Vermintide_2/',
                description: ''
            },
            {
                title: 'Vermintide 1 Steam',
                url: 'https://store.steampowered.com/app/235540/Warhammer_End_Times__Vermintide/',
                description: ''
            },
        ],
    },
    {
        title: 'Vermintide 2 Resources',
        links: [{
                title: 'Vermintide 2 Wiki',
                url: 'https://vermintide2.gamepedia.com/Vermintide_2_Wiki',
                description: ''
            },
            {
                title: 'Delete Your Console Logs. Save Space!',
                url: 'https://www.reddit.com/r/Vermintide/comments/ifoizm/reminder_vermintide_1_and_vermintide_2_never/',
                description: ''
            },
            {
                title: 'Breakpoint Calculator',
                url: 'https://www.reddit.com/r/Vermintide/comments/11dm2rg/revised_damage_and_breakpoint_spreadsheet_v1402/',
                description: ''
            },
            {
                title: 'Comprehensive Movement Tech Spreadsheet',
                url: 'https://www.reddit.com/r/Vermintide/comments/kk6yqu/a_comprehensive_spreadsheet_about_movement_tech/',
                description: ''
            },
            {
                title: 'Out-of-Game VT2 Armory Mod Reference',
                url: 'https://www.reddit.com/r/Vermintide/comments/j94ssl/outofgame_vt2_armory_mod_reference/',
                description: ''
            },
            {
                title: 'Patrol Pathing on All Maps',
                url: 'https://www.reddit.com/r/Vermintide/comments/kxe3zh/i_created_a_guide_that_maps_all_patrol_paths_on/',
                description: ''
            },
            {
                title: 'Biggest Changes Since Release',
                url: 'https://www.reddit.com/r/Vermintide/comments/ibfx2n/the_biggest_changes_and_additions_since_release/',
                description: ''
            },
            {
                title: 'Everything You Wish Fatshark Told You',
                url: 'https://www.reddit.com/r/Vermintide/comments/90qola/a_list_of_everything_you_wish_fatshark_told_you/',
                description: ''
            },
            {
                title: 'Vermintide 2 New & Returning Player FAQ',
                url: 'https://www.reddit.com/r/Vermintide/comments/f6d0wm/vermintide_22_returning_new_players_faq/',
                description: ''
            },
        ],
    },
    {
        title: 'Vermintide 1 Resources',
        links: [{
                title: 'Vermintide 1 Wiki',
                url: 'https://vermintide.gamepedia.com/Vermintide_Wiki',
                description: ''
            },
            {
                title: 'Ubersreik Survival Manual',
                url: 'https://www.reddit.com/r/Vermintide/comments/7j2nr1/community_challenge_verminscribes_1_voting/',
                description: ''
            },
            {
                title: 'Weapon Damage & Stats',
                url: 'https://docs.google.com/spreadsheets/d/1h3GnI6sIS77oXnCzE05k7KTkOoGJ3UezeVi24miBBoM/edit#gid=1035311592',
                description: ''
            },
            {
                title: 'User Guides, Tools, and Resources Index',
                url: 'https://www.reddit.com/r/Vermintide/wiki/index',
                description: ''
            },
            {
                title: 'Grimalackt\'s QoL Mods',
                url: 'https://www.reddit.com/r/Vermintide/comments/7vk92o/110_quality_of_life_modpack_v15_cheatfree_w/',
                description: ''
            },
            {
                title: 'Verminitde Mod Framework (VMF)',
                url: 'https://www.reddit.com/r/Vermintide/comments/7aua2w/vermintide_mod_framework_0180_no_cheat_version/',
                description: ''
            },
        ]
    },
    {
        title: 'Console Resources',
        links: [{
                title: 'Cataclysm Enemy Health Pools',
                url: 'https://www.reddit.com/r/Vermintide/comments/geqhx0/xbox_enemy_health_pools_cata/',
                description: ''
            },
            {
                title: 'Vermintide Exterminators United (Xbox Club)',
                url: 'https://account.xbox.com/en-US/clubs/profile?clubid=3379865725306954',
                description: ''
            },
            {
                title: 'PS4 Master Resource List',
                url: 'https://www.reddit.com/r/Vermintide/comments/aeehqd/ps4_master_resource_list/',
                description: ''
            },
        ]
    },
    {
        title: 'Related Subreddits',
        links: [{
                title: 'Vermintide LFG',
                url: 'https://www.reddit.com/r/VermintideLFG/',
                description: ''
            },
            {
                title: 'Darktide',
                url: 'https://www.reddit.com/r/DarkTide/',
                description: ''
            },
            {
                title: 'Warhammer',
                url: 'https://www.reddit.com/r/warhammer/',
                description: ''
            },
            {
                title: 'Warhammer 40k',
                url: 'https://www.reddit.com/r/Warhammer40k/',
                description: ''
            },
            {
                title: 'Warhammer Fantasy',
                url: 'https://www.reddit.com/r/WarhammerFantasy/',
                description: ''
            },
        ],
    },
    {
        title: 'Discord Communities',
        links: [{
                title: 'Shark Crew',
                url: 'https://discord.com/invite/yNPwa57',
                description: 'A Fatshark community discord dedicated to Vermintide, Warhammer content, and similar PVE material. Many North America Vermintide players here so come join us!'
            },
            {
                title: 'Blood Moon Inn',
                url: 'https://discord.gg/jk7xPCBcHA',
                description: 'Vermintide community Discord. A tavern for both new and veteran players. Thousands upon thousands of players. REEEEE!'
            },
            {
                title: 'Red Moon Inn',
                url: 'https://discord.gg/kR62Je5QSn',
                description: 'The Red Moon Inn is where players of all skill levels can play together and exchange tips & tricks. We don\'t take ourselves too seriously so come and enjoy the ride!'
            },
            {
                title: 'Squirrel Squad',
                url: 'https://discord.gg/NeTZxZ7',
                description: 'A community of enthusiastic, passionate, and friendly folks who just love Vermintide. First and foremost, we promote productive conversation and an avenue for new players to find others to play with.'
            },
            {
                title: 'Vermintide Modders',
                url: 'https://discord.gg/GAQMw4W',
                description: 'The place for everyone into modding any of the Vermintide games. Like their description states: It\'s the definitive place to find helpful modding resources, advice, and the latest modding-related news.'
            },
            {
                title: 'VT Modded Community',
                url: 'https://discord.gg/eUtYqpa',
                description: 'A server for growing modded as a whole and collect, share and gather knowledge about any kind of modded content. Great place to discuss and ask questions regarding True Solos, Onslaught, Deathwish, etc.'
            },
        ]
    }
];
</script>

<style>
a {
    color: #c15b24;
}

.link-container {
    box-shadow: inset 0px 8px 10px 0px #000000;
    padding: 16px 20px
}

.label {
    font-size: 1.4rem;
}

.link-container {
    font-size: 1.1rem;
    max-width: 320px;
}

div.flex>div {
    align-self: flex-start;
}
</style>

<div id="page">
    <div class="flex flex-wrap gap-5">
        {#each resources as { title, links }}
        <div class="border-13 background-22">
            <h2 class="label label-15">{title}</h2>
            <div class="link-container">
                {#each links as { title, url, description }}
                <p><a href={url}>{title}</a></p>
                {#if description}
                <p>{description}</p>
                {/if}
                {/each}
            </div>
        </div>
        {/each}
    </div>
</div>