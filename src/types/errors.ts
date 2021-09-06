export class NotFoundError extends Error {
    public readonly kind: 'NotFound' = 'NotFound';
    private readonly _params?: { [key: string]: string };

    public constructor(message: string, params?: { [key: string]: string }) {
        super(message);
        this._params = params;
    }

    public get params(): { [key: string]: string } | undefined {
        return this._params;
    }
}

export class BadRequestError extends Error {
    public readonly kind: 'BadRequest' = 'BadRequest';
    private readonly _params?: { [key: string]: string };

    public constructor(message: string, params?: { [key: string]: string }) {
        super(message);
        this._params = params;
    }

    public get params(): { [key: string]: string } | undefined {
        return this._params;
    }
}

export class InternalError extends Error {
    public readonly kind: 'Internal' = 'Internal';
    private readonly _cause?: object;

    public constructor(message: string, cause?: object) {
        super(message);
        this._cause = cause;
    }

    public get cause(): object | undefined {
        return this._cause;
    }
}

export class DatabaseError extends Error {
    public readonly kind: 'DB' = 'DB';
    private readonly _cause?: object;

    public constructor(message: string, cause?: object) {
        super(message);
        this._cause = cause;
    }

    public get cause(): object | undefined {
        return this._cause;
    }
}
