import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, UserRound, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clearRegisteredUser, getRegisteredUser } from '../auth';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(getRegisteredUser());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    setUser(getRegisteredUser());
  }, [location.pathname]);

  useEffect(() => {
    const syncUser = () => setUser(getRegisteredUser());
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogout = () => {
    clearRegisteredUser();
    setUser(null);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/register', { replace: true });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plants', path: '/plants' },
     { name: 'My Garden', path: '/my-garden' },
    { name: 'Features', path: '/features' },  
    { name: 'About', path: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-[#1E3D2F]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Leaforra logo" className="w-30 h-15 object-contain" />

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#52A974]'
                    : 'text-[#1C2B1E] hover:text-[#52A974]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className="px-6 py-2 bg-[#E8C547] text-[#1E3D2F] rounded-full font-medium hover:bg-[#F5DFA0] transition-colors"
            >
              Dashboard
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen((previous) => !previous)}
                className="w-11 h-11 rounded-full bg-[#C8E6D4] text-[#1E3D2F] hover:bg-[#B2DCC4] transition-colors inline-flex items-center justify-center"
                aria-label="Open profile menu"
              >
                <UserRound className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isProfileOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-72 rounded-2xl border border-[#C8E6D4] bg-white shadow-2xl shadow-[#1E3D2F]/15 p-4"
                  >
                    <p className="text-sm text-[#6B7C6E] mb-1">Signed in as</p>
                    <p className="font-semibold text-[#1E3D2F]">{user.name}</p>
                    <p className="text-sm text-[#1C2B1E] mt-2">{user.email}</p>
                    {user.phone && <p className="text-sm text-[#1C2B1E]">{user.phone}</p>}

                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full px-4 py-2 rounded-lg bg-[#1E3D2F] text-white hover:bg-[#3A7D57] transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#1E3D2F]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#C8E6D4]"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-medium ${
                    location.pathname === link.path
                      ? 'text-[#52A974]'
                      : 'text-[#1C2B1E]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-6 py-2 bg-[#E8C547] text-[#1E3D2F] rounded-full font-medium text-center"
              >
                Dashboard
              </Link>

              {user && (
                <div className="rounded-xl border border-[#C8E6D4] p-3 mt-2">
                  <p className="font-semibold text-[#1E3D2F]">{user.name}</p>
                  <p className="text-sm text-[#1C2B1E]">{user.email}</p>
                  {user.phone && <p className="text-sm text-[#1C2B1E]">{user.phone}</p>}
                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full px-4 py-2 rounded-lg bg-[#1E3D2F] text-white hover:bg-[#3A7D57] transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
