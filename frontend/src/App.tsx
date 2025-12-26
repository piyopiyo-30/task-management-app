import { useEffect, useState } from "react";

type Overview = {
  totalTasks: number;
  inProgress: number;
  overdue: number;
  overBudget: number;
};

type Task = {
  id: string;
  externalSystem: string;
  externalId: string;
  name: string;
  assignee: string;
  dueDate: string;
  status: string;
  project: string;
  department: string;
  estimatedHours: number;
  actualHours: number;
  updatedAt: string;
};

type Workload = {
  member: string;
  week: string;
  utilization: number;
};

const API_BASE = "http://localhost:4000";

export default function App() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [workload, setWorkload] = useState<Workload[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/overview`).then((res) => res.json()),
      fetch(`${API_BASE}/api/tasks`).then((res) => res.json()),
      fetch(`${API_BASE}/api/workload`).then((res) => res.json())
    ]).then(([overviewData, taskData, workloadData]) => {
      setOverview(overviewData);
      setTasks(taskData);
      setWorkload(workloadData);
    });
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">全社タスク・工数統合管理基盤</p>
          <h1>統合ダッシュボード</h1>
        </div>
        <div className="status-chip">System Department PoC</div>
      </header>

      <section className="card-grid">
        <div className="card">
          <h2>全社タスク総数</h2>
          <p className="metric">{overview?.totalTasks ?? "-"}</p>
        </div>
        <div className="card">
          <h2>進行中タスク数</h2>
          <p className="metric">{overview?.inProgress ?? "-"}</p>
        </div>
        <div className="card">
          <h2>期限超過タスク数</h2>
          <p className="metric">{overview?.overdue ?? "-"}</p>
        </div>
        <div className="card">
          <h2>見積超過タスク数</h2>
          <p className="metric">{overview?.overBudget ?? "-"}</p>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>タスク一覧</h2>
          <p>外部ツールから統合された最新タスクのサンプル。</p>
        </div>
        <div className="table">
          <div className="table-row table-header">
            <span>タスク</span>
            <span>担当者</span>
            <span>期限</span>
            <span>ステータス</span>
            <span>見積/実績 (h)</span>
          </div>
          {tasks.map((task) => (
            <div className="table-row" key={task.id}>
              <div>
                <p className="task-title">{task.name}</p>
                <p className="task-meta">
                  {task.externalSystem} · {task.project} · {task.department}
                </p>
              </div>
              <span>{task.assignee}</span>
              <span>{task.dueDate}</span>
              <span className={`status ${task.status.replace(/\s/g, "-").toLowerCase()}`}>
                {task.status}
              </span>
              <span>
                {task.estimatedHours} / {task.actualHours}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>忙しさヒートマップ</h2>
          <p>メンバー × 期間の稼働率を色分け表示。</p>
        </div>
        <div className="heatmap">
          {workload.map((item) => (
            <div key={`${item.member}-${item.week}`} className="heatmap-cell">
              <span className="heatmap-label">{item.member}</span>
              <span className="heatmap-week">{item.week}</span>
              <div
                className="heatmap-bar"
                style={{
                  width: `${Math.min(item.utilization * 100, 120)}%`,
                  background:
                    item.utilization >= 1.1
                      ? "#ef4444"
                      : item.utilization >= 0.9
                      ? "#f59e0b"
                      : "#22c55e"
                }}
              />
              <span className="heatmap-value">
                {(item.utilization * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
