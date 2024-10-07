export const ROOT_API_URL = "/v2-api";
export const NUMBER_OF_CAREERS = 20;
export const NUMBER_OF_HEROES = 5;
export const NUMBER_OF_TALENT_TIERS = 6;
export const NUMBER_OF_TALENTS = 30;
export const SORT_ORDER_CAREER_IDS = [1, 2, 3, 16, 4, 5, 6, 17, 7, 8, 9, 18, 10, 11, 12, 19, 13, 14, 15, 20];
export const ROOT_PAGE_TITLE = "ranalds.gift | Holy Sigmar, bless this ravaged website";
export const ROOT_PAGE_DESCRIPTION = "Your Resource for Vermintide 2 Builds, Mechanics and Gameplay Information";
export const META_IMAGE_URL = "/meta_image.png";
export const TALENT_LEVELS = [5, 10, 15, 20, 25, 30];
export const ONSLAUGHT_SERIES_DISCORD = "https://discord.gg/MS4vWSQrEh";
export const TWITCH_SPAWN_SIZE = {
	min: 100,
	max: 300,
	default: 100,
};
export const TWITCH_VOTE_TIME_TIMER = [15, 30, 45, 60, 75, 90];
export type TwitchVoteTimeType = (typeof TWITCH_VOTE_TIME_TIMER)[number];
export const TWITCH_VOTE_COOLDOWN = [5, 15, 30, 45, 60, 75, 90];
export type TwitchVoteCooldownType = (typeof TWITCH_VOTE_COOLDOWN)[number];
export const TWITCH_BLESSINGS = ["Enable Blessings", "Disables Item Blessings", "Disable All Blessings"] as const;
export type TwitchBlessingType = (typeof TWITCH_BLESSINGS)[number];
export const TWITCH_WEEKLY_EVENT_EFFECT_DURATION = [100, 150, 200];
export type TwitchWeeklyEventEffectDurationType = (typeof TWITCH_WEEKLY_EVENT_EFFECT_DURATION)[number];

export const TALENT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export type TalentNumberType = (typeof TALENT_NUMBERS)[number];
