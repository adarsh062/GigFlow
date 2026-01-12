# 🚀 GigFlow - Freelance Marketplace Platform

![GigFlow Banner](https://placehold.co/1200x300/6366f1/ffffff?text=GigFlow+Marketplace)

**GigFlow** is a modern, full-stack freelance marketplace application designed to seamlessly connect clients with talented freelancers. Built with the **MERN stack**, it features a fluid role system, real-time interactions, and secure transaction management.

> This project showcases advanced full-stack capabilities including **database transactions**, **real-time WebSocket communication**, and **secure authentication patterns**.

---

## ✨ Key Features

### 🔒 Core Functionality
- **Fluid Role System:** Innovative single-account architecture allowing users to switch seamlessly between **Client** (hiring) and **Freelancer** (working) modes.
- **Advanced Job Management:**
  - **Clients:** Post detailed job listings, define budgets, and review applicants.
  - **Freelancers:** Browse tailored opportunities, submit proposals, and track application status.
- **Smart Dashboard:** A centralized command center for managing active gigs, posted jobs, and profile settings.

### 🚀 Technical Highlights
- **Real-Time Notifications:** Integrated **Socket.io** to deliver instant alerts (e.g., "You've been hired!") without page refreshes.
- **Transactional Integrity:** Utilizes **MongoDB Sessions & Transactions** to ensure data consistency and prevent race conditions (e.g., preventing double-hiring for a single slot).
- **Secure Authentication:** Robust JWT-based authentication system using **HttpOnly cookies** to prevent XSS attacks and ensure session security.
- **Optimized State Management:** Powered by **Redux Toolkit** for efficient, centralized, and predictable application state control.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React.js](https://reactjs.org/) (via Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
- **Real-Time Engine:** [Socket.io](https://socket.io/)
- **Authentication:** JWT (JSON Web Tokens) & Bcryptjs

---

## 📂 Project Structure

```bash
GigFlow/
├── client/           # Frontend React Application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application views
│   │   └── redux/       # State slices
│   └── ...
├── server/           # Backend Node.js API
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   └── ...
└── README.md         # Project documentation
```

---

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v14+ recommended)
- **MongoDB** (Local or Atlas connection string)

### 1. Clone the Repository
```bash
git clone https://github.com/adarsh062/GigFlow.git
cd GigFlow
```

### 2. Backend Setup
Navigate to the server directory and install dependencies.
```bash
cd server
npm install
```

**Configuration:**
Create a `.env` file in the `server` directory (or rename `.env.example`).
```bash
cp .env.example .env
```
Update `.env` with your credentials:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies.
```bash
cd ../client
npm install
```

Start the development server:
```bash
npm run dev
# Application will open at http://localhost:5173
```

Project Link: [https://github.com/adarsh062/GigFlow](https://github.com/adarsh062/GigFlow)