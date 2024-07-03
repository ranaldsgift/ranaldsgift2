import { CareerBuild } from '$lib/entities/builds/CareerBuild.js';
import { DataHelper } from '$lib/helpers/DataHelper.js';
import { BuildPageViewModel } from '$lib/viewmodels/BuildPageViewModel.js';

export const load = (async (event) => {
    const { id } = event.params;

    let careerBuild: CareerBuild | null = null;

    // If the ID is a UUID, this is the new supabase user ID
    if (parseInt(id)) {
        careerBuild = await CareerBuild.findOne({ where: { id: parseInt(id) }});
    }
    // Otherwise, it's the old firebase user ID
    else {
        careerBuild = await CareerBuild.findOne({ where: { firebaseId: id }});
    }

    let viewModel = new BuildPageViewModel();
    viewModel.build = careerBuild;

    return {
        viewModel: DataHelper.serialize(viewModel)
    };
});