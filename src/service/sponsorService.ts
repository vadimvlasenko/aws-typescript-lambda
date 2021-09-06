import {CreateSponsorModel, SponsorModel} from '../types';

export class SponsorService {

    constructor() {
    }

    public async createSponsor(params: CreateSponsorModel): Promise<SponsorModel> {
        return {
            id: "1",
            name: "test"
        }
    }

    public async getSponsors(): Promise<SponsorModel[]> {
        return [
            {
                id: "1",
                name: "test"
            }
        ]
    }
}
