import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateBadRequestResponse, generateResponse, generateResponseForError } from '../utils/responseUtils';
import log from 'lambda-log';
import { SponsorService} from '../service/sponsorService';
import { CreateSponsorModel } from "../types";
import { LambdaError } from "../types/index";
import { extractBody, validate } from '../utils/requestUtils';
import { createSponsorParams } from '../utils/guards';

const sponsorService: SponsorService = new SponsorService();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const parsedBody: CreateSponsorModel | null = extractBody<CreateSponsorModel>(event.headers, event.body || '');
        if (!parsedBody) return generateBadRequestResponse('Params have invalid format');

        const validatedBody = validate<CreateSponsorModel>(parsedBody || {}, createSponsorParams);
        if (!validatedBody) return generateBadRequestResponse('Invalid request params');

        const sponsor = await sponsorService.createSponsor(validatedBody);
        return generateResponse(200, JSON.stringify(sponsor));
    } catch (err) {
        log.error(`Error creating sponsor: ${JSON.stringify(err)}`);
        return generateResponseForError(err as LambdaError);
    }
};
