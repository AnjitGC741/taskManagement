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
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const validator_1 = require("./validator");
const TaskController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = validator_1.taskSchema.validate(req.body);
                if (error)
                    res.status(400).json({ message: error.details[0].message });
                const { title, description, status } = req.body;
                const newTask = yield model_1.Task.create({
                    title,
                    description,
                    status
                });
                res.status(201).json({ messsage: "Task created successfully" });
            }
            catch (e) {
                res.status(500).json({ message: "Server Error" });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield model_1.Task.findById(req.params.id);
                if (!task)
                    res.status(404).json({ message: "Task not found" });
                res.status(200).json({ task });
            }
            catch (e) {
                res.status(500).json({ message: "Server Error" });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = '1', limit = '10', sort = 'createdAt', order = 'desc', status, } = req.query;
                const pageNum = Math.max(1, parseInt(page, 10));
                const limitNum = Math.max(1, parseInt(limit, 10));
                const filter = {};
                if (status)
                    filter.status = status;
                const tasks = yield model_1.Task.find(filter)
                    .sort({ [sort]: order === 'asc' ? 1 : -1 })
                    .skip((pageNum - 1) * limitNum)
                    .limit(limitNum);
                const total = yield model_1.Task.countDocuments(filter);
                res.status(200).json({
                    data: tasks,
                    pagination: {
                        total,
                        page: pageNum,
                        limit: limitNum,
                    },
                });
            }
            catch (e) {
                console.error('Error in getAll:', e);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = validator_1.taskSchema.validate(req.body);
                if (error) {
                    res.status(400).json({ message: error.details[0].message });
                }
                const updatedTask = yield model_1.Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedTask)
                    res.status(404).json({ message: "Task not found" });
                res.status(200).json({ message: 'Task updated successfully' });
            }
            catch (e) {
                res.status(500).json({ message: "Server Error" });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTask = yield model_1.Task.findByIdAndDelete(req.params.id);
                if (!deletedTask)
                    res.status(404).json({ message: "Task not found" });
                res.status(200).json({ message: "Task deleted successfully" });
            }
            catch (e) {
                res.status(500).json({ message: "Server Error" });
            }
        });
    },
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTask = yield model_1.Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
                if (!updatedTask)
                    res.status(404).json({ message: "Task not found" });
                res.status(200).json({ message: 'updated status successfully.' });
            }
            catch (e) {
                res.status(500).json({ message: "Server Error" });
            }
        });
    },
};
exports.default = TaskController;
