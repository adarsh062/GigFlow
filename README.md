# 🚀 GigFlow - Freelance Marketplace Platform

![GigFlow Banner](https://placehold.co/1200x300/6366f1/ffffff?text=GigFlow+Marketplace)

## 🔗 Live Links
- **Frontend Deployment:** [https://gigflow-project.vercel.app/](https://gigflow-project.vercel.app/)
- **Backend API:** [https://gigflow-x1ph.onrender.com/](https://gigflow-x1ph.onrender.com/)
- **Demo Walkthrough (Loom):** [Watch Video](https://www.loom.com/share/06a2636cd8e343ed9a48082dc5f373a0)

---

**GigFlow** is a sophisticated, full-stack freelance marketplace engineered to bridge the gap between clients and top-tier freelancers. Built on the robust **MERN stack**, it introduces a fluid role architecture, real-time engagement features, and high-integrity transaction management.

> This project demonstrates enterprise-level full-stack development patterns, including **ACID-compliant database transactions**, **WebSocket-based real-time communication**, and **HTTP-only secure authentication**.

---

## ✨ Key Features

### 🔒 Core Functionality
- **Fluid Role Architecture:** A unified account system allowing users to dynamically switch between **Client** (hiring) and **Freelancer** (service) modes without managing multiple credentials.
- **Comprehensive Job Lifecycle:**
  - **Clients:** create detailed listings, set budget parameters, and vet applicants.
  - **Freelancers:** Access curated opportunities, submit innovative proposals, and track application pipelines.
- **Command Center Dashboard:** A centralized hub for managing active workflows, monitoring job status, and configuring user profiles.

### 🚀 Technical Excellence
- **Real-Time Event Engine:** Powered by **Socket.io** to deliver sub-second notifications (e.g., immediate hiring alerts) for a seamless user experience.
- **Data Integrity & Safety:** Implements **MongoDB Sessions & Transactions** to guarantee atomicity in critical operations, preventing concurrency issues like double-booking.
- **Bank-Grade Security:** robust JWT authentication strategy utilizing **HttpOnly cookies** to mitigate XSS vulnerabilities and secure session state.
- **State Architecture:** Leverages **Redux Toolkit** for predictable, scalable, and efficient global state management across the application.

---

## 🛠️ Technology Stack

### Frontend Ecosystem
- **Core Framework:** [React.js](https://reactjs.org/) (Vite)
- **Styling Engine:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons & UI:** [Lucide React](https://lucide.dev/)
- **Network Layer:** Axios
- **Feedback Systems:** React Hot Toast

### Backend Infrastructure
- **Runtime Environment:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Real-Time Protocol:** [Socket.io](https://socket.io/)
- **Security:** JWT (JSON Web Tokens) & Bcryptjs

---

## 📂 Project Structure

```bash
GigFlow/
├── client/           # Frontend React Application
│   ├── src/
│   │   ├── components/  # Atomic, reusable UI components
│   │   ├── pages/       # Route-level views
│   │   └── redux/       # Global state slices
│   └── ...
├── server/           # Backend Node.js API
│   ├── models/       # Database schemas & definitions
│   ├── routes/       # API route handlers
│   ├── controllers/  # Core business logic
│   └── ...
└── README.md         # Documentation
```

---

## ⚡ Getting Started

Follow these instructions to set up the development environment.

### Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** (Local instance or Atlas connection)

### 1. Clone the Repository
```bash
git clone https://github.com/adarsh062/GigFlow.git
cd GigFlow
```

### 2. Environment Configuration (CRITICAL)
Before running the application, you must configure the environment variables for both the backend and frontend.

#### 🟢 Backend Configuration
Navigate to the `server` folder and create a `.env` file.
```bash
cd server
cp .env.example .env
```
Populate `.env` with your secure credentials:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

#### 🔵 Frontend Configuration
Navigate to the `client` folder and create a `.env` file.
```bash
cd ../client
cp .env.example .env
```
**⚠️ Important Definition for `VITE_API_URL`:**
This variable determines where the frontend sends API requests.

- **For Local Development:**
  Set it to your local backend server.
  ```env
  VITE_API_URL=http://localhost:5000
  ```

- **For Production (e.g., Vercel):**
  You **must** override this variable in your deployment dashboard (e.g., Vercel Settings > Environment Variables). Set it to your deployed backend URL.
  ```env
  VITE_API_URL=https://gigflow-x1ph.onrender.com
  ```

---

### 3. Installation & Running

#### 🟢 Start Backend
Return to the server directory, install dependencies, and start the server.
```bash
cd ../server # If currently in client
npm install
npm run dev
# Server initializes on http://localhost:5000
```

#### 🔵 Start Frontend
Open a new terminal, navigate to the client directory, install dependencies, and launch the app.
```bash
cd client
npm install
npm run dev
# Application launches at http://localhost:5173
```

---

Project Link: [https://github.com/adarsh062/GigFlow](https://github.com/adarsh062/GigFlow)