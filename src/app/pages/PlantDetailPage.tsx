import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Droplets, FlaskConical, Flower2, Sun, Thermometer } from 'lucide-react';
import { CareTag } from '../components/CareTag';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { plantsData } from '../data/plants';
import { fetchOwnedPlants, getRegisteredUser, persistOwnedPlants } from '../auth';

const OWNED_PLANTS_STORAGE_KEY = 'leaforra.garden.ownedPlants';

function loadOwnedPlantsFromStorage() {
  if (typeof window === 'undefined') {
    return [] as string[];
  }

  const saved = window.localStorage.getItem(OWNED_PLANTS_STORAGE_KEY);
  if (!saved) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [] as string[];
  }
}

export function PlantDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isAddingToGarden, setIsAddingToGarden] = useState(false);
  const [addStatusMessage, setAddStatusMessage] = useState<string | null>(null);
  const plant = plantsData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id]);

  const guideCards = plant?.guide
    ? [
        {
          title: 'Watering',
          label: 'Frequency',
          value: plant.guide.watering.frequency,
          details: plant.guide.watering.details,
          Icon: Droplets,
          iconBg: 'bg-[#C8E6D4]',
        },
        {
          title: 'Fertilizing',
          label: 'Frequency',
          value: plant.guide.fertilizing.frequency,
          details: plant.guide.fertilizing.details,
          Icon: FlaskConical,
          iconBg: 'bg-[#E8C547]/40',
        },
        {
          title: 'Repotting',
          label: 'Frequency',
          value: plant.guide.repotting.frequency,
          details: plant.guide.repotting.details,
          Icon: Flower2,
          iconBg: 'bg-[#C8E6D4]',
        },
        {
          title: 'Light Requirement',
          label: 'Requirement',
          value: plant.guide.lightRequirement.requirement,
          details: plant.guide.lightRequirement.details,
          Icon: Sun,
          iconBg: 'bg-[#E8C547]/40',
        },
        {
          title: 'Temperature Range',
          label: 'Ideal Temperature',
          value: plant.guide.temperatureRange.idealTemperature,
          details: plant.guide.temperatureRange.details,
          Icon: Thermometer,
          iconBg: 'bg-[#C8E6D4]',
        },
      ]
    : [];

  if (!plant) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#F8F5EE] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-semibold text-[#1E3D2F] mb-4">
            Plant Not Found
          </h2>
          <Link to="/plants">
            <Button variant="primary">Back to Plants</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToGarden = async () => {
    if (!plant) {
      return;
    }

    const currentUser = getRegisteredUser();

    setIsAddingToGarden(true);
    setAddStatusMessage(null);

    const localOwnedPlants = loadOwnedPlantsFromStorage();
    const alreadyAddedLocally = localOwnedPlants.includes(plant.id);
    const updatedLocalOwnedPlants = alreadyAddedLocally
      ? localOwnedPlants
      : [...localOwnedPlants, plant.id];

    if (!alreadyAddedLocally) {
      window.localStorage.setItem(OWNED_PLANTS_STORAGE_KEY, JSON.stringify(updatedLocalOwnedPlants));
    }

    try {
      if (currentUser?.id) {
        const serverOwnedPlants = await fetchOwnedPlants(currentUser.id);
        const mergedOwnedPlants = Array.from(new Set([...serverOwnedPlants, ...updatedLocalOwnedPlants]));
        await persistOwnedPlants(currentUser.id, mergedOwnedPlants);
        window.localStorage.setItem(OWNED_PLANTS_STORAGE_KEY, JSON.stringify(mergedOwnedPlants));
      }

      setAddStatusMessage(
        alreadyAddedLocally ? 'This plant is already in your garden.' : 'Plant added to your garden.'
      );
      navigate('/my-garden');
    } catch {
      // Local add has already succeeded; backend sync can be retried later.
      setAddStatusMessage(
        alreadyAddedLocally
          ? 'This plant is already in your garden.'
          : 'Plant added locally. It will sync to your account when server is available.'
      );
      navigate('/my-garden');
    } finally {
      setIsAddingToGarden(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Back Button */}
        <Link to="/plants" className="inline-flex items-center gap-2 text-[#6B7C6E] hover:text-[#1E3D2F] mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Plants</span>
        </Link>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Plant Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl shadow-[#1E3D2F]/20">
              {/* Yellow Glow Background */}
              <div className="absolute inset-0 bg-gradient-radial from-[#E8C547]/20 via-transparent to-transparent opacity-60" />
              
              <ImageWithFallback
                src={plant.image}
                alt={plant.name}
                className="w-full aspect-square object-cover relative z-10"
              />
            </div>
          </motion.div>

          {/* Right: Plant Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-[#C8E6D4] text-[#1E3D2F] rounded-full text-sm font-medium tracking-wide uppercase">
                {plant.tag}
              </span>
            </div>

            <h1 className="text-5xl font-display font-bold text-[#1E3D2F] mb-4">
              {plant.name}
            </h1>

            {plant.botanicalName && (
              <p className="text-base text-[#1E3D2F] mb-4">
                <span className="font-semibold">Botanical Name:</span> {plant.botanicalName}
              </p>
            )}

            <p className="text-xl text-[#6B7C6E] mb-8 leading-relaxed">
              {plant.description}
            </p>

            {plant.care && (
              <>
                <h3 className="text-2xl font-display font-semibold text-[#1E3D2F] mb-4">
                  Care Requirements
                </h3>

                <div className="flex flex-wrap gap-4 mb-8">
                  <CareTag type="sunlight" value={plant.care.sunlight} />
                  <CareTag type="watering" value={plant.care.watering} />
                  <CareTag type="maintenance" value={plant.care.maintenance} />
                </div>
              </>
            )}

            {plant.details && (
              <>
                <h3 className="text-2xl font-display font-semibold text-[#1E3D2F] mb-4">
                  About This Plant
                </h3>
                <p className="text-[#6B7C6E] mb-8 leading-relaxed">
                  {plant.details}
                </p>
              </>
            )}

            {plant.plantIdentity && (
              <>
                <h3 className="text-2xl font-display font-semibold text-[#1E3D2F] mb-4">
                  Plant Identity
                </h3>
                <div className="mb-4">
                  <p className="text-[#1E3D2F] font-medium mb-2">Classification</p>
                  <p className="text-[#6B7C6E] leading-relaxed">{plant.plantIdentity.classification}</p>
                </div>
                <div className="mb-8">
                  <p className="text-[#1E3D2F] font-medium mb-3">Growth Habit Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {plant.plantIdentity.growthHabitTags.map((habit: string) => (
                      <span
                        key={habit}
                        className="inline-block px-3 py-1 bg-[#C8E6D4] text-[#1E3D2F] rounded-full text-xs font-medium"
                      >
                        {habit}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {plant.guide && (
              <>
                <h3 className="text-2xl font-display font-semibold text-[#1E3D2F] mb-3">
                  Care Guide
                </h3>
                <p className="text-[#6B7C6E] mb-5">
                  Practical care instructions tailored for this plant.
                </p>

                <div className="mb-8 rounded-2xl border border-[#C8E6D4] bg-gradient-to-br from-white to-[#F2F8F4] p-4 md:p-5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {guideCards.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        whileHover={{ y: -3 }}
                        className="rounded-xl border border-[#C8E6D4] bg-white p-4 shadow-sm shadow-[#1E3D2F]/5"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center`}>
                            <item.Icon className="w-5 h-5 text-[#1E3D2F]" />
                          </div>
                          <p className="text-[#1E3D2F] font-semibold">{item.title}</p>
                        </div>

                        <p className="text-sm mb-2 leading-relaxed">
                          <span className="font-semibold text-[#1E3D2F]">{item.label}:</span>{' '}
                          <span className="text-[#3A7D57] font-medium">{item.value}</span>
                        </p>
                        <p className="text-sm text-[#6B7C6E] leading-relaxed">{item.details}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Add-to-garden CTA Card */}
            <div className="bg-gradient-to-br from-[#1E3D2F] to-[#3A7D57] rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-display font-semibold text-white mb-2">
                Add This Plant
              </h3>
              <p className="text-white/90 mb-6">
                Add this plant to your collection and get personalized care reminders
              </p>
              <Button
                variant="pill"
                className="w-full md:w-auto"
                onClick={handleAddToGarden}
                disabled={isAddingToGarden}
              >
                {isAddingToGarden ? 'Adding...' : 'Add to My Garden'}
              </Button>
              {addStatusMessage && (
                <p className="text-sm text-white/90 mt-3">{addStatusMessage}</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
