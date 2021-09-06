import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateResponse, generateResponseForError } from '../utils/responseUtils';
import log from 'lambda-log';
import { SponsorService } from '../service/sponsorService';
import { LambdaError } from "../types/index";

const sponsorService: SponsorService = new SponsorService();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const sponsors = await sponsorService.getSponsors();
        return generateResponse(200, JSON.stringify(sponsors));
    } catch (err) {
        log.error(`Error getting sponsors: ${JSON.stringify(err)}`);
        return generateResponseForError(err as LambdaError);
    }
};
