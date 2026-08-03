# Docker Setup & Usage Guide for ChronicleArcade

This project is fully containerized using **Docker** and **Docker Compose**. It orchestrates three services:
1. **Frontend**: React + Vite (Served via Nginx on port `5173`)
2. **Backend**: Node.js + Express API (Running on port `5174`)
3. **Database**: MongoDB 7.0 (Running on port `27017`)

---

## 📋 Prerequisites
- Ensure **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** is installed and running on your machine.

---

## 🚀 How to Run the Application

### 1. Build and Start All Services
From the root folder of the project, run:
```bash
docker-compose up --build
```
> **Tip**: Add `-d` to run in detached (background) mode:
> ```bash
> docker-compose up --build -d
> ```

### 2. Access the Application
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5174` (Health check: `http://localhost:5174/`)
- **MongoDB Connection**: `mongodb://localhost:27017/myArcade`

---

## 🛑 How to Stop the Application

To stop all running containers:
```bash
docker-compose down
```

To stop containers **and remove persistent volumes** (resets MongoDB database):
```bash
docker-compose down -v
```

---

## 📊 Useful Docker Commands

- **View Logs for All Services**:
  ```bash
  docker-compose logs -f
  ```

- **View Logs for Specific Service**:
  ```bash
  docker-compose logs -f backend
  docker-compose logs -f frontend
  docker-compose logs -f mongo
  ```

- **Rebuild a Specific Container**:
  ```bash
  docker-compose build backend
  ```

---

## 📁 Container Architecture

- `docker-compose.yml`: Main orchestration file for all 3 services.
- `backend/Dockerfile`: Node.js Express server environment.
- `ChronicleArcade/Dockerfile`: Multi-stage build (Vite build + Nginx server).
- `mongo_data` volume: Persists MongoDB database data on your hard drive.
- `backend_uploads` volume: Persists user upload files on your hard drive.
