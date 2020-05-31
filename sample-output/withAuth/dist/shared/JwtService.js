"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const tslib_1 = require("tslib");
const randomstring_1 = tslib_1.__importDefault(require("randomstring"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const constants_1 = require("@shared/constants");
class JwtService {
    constructor() {
        this.VALIDATION_ERROR = 'JSON-web-token validation failed.';
        this.secret = (process.env.JWT_SECRET || randomstring_1.default.generate(100));
        this.options = { expiresIn: constants_1.cookieProps.options.maxAge.toString() };
    }
    getJwt(data) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign(data, this.secret, this.options, (err, token) => {
                err ? reject(err) : resolve(token);
            });
        });
    }
    decodeJwt(jwt) {
        return new Promise((res, rej) => {
            jsonwebtoken_1.default.verify(jwt, this.secret, (err, decoded) => {
                return err ? rej(this.VALIDATION_ERROR) : res(decoded);
            });
        });
    }
}
exports.JwtService = JwtService;
