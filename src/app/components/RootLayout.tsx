import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}