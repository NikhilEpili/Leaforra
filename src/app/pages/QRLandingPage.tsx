import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';

export function QRLandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl shadow-[#1E3D2F]/20 p-8 md:p-10"
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src="/logo.png" alt="Leaforra logo" className="w-30 h-10 object-contain" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[#1E3D2F] text-center mb-2">
              Welcome to Leaforra
            </h1>
            <p className="text-[#6B7C6E] text-center mb-8">
              Register your plant to start receiving personalized care tips
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <FormInput
                label="Name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Email (Optional)"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />

              <Button variant="primary" type="submit" className="w-full py-4 text-lg mt-6">
                Start Plant Care
              </Button>
            </form>

            {/* Consent Text */}
            <p className="text-xs text-[#6B7C6E] text-center mt-6 leading-relaxed">
              By continuing, you agree to receive care reminders and tips from Leaforra. 
              We respect your privacy and will never share your information.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl shadow-[#1E3D2F]/20 p-8 md:p-10 text-center"
          >
            <div className="w-20 h-20 bg-[#52A974] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-display font-bold text-[#1E3D2F] mb-3">
              You're All Set!
            </h2>
            <p className="text-lg text-[#6B7C6E] mb-8">
              Welcome to Leaforra, {formData.name}! You'll receive your first care reminder soon.
            </p>

            <div className="bg-[#C8E6D4] rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-[#1E3D2F] mb-2">What's Next?</h3>
              <ul className="text-sm text-[#1C2B1E] text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#52A974] mt-1">•</span>
                  <span>Download the Leaforra app for full features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#52A974] mt-1">•</span>
                  <span>Explore care guides for your plant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#52A974] mt-1">•</span>
                  <span>Set up watering and feeding reminders</span>
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              onClick={() => window.location.href = '/dashboard'}
              className="w-full py-4"
            >
              Go to Dashboard
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
