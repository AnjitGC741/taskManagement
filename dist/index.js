"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./src/config/env"));
const dbConnection_1 = require("./src/config/dbConnection");
const routes_1 = __importDefault(require("./src/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use('/api', routes_1.default);
    // app.use('*', (req, res) => {
    //     res.status(404).json({ message: 'Path not found' });
    // });
    app.listen(env_1.default.port, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, dbConnection_1.connectToDB)();
        console.log("Sever is running on PORT:" + env_1.default.port);
    }));
    process.on('SIGINT', () => {
        console.log('Shutting down server gracefully...');
        process.exit();
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.log(JSON.stringify({ message: `Unhandled Rejection at:,${promise}`, error: reason }));
    });
    process.on('uncaughtException', error => {
        console.log(JSON.stringify({ message: `Uncaught Exception:,  ${error}` }));
    });
}))();
