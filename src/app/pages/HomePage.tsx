import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Scan, Bell, TrendingUp, Leaf } from 'lucide-react';
import { Button } from '../components/Button';
import { StepBadge } from '../components/StepBadge';
import { PlantCard } from '../components/PlantCard';
import { plantsData } from '../data/plants';

export function HomePage() {
  const featuredPlants = plantsData.filter(plant => plant.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1531768758921-efe347c05370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjB3YXRlcmNvbG9yJTIwbGVhdmVzfGVufDF8fHx8MTc3NTM3NDM0OXww&ixlib=rb-4.1.0&q=80&w=1080)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5EE]/95 via-[#F8F5EE]/90 to-[#F8F5EE]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-[#1E3D2F] mb-6 leading-tight">
              Grow Plants the<br />Smart Way
            </h1>
            <p className="text-xl md:text-2xl text-[#6B7C6E] mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover, care for, and nurture your indoor garden with personalized guidance and smart reminders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/plants">
                <Button variant="primary" className="px-8 py-4 text-lg">
                  Explore Plants
                </Button>
              </Link>
              <Link to="/store-locator">
                <Button variant="secondary" className="px-8 py-4 text-lg">
                  Find Store
                </Button>
              </Link>
              <Link to="/subscribe">
                <Button variant="ghost" className="text-lg">
                  Subscribe
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-[#1E3D2F] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#6B7C6E] max-w-2xl mx-auto">
              Three simple steps to transform your space into a thriving green oasis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepBadge
              number={1}
              icon={Scan}
              title="Scan & Register"
              description="Scan the QR code on your plant's tag to register it in your Leaforra account"
            />
            <StepBadge
              number={2}
              icon={Bell}
              title="Get Reminders"
              description="Receive personalized care reminders based on your plant's specific needs"
            />
            <StepBadge
              number={3}
              icon={TrendingUp}
              title="Watch It Thrive"
              description="Track growth, log watering, and watch your plant flourish with expert tips"
            />
          </div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-20 bg-[#F8F5EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-[#1E3D2F] mb-4">
                Featured Plants
              </h2>
              <p className="text-lg text-[#6B7C6E]">
                Handpicked selections for your home
              </p>
            </div>
            <Link to="/plants">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-20 text-center">
          <div className="bg-gradient-to-br from-[#1E3D2F] to-[#3A7D57] rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl shadow-[#1E3D2F]/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8C547]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#52A974]/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <Leaf className="w-16 h-16 text-[#E8C547] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to Start Your Plant Journey?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Join thousands of plant lovers who've transformed their spaces with Leaforra
              </p>
              <Link to="/qr-landing">
                <Button variant="pill" className="text-lg px-10 py-4">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
