import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from './ui/utils';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-[#1C2B1E] uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-white rounded-lg transition-all duration-200',
            isFocused
              ? 'border-2 border-[#7B4F2E] ring-4 ring-[#7B4F2E]/10'
              : 'border-2 border-[#C8E6D4]',
            error && 'border-red-500',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
