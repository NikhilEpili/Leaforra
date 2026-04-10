import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { RequireAuth } from './components/RequireAuth';
import { HomePage } from './pages/HomePage';
import { PlantsPage } from './pages/PlantsPage';
import { PlantDetailPage } from './pages/PlantDetailPage';
import { QRLandingPage } from './pages/QRLandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SubscribePage } from './pages/SubscribePage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MyGardenPage } from './pages/MyGardenPage';
import { RegisterPage } from './pages/RegisterPage';

function ProtectedRootLayout() {
  return (
    <RequireAuth>
      <RootLayout />
    </RequireAuth>
  );
}

function ProtectedDashboardPage() {
  return (
    <RequireAuth>
      <DashboardPage />
    </RequireAuth>
  );
}

export const router = createBrowserRouter([
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/',
    Component: ProtectedRootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'my-garden', Component: MyGardenPage },
      { path: 'plants', Component: PlantsPage },
      { path: 'plants/:id', Component: PlantDetailPage },
      { path: 'qr-landing', Component: QRLandingPage },
      { path: 'features', Component: FeaturesPage },
      { path: 'subscribe', Component: SubscribePage },
      { path: 'about', Component: AboutPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
  {
    path: '/dashboard',
    Component: ProtectedDashboardPage,
  },
]);
