export const plantsData = [
  {
    id: '1',
    name: 'Snake Plant',
    botanicalName: 'Sansevieria trifasciata (Dracaena trifasciata)',
    description: 'Architectural upright leaves that thrive on minimal care.',
    image: 'https://images.unsplash.com/photo-1613498630970-f2a333cb4974?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tag: 'Low Maintenance',
    featured: true,
    plantIdentity: {
      classification: 'Asparagaceae Family, Evergreen Perennial',
      growthHabitTags: ['Drought-tolerant', 'Low-light adaptable', 'Air-purifying', 'Easy-care'],
    },
    care: {
      sunlight: 'Low to bright indirect light',
      watering: 'Every 3 weeks',
      maintenance: 'Easy-care',
    },
    details: 'Ready-to-use care guide for Snake Plant.',
    guide: {
      watering: {
        frequency: 'Every 3 weeks',
        details: 'Allow soil to dry out completely between waterings; water at the base and avoid water sitting in the leaf rosette.',
      },
      fertilizing: {
        frequency: 'Every 4 months',
        details: 'Use a balanced liquid houseplant fertilizer diluted to half strength during the growing season.',
      },
      repotting: {
        frequency: 'Every 2-3 years',
        details: 'Repot into a well-draining cactus or succulent mix with added perlite or sand.',
      },
      lightRequirement: {
        requirement: 'Low to bright indirect light',
        details: 'Can tolerate low light but grows best in bright indirect light. A little morning sun is fine.',
      },
      temperatureRange: {
        idealTemperature: '15-29C (60-85F)',
        details: 'Avoid exposure below 10C (50F). Protect from cold drafts and overwatering in winter.',
      },
    },
  },
  {
    id: '2',
    name: 'Spider Plant',
    botanicalName: 'Chlorophytum comosum',
    description: 'Arching striped leaves with playful baby plantlets.',
    image: 'https://images.unsplash.com/photo-1607363380021-9f1cce0cde24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tag: 'Air Purifying',
    featured: true,
    plantIdentity: {
      classification: 'Asparagaceae Family, Evergreen Perennial',
      growthHabitTags: ['Pet-friendly', 'Air-purifying', 'Fast-growing', 'Beginner-friendly'],
    },
    care: {
      sunlight: 'Bright Indirect',
      watering: 'Every 7-10 days',
      maintenance: 'Beginner-friendly',
    },
    details: 'Ready-to-use care guide for Spider Plant.',
    guide: {
      watering: {
        frequency: 'Every 7-10 days',
        details: 'Keep soil lightly moist but not soggy. Water when the top 1-2 inches of soil feel dry.',
      },
      fertilizing: {
        frequency: 'Every 2 months',
        details: 'Feed with a balanced liquid fertilizer during spring and summer at half strength.',
      },
      repotting: {
        frequency: 'Every 1-2 years',
        details: 'Spider plants grow quickly and prefer being slightly root-bound, but repot once roots crowd the pot heavily.',
      },
      lightRequirement: {
        requirement: 'Bright indirect light',
        details: 'Thrives near east- or north-facing windows. Avoid strong direct afternoon sunlight.',
      },
      temperatureRange: {
        idealTemperature: '18-27C (65-80F)',
        details: 'Keep away from extreme heat and cold. Avoid temperatures below 10C (50F).',
      },
    },
  },
  {
    id: '3',
    name: 'Aloe Vera',
    botanicalName: 'Aloe barbadensis miller',
    description: 'Healing succulent with fleshy leaves full of soothing gel.',
    image: 'https://images.unsplash.com/photo-1684913127590-54e08d09a34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tag: 'Medicinal',
    featured: true,
    plantIdentity: {
      classification: 'Asphodelaceae Family, Succulent Perennial',
      growthHabitTags: ['Medicinal', 'Drought-tolerant', 'Sun-loving', 'Low-maintenance'],
    },
    care: {
      sunlight: 'Bright light to direct morning sun',
      watering: 'Every 2-3 Weeks',
      maintenance: 'Low-maintenance',
    },
    details: 'Ready-to-use care guide for Aloe Vera.',
    guide: {
      watering: {
        frequency: 'Every 2-3 weeks',
        details: 'Water deeply, then allow the soil to dry out completely before watering again.',
      },
      fertilizing: {
        frequency: 'Every 4-6 months',
        details: 'Use a diluted succulent fertilizer or balanced liquid fertilizer during the active growing season.',
      },
      repotting: {
        frequency: 'Every 2-3 years',
        details: 'Repot in a terracotta pot with excellent drainage using cactus/succulent potting mix.',
      },
      lightRequirement: {
        requirement: 'Bright light to direct morning sun',
        details: 'Place near a sunny window with several hours of bright light daily. Too little light causes weak growth.',
      },
      temperatureRange: {
        idealTemperature: '16-29C (60-85F)',
        details: 'Protect from frost and prolonged cold exposure. Avoid keeping it in very humid corners.',
      },
    },
  },
  {
    id: '4',
    name: 'Areca Palm',
    botanicalName: 'Dypsis lutescens',
    description: 'Feathery tropical fronds that soften and brighten interiors.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dypsis_lutescens_03.jpg',
    tag: 'Air Purifying',
    plantIdentity: {
      classification: 'Arecaceae Family, Tropical Evergreen Palm',
      growthHabitTags: ['Tropical', 'Air-purifying', 'Humidity-loving', 'Decorative'],
    },
    care: {
      sunlight: 'Bright Indirect',
      watering: 'Every 5-7 Days',
      maintenance: 'Decorative',
    },
    details: 'Ready-to-use care guide for Areca Palm.',
    guide: {
      watering: {
        frequency: 'Every 5-7 days',
        details: 'Keep the soil slightly moist, but do not let the roots sit in water. Water when the top inch of soil feels dry.',
      },
      fertilizing: {
        frequency: 'Every 2 months',
        details: 'Use a palm fertilizer or balanced liquid fertilizer during spring and summer.',
      },
      repotting: {
        frequency: 'Every 2-3 years',
        details: 'Repot only when root-bound, as palms dislike frequent disturbance. Use a rich, well-draining mix.',
      },
      lightRequirement: {
        requirement: 'Bright indirect light',
        details: 'Needs filtered sunlight. Too much direct harsh sun may scorch the fronds.',
      },
      temperatureRange: {
        idealTemperature: '18-30C (65-86F)',
        details: 'Prefers warm conditions and moderate humidity. Avoid cold air and temperatures below 13C (55F).',
      },
    },
  },
  {
    id: '5',
    name: 'Rubber Plant',
    botanicalName: 'Ficus elastica',
    description: 'Glossy broad leaves with a bold, sculptural presence.',
    image: 'https://images.unsplash.com/photo-1623032693199-e9abd35e0a98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tag: 'Air Purifying',
    plantIdentity: {
      classification: 'Moraceae Family, Evergreen Tropical Houseplant',
      growthHabitTags: ['Glossy foliage', 'Air-purifying', 'Moderate-care', 'Statement plant'],
    },
    care: {
      sunlight: 'Bright Indirect',
      watering: 'Every 7-12 days',
      maintenance: 'Moderate-care',
    },
    details: 'Ready-to-use care guide for Rubber Plant.',
    guide: {
      watering: {
        frequency: 'Every 7-12 days',
        details: 'Water when the top 1-2 inches of soil are dry. Reduce watering in cooler months.',
      },
      fertilizing: {
        frequency: 'Every 2 months',
        details: 'Feed with a balanced liquid fertilizer during active growth in spring and summer.',
      },
      repotting: {
        frequency: 'Every 2-3 years',
        details: 'Repot when roots begin circling the pot. Use a well-draining indoor potting mix.',
      },
      lightRequirement: {
        requirement: 'Bright indirect light',
        details: 'Needs good filtered light to maintain healthy glossy leaves. Avoid very low light.',
      },
      temperatureRange: {
        idealTemperature: '16-29C (60-85F)',
        details: 'Avoid sudden temperature drops and keep away from AC vents or cold drafts.',
      },
    },
  },
  {
    id: '6',
    name: 'Jade Plant',
    botanicalName: 'Crassula ovata',
    description: 'Compact succulent with plump leaves and bonsai-like form.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crassula_bonsai.jpg',
    tag: 'Low Maintenance',
    plantIdentity: {
      classification: 'Crassulaceae Family, Succulent Evergreen',
      growthHabitTags: ['Succulent', 'Lucky plant', 'Drought-tolerant', 'Compact'],
    },
    care: {
      sunlight: 'Bright light with some direct sun',
      watering: 'Every 2-3 Weeks',
      maintenance: 'Compact',
    },
    details: 'Ready-to-use care guide for Jade Plant.',
    guide: {
      watering: {
        frequency: 'Every 2-3 weeks',
        details: 'Let the soil dry almost completely before watering. Overwatering is the biggest risk.',
      },
      fertilizing: {
        frequency: 'Every 3-4 months',
        details: 'Use a diluted succulent fertilizer during the growing season only.',
      },
      repotting: {
        frequency: 'Every 2-3 years',
        details: 'Use a shallow pot with drainage and a gritty succulent mix. Avoid oversized pots.',
      },
      lightRequirement: {
        requirement: 'Bright light with some direct sun',
        details: 'Best growth happens in bright light. A few hours of direct morning sun is beneficial.',
      },
      temperatureRange: {
        idealTemperature: '18-24C (65-75F)',
        details: 'Can tolerate slightly cooler temperatures but should be protected from frost and excess humidity.',
      },
    },
  },
  {
    id: '7',
    name: 'Anthurium',
    botanicalName: 'Anthurium andraeanum',
    description: 'Glossy foliage with long-lasting heart-shaped blooms.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Anthurium.andraeanum1web.jpg',
    tag: 'Flowering',
    plantIdentity: {
      classification: 'Araceae Family, Tropical Flowering Perennial',
      growthHabitTags: ['Flowering', 'Tropical', 'Humidity-loving', 'Decorative'],
    },
    care: {
      sunlight: 'Bright Indirect',
      watering: 'Every 5-7 Days',
      maintenance: 'Decorative',
    },
    details: 'Ready-to-use care guide for Anthurium.',
    guide: {
      watering: {
        frequency: 'Every 5-7 days',
        details: 'Keep the soil lightly moist. Water when the top inch feels dry, but avoid soggy conditions.',
      },
      fertilizing: {
        frequency: 'Every 6-8 weeks',
        details: 'Use a diluted phosphorus-rich or balanced fertilizer during the growing season to support blooms.',
      },
      repotting: {
        frequency: 'Every 2 years',
        details: 'Use a chunky, airy potting mix with cocopeat, bark, and perlite for good root aeration.',
      },
      lightRequirement: {
        requirement: 'Bright indirect light',
        details: 'Needs bright filtered light for flowering. Too much direct sunlight can scorch leaves and blooms.',
      },
      temperatureRange: {
        idealTemperature: '18-28C (65-82F)',
        details: 'Prefers warmth and humidity. Keep away from cold windows and dry indoor air.',
      },
    },
  },
  {
    id: '8',
    name: 'Money Plant',
    botanicalName: 'Epipremnum aureum (Pothos)',
    description: 'Fast-growing trailing vine with fresh green heart-shaped leaves.',
    image: 'https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tag: 'Feng Shui Favorite',
    featured: true,
    plantIdentity: {
      classification: 'Araceae Family, Evergreen Vine',
      growthHabitTags: ['Trailing vine', 'Air-purifying', 'Low-maintenance', 'Fast-growing'],
    },
    care: {
      sunlight: 'Low to Bright Indirect',
      watering: 'Every 7-10 days',
      maintenance: 'Low-maintenance',
    },
    details: 'Ready-to-use care guide for Money Plant.',
    guide: {
      watering: {
        frequency: 'Every 7-10 days',
        details: 'Water when the top 1-2 inches of soil feel dry. Avoid keeping the soil constantly soggy.',
      },
      fertilizing: {
        frequency: 'Every 2-3 months',
        details: 'Feed with a balanced liquid fertilizer at half strength during the growing season.',
      },
      repotting: {
        frequency: 'Every 1-2 years',
        details: 'Repot once roots start filling the container. Use a loose, well-draining indoor plant mix.',
      },
      lightRequirement: {
        requirement: 'Low to bright indirect light',
        details: 'Very adaptable. Variegated types prefer brighter indirect light for better leaf color.',
      },
      temperatureRange: {
        idealTemperature: '18-30C (65-86F)',
        details: 'Keep in warm indoor conditions and avoid temperatures below 12C (54F).',
      },
    },
  },
];
