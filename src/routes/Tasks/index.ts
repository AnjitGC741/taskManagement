import { Router } from "express"
import TaskController from "./controller";

const TaskRouter = Router({mergeParams:true});
TaskRouter.route('/create').post(TaskController.create);
TaskRouter.put('/task/:id', TaskController.update);
TaskRouter.delete('/task/:id', TaskController.delete);
TaskRouter.patch('/task/status/:id', TaskController.updateStatus);
TaskRouter.get('/task/:id', TaskController.getById);
TaskRouter.get('/task', TaskController.getAll);

export default TaskRouter;