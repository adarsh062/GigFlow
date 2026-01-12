import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeft, 
  FileText, 
  DollarSign, 
  CheckCircle 
} from 'lucide-react';

const AddGig = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const toastShown = useRef(false);
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });
  useEffect(() => {
    if (!currentUser) {
      if (!toastShown.current) {
        toast.error("Please login to post a job");
        toastShown.current = true;
      }
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Job title is required";
    if (!formData.description || formData.description.length < 20) newErrors.description = "Description must be at least 20 characters";
    if (!formData.budget) newErrors.budget = "Budget is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/gigs", 
        { 
          title: formData.title, 
          description: formData.description, 
          budget: formData.budget 
        },
        { withCredentials: true } 
      );
      setSubmitted(true);
      toast.success("Gig posted successfully!");
    } catch (err) {
      toast.error("Failed to post gig.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Job Posted Successfully!
            </h1>
            <p className="text-gray-500 mb-8 text-lg">
              Your job is now live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                View All Jobs
              </Link>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ title: "", description: "", budget: "" });
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Post Another Job
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!currentUser) return null;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Post a New Job
            </h1>
            <p className="text-gray-500 text-lg">
              Find the perfect freelancer for your project.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm space-y-8">
              
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-semibold text-gray-700">Job Title</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g., Build a React Website"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full pl-10 h-12 rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.title ? "border-red-500 focus:ring-red-200" : "border-gray-300"}`}
                  />
                </div>
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-semibold text-gray-700">Job Description</label>
                <textarea
                  id="description"
                  placeholder="Describe the project requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={8}
                  className={`w-full rounded-lg border bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${errors.description ? "border-red-500 focus:ring-red-200" : "border-gray-300"}`}
                />
                <div className="flex justify-between text-xs text-gray-400">
                  {errors.description ? <p className="text-red-500">{errors.description}</p> : <p>Minimum 20 characters</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-semibold text-gray-700">Budget (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={`w-full pl-10 h-12 rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.budget ? "border-red-500 focus:ring-red-200" : "border-gray-300"}`}
                  />
                </div>
                {errors.budget && <p className="text-sm text-red-500 mt-1">{errors.budget}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGig;