import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ToastType = 'success' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ type, message, isVisible, onClose }: ToastProps) {
  const config = {
    success: {
      icon: CheckCircle,
      borderColor: '#52A974',
      iconColor: '#52A974',
    },
    info: {
      icon: Info,
      borderColor: '#E8C547',
      iconColor: '#E8C547',
    },
    warning: {
      icon: AlertTriangle,
      borderColor: '#7B4F2E',
      iconColor: '#7B4F2E',
    },
  };

  const { icon: Icon, borderColor, iconColor } = config[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl shadow-[#1E3D2F]/20 p-4 pr-12 max-w-md z-50"
          style={{ borderLeft: `4px solid ${borderColor}` }}
        >
          <div className="flex items-start gap-3">
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: iconColor }} />
            <p className="text-[#1C2B1E]">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#6B7C6E] hover:text-[#1C2B1E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
