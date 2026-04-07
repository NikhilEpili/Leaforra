import { motion } from 'motion/react';
import { Bell, Calendar, TrendingUp, BookOpen, Camera, Users } from 'lucide-react';

const features = [
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Get personalized notifications for watering, fertilizing, and pruning based on each plant\'s needs.',
    color: '#52A974',
  },
  {
    icon: Calendar,
    title: 'Care Calendar',
    description: 'Track all your plant care activities in one place with our intuitive calendar interface.',
    color: '#E8C547',
  },
  {
    icon: TrendingUp,
    title: 'Growth Tracking',
    description: 'Monitor your plants\' progress with photos and notes to see how they thrive over time.',
    color: '#3A7D57',
  },
  {
    icon: BookOpen,
    title: 'Plant Library',
    description: 'Access detailed care guides for hundreds of plants with expert tips and troubleshooting.',
    color: '#7B4F2E',
  },
  {
    icon: Camera,
    title: 'Plant ID',
    description: 'Identify unknown plants instantly by taking a photo with our AI-powered recognition.',
    color: '#52A974',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with fellow plant enthusiasts, share tips, and showcase your green thumb.',
    color: '#E8C547',
  },
];

export function FeaturesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-[#1E3D2F] mb-4"
          >
            Everything You Need<br />to Grow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#6B7C6E] max-w-2xl mx-auto"
          >
            Powerful features designed to make plant care effortless and enjoyable
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-[#1E3D2F]/10 hover:shadow-2xl hover:shadow-[#1E3D2F]/20 transition-shadow duration-300"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  style={{
                    backgroundColor: `${feature.color}20`,
                    boxShadow: `0 8px 24px ${feature.color}30`,
                  }}
                >
                  <Icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="text-2xl font-display font-semibold text-[#1E3D2F] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#6B7C6E] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-[#1E3D2F] to-[#3A7D57] rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Experience Leaforra?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join our growing community and discover how easy plant care can be
            </p>
            <a
              href="/qr-landing"
              className="inline-block px-10 py-4 bg-[#E8C547] text-[#1E3D2F] rounded-full font-medium text-lg hover:bg-[#F5DFA0] transition-colors shadow-xl"
            >
              Get Started Free
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
