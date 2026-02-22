Vibely Connect
Vibely Connect is a modern, full-stack social media platform featuring real-time communication, short-form video content ("Loops"), and a sleek, media-centric user experience.

🚀 Tech Stack
Frontend: React 19, Redux Toolkit, Tailwind CSS v4, Socket.io-client, Axios, React Router v7.
Backend: Node.js, Express, MongoDB (Mongoose), Socket.io, JWT, Cloudinary, Nodemailer.
Hosting: Vercel (Frontend), Render (Backend).
✨ Key Features
Real-Time Interactivity: Instant messaging, live notifications, and real-time online status tracking powered by Socket.io.
Media-Rich Content: Support for image and video posts, ephemeral Stories, and short-form "Loops" (video) with high-performance playback.
Robust Social Engine: Advanced follow/unfollow system, dynamic feed generation, interactive likes, and nested commenting.
Secure Authentication: JWT-based session management with secure cross-site cookies and OTP-based password recovery via email.
Modern UI/UX: Responsive glassmorphism design built with Tailwind CSS v4, featuring custom animations and seamless page transitions.
🛠️ Installation & Setup
Prerequisites
Node.js (v18+)
MongoDB Atlas account
Cloudinary account (for media storage)
Backend Setup
Navigate to the backend folder.
Create a .env file based on .env.example.
Install dependencies: npm install
Start development server: npm run dev
Frontend Setup
Navigate to the frontend folder.
Create a .env file with VITE_SERVER_URL=http://localhost:8000.
Install dependencies: npm install
Start development server: npm run dev
📡 API Endpoints
/api/auth: Signup, Signin, Signout, OTP verification.
/api/user: Profiles, search, follow system, notifications.
/api/post: Media uploads, feed retrieval, likes, comments.
/api/loop: Short-form video management.
/api/message: Real-time chat history.
/api/story: Story uploads and viewer tracking.
