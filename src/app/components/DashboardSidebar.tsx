import { Link, useLocation, useNavigate } from 'react-router';
import { Home, LogOut } from 'lucide-react';
import { clearRegisteredUser } from '../auth';
import { cn } from './ui/utils';

interface SidebarProps {
  isCollapsed?: boolean;
}

export function DashboardSidebar({ isCollapsed = false }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
   
  ];

  const handleLogout = () => {
    clearRegisteredUser();
    navigate('/register', { replace: true });
  };

  return (
    <aside
      className={cn(
        'bg-[#1E3D2F] h-screen sticky top-0 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="p-6 border-b border-white/10">
        <div className={cn('flex items-center', isCollapsed ? 'justify-center' : 'justify-start')}>
          <img
            src="/logo.png"
            alt="Leaforra logo"
            className={cn('object-contain flex-shrink-0', isCollapsed ? 'w-12 h-12' : 'w-[120px] h-[48px]')}
          />
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-[#E8C547] text-[#1E3D2F]'
                  : 'text-white hover:bg-[#3A7D57]',
                isCollapsed && 'justify-center'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#3A7D57] transition-all duration-200 w-full',
            isCollapsed && 'justify-center'
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
