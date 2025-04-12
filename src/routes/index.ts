import { Router } from "express";
import TaskRouter from "./Tasks";

const routes = Router();

routes.use('/',TaskRouter);

export default routes;