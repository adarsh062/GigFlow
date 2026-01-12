import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

const GigCard = ({ gig }) => {
  return (
    <div className="group relative flex flex-col h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1">
      <div className="absolute top-4 right-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            gig.status === 'open' 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
            {gig.status === 'open' ? 'Open' : 'Closed'}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 pr-16 line-clamp-1 group-hover:text-blue-600 transition-colors">
        {gig.title}
      </h3>
      <div className="w-fit mb-4 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
        Budget: ${gig.budget}
      </div>
      <p className="text-sm text-gray-500 mb-6 line-clamp-2 flex-grow">
        {gig.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Posted {new Date(gig.createdAt).toLocaleDateString()}</span>
        </div>

        <Link 
          to={`/gig/${gig._id}`} 
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default GigCard;