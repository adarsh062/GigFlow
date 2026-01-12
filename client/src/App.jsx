import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddGig from "./pages/AddGig";
import GigDetails from "./pages/GigDetails";
import Dashboard from "./pages/Dashboard";
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

function App() {
  const { currentUser } = useSelector(state => state.user);
  useEffect(() => {
    if (currentUser) {
      socket.emit("setup", currentUser._id);
      socket.on("notification", (data) => {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } fixed inset-0 z-50 flex items-center justify-center bg-black/40`}>
            <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl border border-gray-200 p-6 relative animate-scaleIn">
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Notification</h3>
              <p className="text-gray-600 text-center mb-6">{data.message}</p>
              <div className="flex justify-center">
                <button onClick={() => toast.dismiss(t.id)} className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition active:scale-95">OK</button>
              </div>
              <button onClick={() => toast.dismiss(t.id)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">✕</button>
            </div>
          </div>
        ), {
          duration: 8000,
          position: "center", 
        });
      });
    }

    return () => {
      socket.off("notification");
    };
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddGig />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gig/:id" element={<GigDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
