# Docker Setup & Usage Guide for ChronicleArcade

This project is fully containerized using **Docker** and **Docker Compose**, supporting **Instant Live Hot-Reloading (HMR)** and **Automatic Public Shareable URLs for Mobile Phones**!

---

## 🏗️ Services Overview
1. **Frontend**: React + Vite Dev Server with HMR (Port `5173`)
2. **Backend**: Node.js Express API with `node --watch` live reloading (Port `5174`)
3. **Database**: MongoDB 7.0 (Port `27017`)
4. **Tunnel**: Cloudflare Tunnel container (`cloudflare/cloudflared`) generating a public HTTPS link for remote phones anywhere!

---

## 📱 How to Get a Public Link for Mobile Phones (Directly in Docker)

Run Docker Compose:
```bash
docker-compose up
```

Look at the logs for **`chronicle_arcade_tunnel`**, or run:
```bash
docker-compose logs tunnel
```

You will see an auto-generated public HTTPS link like:
```text
https://random-name-here.trycloudflare.com
```

Share that link to **ANY phone anywhere in the world** to view your running Docker app live!

---

## 🚀 Commands Cheat Sheet

- **Start everything**: `docker-compose up`
- **Stop everything**: `docker-compose down`
- **View public tunnel URL**: `docker-compose logs tunnel`
