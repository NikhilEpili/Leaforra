import { motion } from 'motion/react';
import { Droplets } from 'lucide-react';

interface WateringCountdownProps {
  plantName: string;
  daysLeft: number;
  progress: number; // 0-100
}

export function WateringCountdown({ plantName, daysLeft, progress }: WateringCountdownProps) {
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-[#1E3D2F]/10">
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#C8E6D4"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="#52A974"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>
          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Droplets className="w-8 h-8 text-[#52A974]" />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-display font-semibold text-[#1C2B1E] mb-1">
            {plantName}
          </h4>
          <p className="text-[#6B7C6E] text-sm">
            Water in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-[#E8C547] text-[#1E3D2F] rounded-full text-xs font-medium">
            {progress}% until watering
          </div>
        </div>
      </div>
    </div>
  );
}
