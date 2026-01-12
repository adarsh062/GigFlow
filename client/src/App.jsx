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
            } max-w-sm w-full bg-white shadow-lg rounded-xl pointer-events-auto border border-gray-200`}
          >
            <div className="p-4">
              <div className="flex items-start">
                
                {/* Left Indicator */}
                <div className="flex-shrink-0">
                  <div className="h-3 w-3 mt-1 rounded-full bg-blue-500"></div>
                </div>

                {/* Content */}
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Notification
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {data.message}
                  </p>
                </div>

                {/* Close Button */}
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="inline-flex text-gray-400 hover:text-gray-600 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        ), {
          duration: 8000,
          position: "top-right",
        });
      });
    }

    // Cleanup
    return () => {
      socket.off("notification");
    };
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" />
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
