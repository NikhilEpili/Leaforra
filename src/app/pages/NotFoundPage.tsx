import { Link } from 'react-router';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-9xl font-display font-bold text-[#C8E6D4] mb-4">
          404
        </div>
        <h1 className="text-4xl font-display font-bold text-[#1E3D2F] mb-3">
          Page Not Found
        </h1>
        <p className="text-lg text-[#6B7C6E] mb-8">
          Oops! The page you're looking for seems to have wandered off.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#52A974] text-white rounded-lg hover:bg-[#3A7D57] transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
