import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
app.use(cors());
app.use(express.json());

const tasks = [
  {
    id: "TSK-1001",
    externalSystem: "Asana",
    externalId: "asana-123",
    name: "顧客データ統合設計",
    assignee: "佐藤",
    dueDate: "2024-06-28",
    status: "In Progress",
    project: "統合基盤",
    department: "システム部",
    estimatedHours: 24,
    actualHours: 12,
    updatedAt: "2024-06-15T09:00:00Z"
  },
  {
    id: "TSK-1002",
    externalSystem: "ClickUp",
    externalId: "clickup-55",
    name: "部門別APIヒアリング",
    assignee: "田中",
    dueDate: "2024-06-20",
    status: "At Risk",
    project: "統合基盤",
    department: "管理部門",
    estimatedHours: 10,
    actualHours: 9,
    updatedAt: "2024-06-14T10:15:00Z"
  }
];

const workload = [
  { member: "佐藤", week: "2024-W25", utilization: 0.72 },
  { member: "佐藤", week: "2024-W26", utilization: 0.95 },
  { member: "田中", week: "2024-W25", utilization: 0.88 },
  { member: "田中", week: "2024-W26", utilization: 1.12 }
];

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.get("/api/overview", (_req: Request, res: Response) => {
  const totalTasks = tasks.length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const overdue = tasks.filter((task) => new Date(task.dueDate) < new Date()).length;
  const overBudget = tasks.filter((task) => task.actualHours > task.estimatedHours).length;

  res.json({ totalTasks, inProgress, overdue, overBudget });
});

app.get("/api/tasks", (_req: Request, res: Response) => {
  res.json(tasks);
});

app.get("/api/workload", (_req: Request, res: Response) => {
  res.json(workload);
});

app.listen(4000, () => {
  console.log("API server running on http://localhost:4000");
});
