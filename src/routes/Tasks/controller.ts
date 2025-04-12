import { status } from './../../enum/status.enum';
import { Request, Response } from "express";
import { Task } from "./model";
import { taskSchema } from "./validator";
import { TaskType } from './types';


const TaskController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { error } = taskSchema.validate(req.body);
      if (error) res.status(400).json({ message: error.details[0].message });
      const { title, description, status } = req.body;
      
      const newTask = await Task.create({
        title,
        description,
        status
      });
      res.status(201).json({messsage: "Task created successfully"});
    } catch (e) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const task = await Task.findById(req.params.id);
      if (!task)  res.status(404).json({ message: "Task not found" });

      res.status(200).json({task});
    } catch (e) {
      res.status(500).json({ message: "Server Error" });
    }
  },
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = '1',
        limit = '10',
        sort = 'createdAt',
        order = 'desc',
        status,
      } = req.query;
  
      const pageNum = Math.max(1, parseInt(page as string, 10));
      const limitNum = Math.max(1, parseInt(limit as string, 10));
  
      const filter: any = {};
      if (status) filter.status = status;
  
      const tasks = await Task.find(filter)
        .sort({ [sort as string]: order === 'asc' ? 1 : -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);
  
      const total = await Task.countDocuments(filter);
  
      res.status(200).json({
        data: tasks,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
        },
      });
    } catch (e) {
      console.error('Error in getAll:', e);
      res.status(500).json({ message: 'Server Error' });
    }
  },
  
  async update(req: Request, res: Response):Promise<void> {
    try {
      const { error } = taskSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedTask)
         res.status(404).json({ message: "Task not found" });

      res.status(200).json({message:'Task updated successfully'});
    } catch (e) {
      res.status(500).json({ message: "Server Error" });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask)
        res.status(404).json({ message: "Task not found" });

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (e) {
      res.status(500).json({ message: "Server Error" });
    }
  },
  async updateStatus(req: Request, res: Response) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );

      if (!updatedTask)
        res.status(404).json({ message: "Task not found" });

      res.status(200).json({message:'updated status successfully.'});
    } catch (e) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};

export default TaskController;
