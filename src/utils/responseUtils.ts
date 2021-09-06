import { APIGatewayProxyResult } from 'aws-lambda';
import { LambdaError } from '../types/index';

export const generateResponse = (status: number, responseBody: string, headers = {}): APIGatewayProxyResult => {
    return {
        statusCode: status,
        headers: headers,
        body: responseBody,
    };
};

export const generateErrorResponse = (status: number, message: string): APIGatewayProxyResult => {
    return generateResponse(
        status,
        JSON.stringify({
            response: message,
        }),
    );
};

export const generateBadRequestResponse = (message: string): APIGatewayProxyResult => {
    return generateResponse(
        400,
        JSON.stringify({
            response: message,
        }),
    );
};

export const generateResponseForError = (error: LambdaError): APIGatewayProxyResult => {
    switch (error.kind) {
        case 'NotFound':
            return generateErrorResponse(404, error.message);
        case 'BadRequest':
            return generateErrorResponse(400, error.message);
        case 'DB':
            return generateErrorResponse(500, error.message);
        case 'Internal':
            return generateErrorResponse(500, error.message);
        default:
            return generateErrorResponse(500, 'Internal server error');
    }
};
