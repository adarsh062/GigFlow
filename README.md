# 🚀 GigFlow - Freelance Marketplace Platform

GigFlow is a full-stack MERN application connecting Clients with Freelancers. It features secure authentication, real-time hiring notifications, and robust job management.

This project was built as an internship assignment to demonstrate proficiency in **Full Stack Development, Database Transactions, and Real-time Communication.**

---

## ✨ Key Features

### 🔒 Core Features
- **Fluid Role System:** Client (Post Jobs) and Freelancer (Bid on Jobs) in one account.
- **Secure Authentication:** JWT-based auth using **HttpOnly Cookies**.
- **Gig Management:** Post jobs, budget tracking, and search functionality.
- **Dashboard:** Manage posted jobs and view status.

### 🏆 Bonus Implementations (Advanced)
- **1. Transactional Integrity:** Implemented **MongoDB Sessions** to prevent race conditions (Double Hiring).
- **2. Real-time Notifications:** Integrated **Socket.io** for instant "You are Hired" popups.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux Toolkit, Lucide Icons.
- **Backend:** Node.js, Express.js, Socket.io.
- **Database:** MongoDB (Mongoose).
- **Auth:** JWT (HttpOnly).

---

## ⚡ Quick Start Guide (All-in-One)

Follow these commands to setup and run the project completely.

```bash
# 1. Clone and Install Dependencies
git clone [https://github.com/adarsh062/GigFlow.git](https://github.com/adarsh062/GigFlow.git)
cd GigFlow

# Setup Backend
cd server
npm install
cp .env.example .env    # Creates .env file automatically
# IMPORTANT: Open server/.env file and update your MONGO_URI

# Setup Frontend
cd ../client
npm install

# 2. Run the Application (Open 2 Terminals)
# Terminal 1 (Backend): cd server && npm start
# Terminal 2 (Frontend): cd client && npm run dev