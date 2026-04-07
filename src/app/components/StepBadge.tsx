import { LucideIcon } from 'lucide-react';

interface StepBadgeProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function StepBadge({ number, icon: Icon, title, description }: StepBadgeProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-xs">
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B4F2E] to-[#C49A6C] flex items-center justify-center shadow-lg shadow-[#E8C547]/30">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#E8C547] rounded-full flex items-center justify-center text-[#1E3D2F] font-bold text-sm shadow-lg">
          {number}
        </div>
      </div>
      <h4 className="text-lg font-display font-semibold text-[#1C2B1E] mb-2">
        {title}
      </h4>
      <p className="text-[#6B7C6E] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
