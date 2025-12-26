# 統合タスク・工数管理基盤 (PoC)

全社横断のタスクと工数を統合・可視化するための PoC 向けサンプルです。現行ツール (Asana / ClickUp / Monday.com など) から集約したデータを、統合ダッシュボードで表示します。

## 構成

- `backend/`: TypeScript + Node.js (Express) API
- `frontend/`: TypeScript + React (Vite) ダッシュボード UI

## ローカル起動

### バックエンド

```bash
cd backend
npm install
npm run dev
```

API は `http://localhost:4000` で起動します。

### フロントエンド

```bash
cd frontend
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

## 主要 API

- `GET /api/overview`: KPI サマリ
- `GET /api/tasks`: タスク一覧
- `GET /api/workload`: 忙しさヒートマップ用データ
