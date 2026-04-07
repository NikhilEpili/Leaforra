import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Plant {
  id: string;
  name: string;
  description: string;
  image: string;
  tag: string;
  featured?: boolean;
}

interface PlantCardProps {
  plant: Plant;
  onViewDetails?: (id: string) => void;
}

export function PlantCard({ plant, onViewDetails }: PlantCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-white rounded-2xl overflow-hidden ${
        isHovered ? 'shadow-2xl shadow-[#1E3D2F]/20' : 'shadow-lg shadow-[#1E3D2F]/10'
      } transition-shadow duration-300`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#F8F5EE]">
        <ImageWithFallback
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-[#C8E6D4] text-[#1E3D2F] rounded-full text-xs font-medium tracking-wide uppercase">
            {plant.tag}
          </span>
        </div>
        <h3 className="text-2xl mb-2 text-[#1C2B1E]">{plant.name}</h3>
        <p className="text-[#6B7C6E] mb-4 leading-relaxed">{plant.description}</p>
        <Button
          variant="secondary"
          onClick={() => onViewDetails?.(plant.id)}
          className="w-full"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}
