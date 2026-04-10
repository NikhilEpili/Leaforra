import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PlantCard } from '../components/PlantCard';
import { PlantProblemsChatbot } from '../components/PlantProblemsChatbot';
import { plantsData } from '../data/plants';

const filters = ['All', ...new Set(plantsData.map((plant) => plant.tag))];

export function PlantsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();
  const shouldOpenChatbot = new URLSearchParams(location.search).get('chatbot') === 'open';

  const filteredPlants = activeFilter === 'All'
    ? plantsData
    : plantsData.filter(plant => plant.tag === activeFilter);

  const handleViewDetails = (id: string) => {
    navigate(`/plants/${id}`);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-[#1E3D2F] mb-4">
            Plant Collection
          </h1>
          <p className="text-lg text-[#6B7C6E] max-w-2xl mx-auto">
            Discover the perfect plants for your space. From air-purifying wonders to low-maintenance beauties.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-[#52A974] text-white shadow-lg shadow-[#52A974]/30'
                  : 'bg-white text-[#1C2B1E] hover:bg-[#C8E6D4]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Plants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-[#6B7C6E]">
              No plants found in this category.
            </p>
          </div>
        )}
      </div>

      <PlantProblemsChatbot defaultOpen={shouldOpenChatbot} />
    </div>
  );
}
