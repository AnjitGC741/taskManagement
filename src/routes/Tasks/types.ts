import { status } from "../../enum/status.enum";

export interface TaskType {
    title: string;
    description: string;
    status: status; 
    createdAt: Date;
  }