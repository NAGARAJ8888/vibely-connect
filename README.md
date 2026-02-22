# 🚀 Vibely Connect — Full-Stack Real-Time Social Media Platform

Vibely Connect is a production-ready, full-stack social media application built with a scalable architecture and real-time communication system.  

It supports media-rich content, short-form videos ("Loops"), instant messaging, and a dynamic personalized feed — designed with performance, scalability, and security in mind.

---

## 🌍 Live Deployment

Frontend (Vercel):  
Backend (Render):

---

## 🧠 Architecture Overview

The system follows a modular client-server architecture:

- **Frontend (SPA)** communicates with backend via REST APIs
- **Real-time communication layer** powered by Socket.io
- **JWT-based authentication** with secure HTTP-only cookies
- **Cloudinary CDN** for optimized media storage & delivery
- **MongoDB Atlas** for scalable document storage

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit (State Management)
- React Router v7
- Tailwind CSS v4
- Axios
- Socket.io-client

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Socket.io
- JWT Authentication
- Cloudinary (Media Storage)
- Nodemailer (Email Services)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## ✨ Core Functionalities

### 🔴 Real-Time System
- Instant messaging
- Live notification delivery
- Online/offline presence tracking
- WebSocket-based bidirectional communication

### 🎥 Media Engine
- Image & video posts
- Short-form vertical video system ("Loops")
- Ephemeral Stories (auto-expiring)
- Cloud-based optimized media storage
- Lazy loading & performance-optimized playback

### 👥 Social Graph Engine
- Follow/Unfollow system
- Personalized dynamic feed generation
- Like/Unlike functionality
- Nested comment threads
- Real-time engagement updates

### 🔐 Authentication & Security
- JWT-based session management
- Secure HTTP-only cookies
- OTP-based password recovery via email
- Route protection middleware
- Input validation & sanitization
- Password hashing (bcrypt)

---

## 📊 System Highlights (Interview-Ready Points)

- Designed scalable REST API structure with modular controllers.
- Implemented real-time chat system using Socket.io with user-room mapping.
- Built dynamic feed aggregation using MongoDB queries.
- Integrated CDN-based media storage via Cloudinary.
- Implemented secure authentication with token validation middleware.
- Optimized frontend performance using Redux state normalization.
- Designed responsive, mobile-first UI with Tailwind CSS v4.
- Structured project using separation of concerns (routes, controllers, services).

--
