import { Link } from 'react-router';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1E3D2F] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Leaforra logo" className="w-30 h-15 object-contain" />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Smart plant care for everyone. Grow with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/plants" className="text-white/80 hover:text-white transition-colors">
                  Plants
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-white/80 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
             
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              
              <li>
                <Link to="/plants?chatbot=open" className="text-white/80 hover:text-white transition-colors">
                  Care Guides
                </Link>
              </li>
              <li>
                <Link to="/about#get-in-touch" className="text-white/80 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Connected</h3>
            <p className="text-white/80 text-sm mb-4">
              Get plant care tips in your inbox
            </p>
            <Link to="/about#get-in-touch">
              <button className="w-full px-4 py-2 bg-[#E8C547] text-[#1E3D2F] rounded-lg font-medium hover:bg-[#F5DFA0] transition-colors">
                Subscribe
              </button>
            </Link>
            <div className="flex gap-3 mt-4">
              <button type="button" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </button>
            
       
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2026 Leaforra. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
