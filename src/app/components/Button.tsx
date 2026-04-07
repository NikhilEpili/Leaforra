import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from './ui/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'pill';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const baseStyles = 'px-6 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2';
    
    const variants = {
      primary: 'bg-[#52A974] text-white rounded-lg hover:bg-[#3A7D57] hover:shadow-lg hover:shadow-[#1E3D2F]/10',
      secondary: 'bg-transparent text-[#7B4F2E] border-2 border-[#7B4F2E] rounded-lg hover:bg-[#7B4F2E] hover:text-white',
      ghost: 'bg-transparent text-[#1E3D2F] hover:text-[#52A974] group',
      pill: 'bg-[#E8C547] text-[#1E3D2F] rounded-full px-8 hover:bg-[#F5DFA0] hover:shadow-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
        {variant === 'ghost' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
