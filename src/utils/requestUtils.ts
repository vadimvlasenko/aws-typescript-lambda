import { Decoder, guard } from 'decoders';
import log from 'lambda-log';
import { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';

export const validate = <T>(params: unknown, decoder: Decoder<T>): T | null => {
    try {
        const g = guard(decoder);
        return g(params);
    } catch (err) {
        log.error(`Error validating object: ${JSON.stringify(params)}, ${JSON.stringify(err)}`);
        return null;
    }
};

export function extractBody<T>(headers: APIGatewayProxyEventHeaders, body: string): T | null {
    try {
        return  JSON.parse(body);
    } catch (e) {
        return null;
    }
}

