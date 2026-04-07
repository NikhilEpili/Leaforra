import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle } from 'lucide-react';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';

export function SubscribePage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background with botanical illustration */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1531768758921-efe347c05370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjB3YXRlcmNvbG9yJTIwbGVhdmVzfGVufDF8fHx8MTc3NTM3NDM0OXww&ixlib=rb-4.1.0&q=80&w=1080)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5EE]/98 via-[#C8E6D4]/95 to-[#F8F5EE]/98" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {!isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-[#52A974] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#52A974]/30">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-[#1E3D2F] mb-4">
                Stay in the Loop
              </h1>
              <p className="text-xl text-[#6B7C6E] max-w-xl mx-auto leading-relaxed">
                Subscribe to our newsletter for exclusive plant care tips, new arrivals, and special offers
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <FormInput
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14"
                  />
                </div>
                <Button variant="primary" type="submit" className="h-14 px-8">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-[#6B7C6E] mt-4">
                Join 10,000+ plant lovers receiving weekly tips
              </p>
            </form>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-[#1E3D2F]/10">
                <h3 className="font-display font-semibold text-lg text-[#1E3D2F] mb-2">
                  Weekly Tips
                </h3>
                <p className="text-sm text-[#6B7C6E]">
                  Expert advice delivered to your inbox
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-[#1E3D2F]/10">
                <h3 className="font-display font-semibold text-lg text-[#1E3D2F] mb-2">
                  Early Access
                </h3>
                <p className="text-sm text-[#6B7C6E]">
                  Be first to know about new plants
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-[#1E3D2F]/10">
                <h3 className="font-display font-semibold text-lg text-[#1E3D2F] mb-2">
                  Special Offers
                </h3>
                <p className="text-sm text-[#6B7C6E]">
                  Exclusive discounts for subscribers
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl shadow-[#1E3D2F]/20"
          >
            <div className="w-24 h-24 bg-[#52A974] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-4xl font-display font-bold text-[#1E3D2F] mb-3">
              You're Subscribed!
            </h2>
            <p className="text-lg text-[#6B7C6E] mb-8">
              Welcome to the Leaforra community. Check your inbox for a special welcome gift.
            </p>
            <Button variant="primary" onClick={() => window.location.href = '/'}>
              Return Home
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
