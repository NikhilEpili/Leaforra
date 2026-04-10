import { useState } from 'react';
import { Leaf, MessageCircle, Sparkles, X } from 'lucide-react';

type PlantProblemsChatbotProps = {
  defaultOpen?: boolean;
};

type ProblemEntry = {
  question: string;
  answer: string;
};

const PROBLEM_GUIDE: ProblemEntry[] = [
  {
    question: 'White Powder on Leaves',
    answer: `What it usually means
A white dusty coating is most commonly powdery mildew (fungal growth) or sometimes residue from hard water / sprays. In some cases, white cottony clusters may actually be mealybugs, which need different treatment.

How to identify it correctly
• Powdery mildew: Fine white or grey powder on leaf surfaces or stems; often spreads across several leaves.
• Mealybugs: White cotton-like clumps near leaf joints, stems, or undersides; may feel sticky due to honeydew.
• Mineral residue: Chalky marks that appear after misting or tap-water splashes; usually wipes off and does not spread.

Natural remedies / quick fixes
• Step 1 - Isolate the plant: Move it away from healthy plants to reduce spread.
• Step 2 - Wipe first: Gently clean leaves with a soft damp cloth before applying any spray.
• For powdery mildew: Mix 1 teaspoon baking soda + 1 liter water + 2-3 drops mild liquid soap. Spray lightly on affected leaves every 5-7 days.
• Alternative milk spray: Mix 1 part milk : 9 parts water. Spray weekly in the morning only.
• For mealybugs: Dab visible bugs using a cotton swab dipped in 70% isopropyl alcohol. Repeat every few days until gone.

Prevention tips
• Improve air circulation around the plant.
• Avoid wetting leaves late in the day.
• Do not overcrowd pots.
• Water at the base instead of over the foliage.
• Avoid over-fertilizing with high nitrogen.

When to take extra action
Trim badly affected leaves if more than half the surface is covered. If the issue keeps returning after 2-3 weeks, it may need stronger fungal or pest management.`,
  },
  {
    question: 'Drooping Leaves',
    answer: `What it usually means
Drooping leaves usually mean the plant is under water stress - either too dry or too wet. It can also happen due to root disturbance, heat stress, or sudden environmental change.

How to identify it correctly
• Too dry: Soil feels dry, pot is light, leaves look limp but not mushy.
• Too wet: Soil stays wet for many days, leaves droop and may also yellow or feel soft.
• Heat / shock: Leaves droop after direct hot sun, repotting, or moving to a new place.

Natural remedies / quick fixes
• Check soil before anything: Put a finger 2-3 cm into the soil.
• If dry: Water deeply until excess drains out, then allow proper drying before the next watering.
• If soggy: Stop watering, improve drainage, and let the top layer dry before watering again.
• Move to stable light: Keep in bright indirect light instead of harsh sun.
• Support recovery: Mist only humidity-loving plants (not succulents) and avoid fertilizing until the plant perks up.

Prevention tips
• Use pots with drainage holes.
• Follow soil dryness instead of a strict daily watering habit.
• Keep plants away from hot afternoon sun and AC drafts.
• After repotting, give 5-7 days to adjust.

When to take extra action
If drooping continues even when soil moisture is correct, inspect roots for rot or severe root binding.`,
  },
  {
    question: 'Yellow Leaves',
    answer: `What it usually means
Yellow leaves are commonly caused by overwatering, low light, nutrient imbalance, or natural aging of older leaves. One old yellow leaf is often normal; multiple yellowing leaves usually signal care issues.

How to identify it correctly
• Overwatering: Yellow leaves plus wet soil and slow drying.
• Low light: Pale yellowing with weak stretched growth.
• Nutrient issue: Overall fading or yellowing during active growth, especially if not fertilized for months.
• Natural aging: Only the oldest bottom leaves turn yellow one at a time.

Natural remedies / quick fixes
• Correct watering first: Let the top soil dry appropriately before watering again.
• Improve light: Move to brighter indirect light if the plant is sitting in a very dark corner.
• Flush salt buildup: Run clean water through the pot once if fertilizer residue may have accumulated.
• Feed gently: During the growing season, use a balanced liquid fertilizer at half strength once every 4-8 weeks depending on the plant.
• Remove fully yellow leaves: Snip only after the leaf is mostly yellow.

Prevention tips
• Avoid watering on a fixed schedule without checking soil.
• Use a well-draining potting mix.
• Rotate the plant for even light exposure.
• Do not overfeed fertilizers.

When to take extra action
If yellowing spreads rapidly or comes with black stems, foul smell, or mushy roots, root rot is likely and the plant may need urgent repotting.`,
  },
  {
    question: 'Brown Leaves / Brown Tips',
    answer: `What it usually means
Brown leaves or crispy brown tips are often caused by underwatering, low humidity, fertilizer salt buildup, direct sun scorch, or poor water quality.

How to identify it correctly
• Crispy brown tips: Often low humidity, salt buildup, or inconsistent watering.
• Brown patches: Can indicate direct sun burn or leaf damage.
• Brown edges with dry soil: Usually underwatering.
• Brown with mushiness: Could be overwatering or rot rather than dryness.

Natural remedies / quick fixes
• Trim neatly: Cut brown tips with clean scissors, following the natural leaf shape.
• Improve watering consistency: Do not let the plant stay bone-dry for too long unless it is a succulent.
• Raise humidity: For tropical plants, keep near a pebble tray or humid area with airflow.
• Flush the soil: Rinse the potting mix with plain water once a month if fertilizer salts may be building up.
• Protect from harsh sun: Move away from intense afternoon sunlight.

Prevention tips
• Use filtered or rested water if your tap water is very hard or chlorinated.
• Avoid placing tropical plants near direct AC or heater airflow.
• Fertilize lightly and only during active growth.
• Check moisture regularly rather than waiting for severe dryness.

When to take extra action
If brown spotting spreads in circles or comes with yellow halos, it may be a fungal or bacterial issue rather than normal care stress.`,
  },
  {
    question: 'No Flowers',
    answer: `What it usually means
A plant not flowering usually means it is missing one or more bloom triggers: enough light, correct feeding, maturity, or seasonal conditions. This is common in flowering houseplants like Anthurium, Peace Lily, Hibiscus, or Jasmine.

How to identify it correctly
• Too little light: Healthy green leaves but no buds.
• Too much nitrogen: Lots of leaves, very little flowering.
• Plant not mature: Young plants may need more time before blooming.
• Seasonal rest: Some plants naturally flower only during certain months.

Natural remedies / quick fixes
• Increase bright indirect light: Most indoor flowering plants need much more light than foliage plants.
• Use bloom-support feeding: Apply a balanced or slightly phosphorus-supportive fertilizer at half strength during active growth.
• Do not overpot: Slightly root-bound plants often flower better than plants sitting in oversized pots.
• Remove old spent blooms: Deadheading encourages new flowering in many species.
• Maintain stable care: Irregular watering or moving the plant too often can delay blooming.

Prevention tips
• Match the plant to the right light level.
• Avoid heavy nitrogen-rich fertilizer only meant for leaf growth.
• Keep flowering plants in a bright, stable spot.
• Be patient with seasonal bloomers.

When to take extra action
If the plant is healthy but still not flowering, check whether that species naturally blooms only in a particular season or after reaching maturity.`,
  },
];

export function PlantProblemsChatbot({ defaultOpen = false }: PlantProblemsChatbotProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeQuestion, setActiveQuestion] = useState(PROBLEM_GUIDE[0].question);

  const selected = PROBLEM_GUIDE.find((entry) => entry.question === activeQuestion) ?? PROBLEM_GUIDE[0];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-[24rem] md:w-[23rem] max-w-[calc(100vw-2rem)] border border-[#C8E6D4] overflow-hidden bg-white shadow-2xl shadow-[#1E3D2F]/20">
          <div className="bg-gradient-to-r from-[#1E3D2F] via-[#2E5F46] to-[#3A7D57] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8C547] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#1E3D2F]" />
                </div>
                <div>
                  <p className="font-semibold text-white">Common Problems & Cures</p>
                  <p className="text-xs text-white/80">Natural Plant Problems & Home Remedy Guide for Your Plants</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
                className="text-white/90 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-[#F8F5EE] p-4 space-y-3">
            <p className="text-xs uppercase tracking-wide font-semibold text-[#6B7C6E]">Select a Problem</p>

            <select
              value={activeQuestion}
              onChange={(event) => setActiveQuestion(event.target.value)}
              className="w-full border border-[#C8E6D4] bg-white px-3 py-2.5 text-sm text-[#1C2B1E] focus:outline-none focus:ring-2 focus:ring-[#52A974]/35"
            >
              {PROBLEM_GUIDE.map((entry, index) => (
                <option key={entry.question} value={entry.question}>
                  {index + 1}) {entry.question}
                </option>
              ))}
            </select>

            <div className="border border-[#C8E6D4] bg-white p-3 h-[18rem] overflow-auto">
              <p className="text-sm font-semibold text-[#1E3D2F] mb-2 border-b border-[#E5EFE8] pb-2">{selected.question}</p>
              <p className="text-sm text-[#1C2B1E] whitespace-pre-line leading-relaxed">{selected.answer}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open plant problems chatbot"
        className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-[#52A974] via-[#3A7D57] to-[#1E3D2F] text-white shadow-2xl shadow-[#1E3D2F]/30 hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-7 h-7 mx-auto" />
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#E8C547] flex items-center justify-center shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#1E3D2F]" />
        </span>
      </button>
    </div>
  );
}
