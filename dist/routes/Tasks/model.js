"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const status_enum_1 = require("../../enum/status.enum");
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        emum: Object.values(status_enum_1.status),
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Task = mongoose_1.default.model('Task', taskSchema);
