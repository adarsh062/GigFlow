import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Clock, Briefcase } from 'lucide-react';
import ProposalCard from '../components/ProposalCard';
import ProposalForm from '../components/ProposalForm';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Gig
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/gigs/${id}`);
        setGig(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchGig();
  }, [id]);


  useEffect(() => {
    if (currentUser && gig && currentUser._id === gig.userId) {
      const fetchBids = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bids/${id}`, { withCredentials: true });
          setBids(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchBids();
    }
  }, [gig, currentUser, id]);


  const onProposalSubmit = async (data) => {
    if (!currentUser) return navigate("/login");
    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/bids`,
        { gigId: id, price: data.price, message: data.message },
        { withCredentials: true }
      );
      toast.success("Proposal submitted successfully!");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting bid");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHire = async (bidId) => {
    if (!window.confirm("Are you sure you want to hire this freelancer?")) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/bids/hire`,
        { gigId: id, bidId },
        { withCredentials: true }
      );
      toast.success("Freelancer Hired!");
      window.location.reload();
    } catch (err) {
      toast.error("Hiring failed");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  if (!gig) return <div className="min-h-screen flex items-center justify-center text-red-500">Gig not found.</div>;

  const isOwner = currentUser?._id === gig.userId;
  const isAssigned = gig.status === "assigned";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Jobs
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className={`grid gap-10 ${isOwner ? "grid-cols-1" : "lg:grid-cols-12"}`}>
          <div className={isOwner ? "col-span-1" : "lg:col-span-7"}>
            <div className="bg-white p-8 rounded-2xl border shadow-sm mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${!isAssigned ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                  {!isAssigned ? "Open" : "Closed"}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Posted {new Date(gig.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                {gig.title}
              </h1>

              <div className="prose max-w-none text-gray-600">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About the Job</h3>
                <p className="whitespace-pre-line leading-relaxed text-lg">
                  {gig.description}
                </p>
              </div>
            </div>

            {isOwner && (
              <div className="bg-white p-8 rounded-2xl border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Proposals ({bids.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {bids.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed rounded-xl text-gray-500">
                      No proposals received yet.
                    </div>
                  ) : (
                    bids.map((bid) => (
                      <ProposalCard
                        key={bid._id}
                        proposal={bid}
                        onHire={handleHire}
                        isOwner={isOwner}
                        isAssigned={isAssigned}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {!isOwner && (
            <div className="lg:col-span-5">
              <div className="sticky top-6 space-y-6">

                <div className="rounded-2xl border bg-white p-8 shadow-lg">
                  <div className="mb-8 text-center">
                    <p className="text-sm text-gray-500 font-medium mb-2">Project Budget</p>
                    <div className="text-4xl font-extrabold text-gray-900">
                      ${gig.budget} <span className="text-base text-gray-500">USD</span>
                    </div>
                  </div>

                  {isAssigned ? (
                    <div className="bg-gray-100 rounded-xl p-6 text-center">
                      <h3 className="font-bold text-gray-900">Position Filled</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        This job is no longer accepting proposals.
                      </p>
                    </div>
                  ) : currentUser ? (
                    <ProposalForm
                      onSubmit={onProposalSubmit}
                      maxBudget={gig.budget}
                      loading={submitting}
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Log in to submit a proposal
                      </p>
                      <Link
                        to="/login"
                        className="block w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition"
                      >
                        Sign In to Apply
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default GigDetails;
