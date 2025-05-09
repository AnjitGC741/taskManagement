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
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const connectionUrl = env_1.default.connectionString;
    if (connectionUrl) {
        try {
            yield mongoose_1.default.connect(connectionUrl);
            console.log('Connected to database successfully.');
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        console.log('Please provide MongoDB Connection URL');
    }
});
exports.connectToDB = connectToDB;
