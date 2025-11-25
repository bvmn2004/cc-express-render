"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseType {
    constructor(data) {
        this.data = data;
    }
    success() {
        this.message = 'Internal Server Success';
        this.code = 200;
        return this;
    }
    error() {
        this.message = 'Internal Server Error',
            this.code = 400;
        return this;
    }
}
exports.default = ResponseType;
//# sourceMappingURL=response-type.util.js.map