import { useEffect, useState } from 'react';
import axios from 'axios';
import GigCard from '../components/GigCard';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, Briefcase } from 'lucide-react';

const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/gigs?search=${search}`);
        setGigs(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    const timeoutId = setTimeout(() => {
      fetchGigs();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-60" />
        </div>
        <div className="container relative mx-auto px-4 py-16 md:py-20 text-center">
          <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Find the perfect <span className="text-blue-600 relative">
              freelance services
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="mb-10 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Connect with talented freelancers, post jobs, and get work done efficiently.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
            <div className="relative w-full md:w-2/3 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search jobs (e.g. React Developer)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full h-14 pl-12 pr-4 rounded-full border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
              />
            </div>
            <Link 
              to="/add" 
              className="w-full md:w-auto h-14 px-8 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md active:scale-95"
            >
              <PlusCircle className="h-5 w-5" />
              Post a Job
            </Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12 pb-24" id="gigs">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900">Latest Gigs</h2>
          </div>
          <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 shadow-sm">
            {gigs.length} {gigs.length === 1 ? 'job' : 'jobs'} found
          </span>
        </div>
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gigs.map((gig) => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="p-4 bg-gray-50 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">No gigs found</h3>
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;