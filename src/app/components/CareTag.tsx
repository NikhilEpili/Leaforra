import { Sun, Droplets, Wrench } from 'lucide-react';
import { cn } from './ui/utils';

type CareType = 'sunlight' | 'watering' | 'maintenance';

interface CareTagProps {
  type: CareType;
  value: string;
  className?: string;
}

export function CareTag({ type, value, className }: CareTagProps) {
  const icons = {
    sunlight: Sun,
    watering: Droplets,
    maintenance: Wrench,
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#C8E6D4]',
      className
    )}>
      <div className="w-8 h-8 rounded-full bg-[#E8C547] flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#1E3D2F]" />
      </div>
      <span className="text-sm font-medium text-[#1C2B1E]">{value}</span>
    </div>
  );
}
