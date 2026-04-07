import { Leaf, Droplets, Sun } from 'lucide-react';
import { cn } from './ui/utils';

type NotificationType = 'care-tip' | 'watering' | 'sunlight';

interface NotificationItemProps {
  type: NotificationType;
  message: string;
  time: string;
  isRead?: boolean;
}

export function NotificationItem({ type, message, time, isRead = false }: NotificationItemProps) {
  const icons = {
    'care-tip': Leaf,
    'watering': Droplets,
    'sunlight': Sun,
  };

  const iconColors = {
    'care-tip': '#52A974',
    'watering': '#3A7D57',
    'sunlight': '#E8C547',
  };

  const Icon = icons[type];
  const iconColor = iconColors[type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg transition-all duration-200 hover:bg-[#F8F5EE]',
        !isRead && 'bg-[#C8E6D4]/30'
      )}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${iconColor}20` }}
      >
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#1C2B1E] mb-1">{message}</p>
        <p className="text-xs text-[#6B7C6E]">{time}</p>
      </div>
      {!isRead && (
        <div className="w-2 h-2 bg-[#52A974] rounded-full flex-shrink-0 mt-2" />
      )}
    </div>
  );
}
