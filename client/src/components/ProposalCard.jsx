import { User, Calendar, CheckCircle } from 'lucide-react';

const ProposalCard = ({ proposal, onHire, isOwner, isAssigned }) => {
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div className={`rounded-xl border p-5 transition-all hover:shadow-md ${
      proposal.status === 'hired' 
        ? 'bg-green-50 border-green-500' 
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        
        {/* User */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              Freelancer ({proposal.freelancerId.slice(-4)})
            </h4>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              {formatDate(proposal.createdAt)}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-700 border border-green-200 font-bold px-3 py-1 rounded-full">
            ${proposal.price}
          </span>

          {proposal.status !== "pending" && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              proposal.status === "hired"
                ? "bg-green-600 text-white"
                : "bg-red-100 text-red-600"
            }`}>
              {proposal.status.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mt-4 rounded-lg bg-gray-50 p-4 border">
        <p className="text-sm text-gray-600 italic">
          "{proposal.message}"
        </p>
      </div>

      {/* Actions */}
      {isOwner && proposal.status === "pending" && !isAssigned && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onHire(proposal._id)}
            className="bg-gray-900 text-white hover:bg-black px-4 py-2 rounded-lg text-sm font-medium"
          >
            Hire Freelancer
          </button>
        </div>
      )}

      {proposal.status === 'hired' && (
        <div className="mt-4 flex justify-end">
          <span className="flex items-center gap-2 text-green-700 font-bold text-sm">
            <CheckCircle className="h-5 w-5" /> Hired
          </span>
        </div>
      )}
    </div>
  );
};

export default ProposalCard;
