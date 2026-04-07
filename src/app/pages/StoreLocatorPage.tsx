import { MapPin, Phone, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const stores = [
  {
    id: '1',
    name: 'Leaforra Downtown',
    address: '123 Garden Street, Downtown District',
    phone: '(555) 123-4567',
    hours: 'Mon-Sat: 9AM-7PM, Sun: 10AM-6PM',
    image: 'https://images.unsplash.com/photo-1688314418997-6917d32d703f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMG51cnNlcnklMjBncmVlbmhvdXNlfGVufDF8fHx8MTc3NTM3NDM0OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    name: 'Leaforra West Side',
    address: '456 Botanical Avenue, West Side',
    phone: '(555) 234-5678',
    hours: 'Mon-Sat: 9AM-7PM, Sun: 10AM-6PM',
    image: 'https://images.unsplash.com/photo-1688314418997-6917d32d703f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMG51cnNlcnklMjBncmVlbmhvdXNlfGVufDF8fHx8MTc3NTM3NDM0OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    name: 'Leaforra Garden Center',
    address: '789 Green Lane, Suburban Plaza',
    phone: '(555) 345-6789',
    hours: 'Mon-Sat: 8AM-8PM, Sun: 9AM-7PM',
    image: 'https://images.unsplash.com/photo-1688314418997-6917d32d703f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMG51cnNlcnklMjBncmVlbmhvdXNlfGVufDF8fHx8MTc3NTM3NDM0OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function StoreLocatorPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-[#1E3D2F] mb-4">
            Find a Store Near You
          </h1>
          <p className="text-lg text-[#6B7C6E] max-w-2xl mx-auto">
            Visit our locations to explore our full plant collection and get expert advice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Store List */}
          <div className="lg:col-span-1 space-y-6">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-[#1E3D2F]/10 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#7B4F2E] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-[#1E3D2F] mb-1">
                      {store.name}
                    </h3>
                    <p className="text-sm text-[#6B7C6E]">{store.address}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#6B7C6E]">
                    <Phone className="w-4 h-4" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7C6E]">
                    <Clock className="w-4 h-4" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <button className="mt-4 w-full px-4 py-2 bg-[#52A974] text-white rounded-lg hover:bg-[#3A7D57] transition-colors">
                  Get Directions
                </button>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-[#1E3D2F]/20 h-[600px] flex items-center justify-center">
                <ImageWithFallback
                  src={stores[0].image}
                  alt="Store location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1E3D2F]/10 flex items-center justify-center">
                  <div className="text-center bg-white/95 rounded-2xl p-8 backdrop-blur-sm">
                    <MapPin className="w-16 h-16 text-[#7B4F2E] mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-semibold text-[#1E3D2F] mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-[#6B7C6E]">
                      Map integration coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
