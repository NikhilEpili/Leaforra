import { motion } from 'motion/react';
import { Leaf, Heart, Globe, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getRegisteredUser } from '../auth';

export function AboutPage() {
  const location = useLocation();
  const adminContactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contact@leaforra.com';
  const currentUser = getRegisteredUser();
  const [formData, setFormData] = useState({
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus(null);

    if (!currentUser?.name || !currentUser?.email) {
      setSubmitStatus({
        type: 'error',
        message: 'Profile details are missing. Please log out and register again.',
      });
      setIsSending(false);
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: currentUser.name.trim(),
          email: currentUser.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message: `Message sent successfully to ${adminContactEmail}.`,
      });
      setFormData({ message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error
          ? error.message
          : 'Unable to send message right now. Please try again in a moment.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const values = [
    {
      icon: Heart,
      title: 'Passion for Plants',
      description: 'We believe every home deserves the beauty and benefits of living greenery.',
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and supporting biodiversity.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a global community of plant enthusiasts helping each other grow.',
    },
  ];

  useEffect(() => {
    if (location.hash !== '#get-in-touch') {
      return;
    }

    const target = document.getElementById('get-in-touch');
    if (!target) {
      return;
    }

    // Delay to ensure layout and motion elements are mounted before scrolling.
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }, [location.hash]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#52A974] rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-display font-bold text-[#1E3D2F] mb-4">
                Our Story
              </h1>
            </div>
            <div className="space-y-4 text-[#6B7C6E] leading-relaxed">
              <p>
                Leaforra was born from a simple observation: too many beautiful plants were dying due to
                inconsistent care and lack of knowledge. We set out to change that.
              </p>
              <p>
                Founded in 2026, we've helped thousands of people discover the joy of nurturing plants.
                Our smart care system takes the guesswork out of plant parenting, making it accessible
                to everyone—from complete beginners to seasoned gardeners.
              </p>
              <p>
                We partner with local nurseries and sustainable growers to bring you the healthiest plants
                while supporting our communities and the environment.
              </p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#1E3D2F] to-[#3A7D57] rounded-3xl p-10 h-full shadow-2xl shadow-[#1E3D2F]/20">
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                To make the world greener, one plant at a time. We're building a future where everyone
                can experience the wellness benefits of living with plants, supported by technology that
                makes care simple and rewarding.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-display font-semibold text-white mb-3">
                  Potential Impact
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-4xl font-display font-bold text-[#E8C547]">100K+</p>
                    <p className="text-white/80 text-sm">Projected Users by 2028</p>
                  </div>
                  <div>
                    <p className="text-4xl font-display font-bold text-[#E8C547]">1M+</p>
                    <p className="text-white/80 text-sm">Estimated Plant-Care Actions/Year</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-[#1E3D2F] text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg shadow-[#1E3D2F]/10"
                >
                  <div className="w-16 h-16 bg-[#C8E6D4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#1E3D2F]" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-[#1E3D2F] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#6B7C6E]">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div id="get-in-touch" className="scroll-mt-28 bg-white rounded-3xl p-10 md:p-12 shadow-2xl shadow-[#1E3D2F]/20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-display font-bold text-[#1E3D2F] mb-3">
                Get in Touch
              </h2>
              <p className="text-lg text-[#6B7C6E]">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-sm text-[#6B7C6E]">
                Sending as <span className="font-medium text-[#1E3D2F]">{currentUser?.name}</span> ({currentUser?.email})
              </p>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#1C2B1E] uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white rounded-lg border-2 border-[#C8E6D4] focus:border-[#7B4F2E] focus:ring-4 focus:ring-[#7B4F2E]/10 transition-all duration-200"
                />
              </div>

              {submitStatus && (
                <p className={`text-sm ${submitStatus.type === 'success' ? 'text-[#3A7D57]' : 'text-red-600'}`}>
                  {submitStatus.message}
                </p>
              )}

              <Button variant="primary" type="submit" className="w-full py-4" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
