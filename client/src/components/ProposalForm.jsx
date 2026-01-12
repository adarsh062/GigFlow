import { useState } from 'react';
import { DollarSign, Send } from 'lucide-react';

const ProposalForm = ({ onSubmit, maxBudget, loading }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!bidAmount) newErrors.bidAmount = "Bid amount is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({ price: bidAmount, message: coverLetter });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200"
    >
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Submit Your Proposal</h3>
        <p className="text-sm text-gray-500">
          Client Budget: <span className="font-semibold text-gray-900">${maxBudget}</span>
        </p>
      </div>

      {/* Bid */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Your Bid ($)</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="number"
            placeholder="Enter your bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className={`w-full pl-9 h-11 rounded-lg border bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.bidAmount ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {errors.bidAmount && <p className="text-sm text-red-500">{errors.bidAmount}</p>}
      </div>

      {/* Cover Letter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Cover Letter</label>
        <textarea
          placeholder="Explain why you're the best fit..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
      >
        {loading ? "Submitting..." : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Submit Proposal
          </>
        )}
      </button>
    </form>
  );
};

export default ProposalForm;
