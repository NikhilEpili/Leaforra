import { useState } from 'react';
import { Bell } from 'lucide-react';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { WateringCountdown } from '../components/WateringCountdown';
import { NotificationItem } from '../components/NotificationItem';
import { Toast } from '../components/Toast';

export function DashboardPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showToast, setShowToast] = useState(true);

  const myPlants = [
    { id: '1', plantName: 'Monstera Deliciosa', daysLeft: 2, progress: 70 },
    { id: '2', plantName: 'Snake Plant', daysLeft: 5, progress: 40 },
    { id: '3', plantName: 'Golden Pothos', daysLeft: 1, progress: 85 },
    { id: '4', plantName: 'Fiddle Leaf Fig', daysLeft: 3, progress: 60 },
  ];

  const notifications = [
    { type: 'watering' as const, message: 'Time to water your Golden Pothos!', time: '10 minutes ago', isRead: false },
    { type: 'care-tip' as const, message: 'Your Monstera loves humidity. Try misting its leaves weekly.', time: '2 hours ago', isRead: false },
    { type: 'sunlight' as const, message: 'Move your Snake Plant closer to the window for optimal growth.', time: '1 day ago', isRead: true },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F5EE]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-[#1E3D2F] mb-2">
              My Dashboard
            </h1>
            <p className="text-[#6B7C6E]">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <Bell className="w-6 h-6 text-[#1E3D2F]" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl shadow-[#1E3D2F]/20 p-4 z-50">
                <h3 className="font-display font-semibold text-lg text-[#1E3D2F] mb-3 px-2">
                  Notifications
                </h3>
                <div className="space-y-2 max-h-96 overflow-auto">
                  {notifications.map((notif, index) => (
                    <NotificationItem key={index} {...notif} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-[#1E3D2F]/10">
            <h3 className="text-[#6B7C6E] text-sm font-medium uppercase tracking-wider mb-2">
              Total Plants
            </h3>
            <p className="text-4xl font-display font-bold text-[#1E3D2F]">
              {myPlants.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-[#1E3D2F]/10">
            <h3 className="text-[#6B7C6E] text-sm font-medium uppercase tracking-wider mb-2">
              Needs Water Today
            </h3>
            <p className="text-4xl font-display font-bold text-[#E8C547]">
              1
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-[#1E3D2F]/10">
            <h3 className="text-[#6B7C6E] text-sm font-medium uppercase tracking-wider mb-2">
              Care Streak
            </h3>
            <p className="text-4xl font-display font-bold text-[#52A974]">
              12 days
            </p>
          </div>
        </div>

        {/* My Plants Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-semibold text-[#1E3D2F] mb-6">
            My Plants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myPlants.map((plant) => (
              <WateringCountdown key={plant.id} {...plant} />
            ))}
          </div>
        </div>

        {/* Care Tips Card */}
        <div className="bg-gradient-to-br from-[#C8E6D4] to-[#F8F5EE] rounded-2xl p-8 border-2 border-[#52A974]/20">
          <h3 className="text-2xl font-display font-semibold text-[#1E3D2F] mb-3">
            Today's Care Tip
          </h3>
          <p className="text-[#1C2B1E] leading-relaxed">
            Most houseplants prefer bright, indirect light. Avoid placing them in direct sunlight as it can scorch their leaves. 
            If you notice your plant leaning toward the light, rotate it regularly for even growth.
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        type="success"
        message="Plant care logged successfully!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
