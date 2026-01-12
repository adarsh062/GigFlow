import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import GigCard from '../components/GigCard';
import { PlusCircle, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [myGigs, setMyGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchMyGigs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/gigs/my`, {
                    withCredentials: true
                });
                setMyGigs(res.data);
            } catch (err) {
                console.log("Error fetching my gigs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyGigs();
    }, [currentUser, navigate]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <LayoutDashboard className="h-8 w-8 text-blue-600" />
                            My Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage your posted jobs and view their status.
                        </p>
                    </div>
                    <Link
                        to="/add"
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 
                        flex items-center gap-2 transition-colors">
                        <PlusCircle className="h-5 w-5" />
                        Post New Job
                    </Link>
                </div>

                {myGigs.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {myGigs.map((gig) => (
                            <GigCard key={gig._id} gig={gig} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 mb-4">
                            <PlusCircle className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Jobs Posted Yet</h3>
                        <p className="text-gray-500 mb-6">Create your first job post to find freelancers.</p>
                        <Link
                            to="/add"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Post a Job Now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
