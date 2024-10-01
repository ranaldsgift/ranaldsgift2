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
const TwitchBlessings = ["Enable Blessings", "Disables Item Blessings", "Disable All Blessings"] as const;
export type TwitchBlessingType = (typeof TwitchBlessings)[number];
export const TWITCH_WEEKLY_EVENT_DURATION = [100, 150, 200];
export type TwitchWeeklyEventDurationType = (typeof TWITCH_WEEKLY_EVENT_DURATION)[number];
