# Docker Setup & Usage Guide for ChronicleArcade

This project is fully containerized using **Docker** and **Docker Compose**, supporting **Instant Live Hot-Reloading (HMR)** for active development!

---

## 🏗️ Services Overview
1. **Frontend**: React + Vite Dev Server with HMR (Port `5173`)
2. **Backend**: Node.js Express API with `node --watch` live reloading (Port `5174`)
3. **Database**: MongoDB 7.0 (Port `27017`)

---

## ⚡ Instant Hot-Reloading (Development Mode)

With volume mounts enabled:
- **Frontend**: Edit any `.jsx` or `.css` file in `ChronicleArcade/src/` and save. The browser updates **instantly** without reloading or rebuilding containers!
- **Backend**: Edit any `.js` file in `backend/` and save. Node Express automatically reboots in **less than 1 second**!

---

## 🚀 How to Run

### Start Development Server with Hot-Reloading:
```bash
docker-compose up --build
```

### Access URLs:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5174`
- **MongoDB**: `mongodb://localhost:27017/myArcade`

---

## 🛑 How to Stop
```bash
docker-compose down
```
