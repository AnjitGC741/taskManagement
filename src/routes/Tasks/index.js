"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const TaskRouter = (0, express_1.Router)({ mergeParams: true });
TaskRouter.route('/create').post(controller_1.default.create);
TaskRouter.put('/task/:id', controller_1.default.update);
TaskRouter.delete('/task/:id', controller_1.default.delete);
TaskRouter.patch('/task/status/:id', controller_1.default.updateStatus);
TaskRouter.get('/task/:id', controller_1.default.getById);
TaskRouter.get('/task', controller_1.default.getAll);
exports.default = TaskRouter;
