class ResponseType<T> {
    data: T;
    message?: string;
    code?: number;

    constructor(data: T) {
        this.data = data;
    }

    success(): this {
        this.message = 'Internal Server Success';
        this.code = 200;
        return this
    }

    error(): this {
        this.message = 'Internal Server Error',
            this.code = 400;
        return this;
    }
}

export default ResponseType;