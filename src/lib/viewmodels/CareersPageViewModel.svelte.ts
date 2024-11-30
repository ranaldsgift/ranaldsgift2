class CareersPageViewModel {
	careerStats: { heroId: number; careerId: number; name: string; count: number; percentageOfTotal: number }[] | null = null;
	heroStats: { heroId: number; name: string; count: number; percentageOfTotal: number }[] | null = null;
	totalBuilds: number | null = null;
}

export default CareersPageViewModel;
