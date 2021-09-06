import { BadRequestError, InternalError, DatabaseError, NotFoundError } from './errors';

declare type LambdaError = NotFoundError | BadRequestError | InternalError | DatabaseError;
