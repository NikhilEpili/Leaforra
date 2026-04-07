import { motion } from 'motion/react';
import { Leaf, Heart, Globe, Users } from 'lucide-react';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { useState } from 'react';

export function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
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
                Founded in 2024, we've helped thousands of people discover the joy of nurturing plants. 
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
                  Impact So Far
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-4xl font-display font-bold text-[#E8C547]">50K+</p>
                    <p className="text-white/80 text-sm">Happy Plant Parents</p>
                  </div>
                  <div>
                    <p className="text-4xl font-display font-bold text-[#E8C547]">200K+</p>
                    <p className="text-white/80 text-sm">Plants Thriving</p>
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
        <div className="bg-white rounded-3xl p-10 md:p-12 shadow-2xl shadow-[#1E3D2F]/20">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

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

              <Button variant="primary" type="submit" className="w-full py-4">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
