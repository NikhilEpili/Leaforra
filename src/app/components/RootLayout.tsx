import { Outlet } from 'react-router';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}