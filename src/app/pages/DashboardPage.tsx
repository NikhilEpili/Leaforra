import { useEffect, useMemo, useState } from 'react';
import { Bell } from 'lucide-react';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { WateringCountdown } from '../components/WateringCountdown';
import { NotificationItem } from '../components/NotificationItem';
import { Toast } from '../components/Toast';
import { fetchOwnedPlants, getRegisteredUser } from '../auth';
import { plantsData } from '../data/plants';

const OWNED_PLANTS_STORAGE_KEY = 'leaforra.garden.ownedPlants';
const ALARMS_STORAGE_KEY = 'leaforra.garden.alarms';
const WATERING_LOG_STORAGE_KEY = 'leaforra.garden.wateringLog';
const DISMISSED_NOTIFICATIONS_STORAGE_KEY = 'leaforra.dashboard.dismissedNotifications';

type WateringAlarm = {
  id: string;
  plantId: string;
  time: string;
  enabled: boolean;
  lastTriggeredDate?: string;
};

type DashboardNotification = {
  id: string;
  type: 'care-tip' | 'watering' | 'sunlight';
  message: string;
  time: string;
  isRead: boolean;
  priority: number;
};

function getTodayKey(now: Date) {
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function getAlarmDateForToday(time: string, now: Date) {
  const parsed = parseAlarmTime(time);
  if (!parsed) {
    return null;
  }

  const alarmDate = new Date(now);
  alarmDate.setHours(parsed.hours, parsed.minutes, 0, 0);
  return alarmDate;
}

function loadDismissedNotificationIds() {
  if (typeof window === 'undefined') {
    return [] as string[];
  }

  const saved = window.localStorage.getItem(DISMISSED_NOTIFICATIONS_STORAGE_KEY);
  if (!saved) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as string[]) : ([] as string[]);
  } catch {
    return [] as string[];
  }
}

function loadWateringLogDays() {
  if (typeof window === 'undefined') {
    return [] as string[];
  }

  const saved = window.localStorage.getItem(WATERING_LOG_STORAGE_KEY);
  if (!saved) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed)
      ? (parsed.filter((day) => typeof day === 'string') as string[])
      : ([] as string[]);
  } catch {
    return [] as string[];
  }
}

function getConsecutiveDayStreak(dayKeys: string[], now: Date) {
  if (dayKeys.length === 0) {
    return 0;
  }

  const daySet = new Set(dayKeys);
  const todayKey = getTodayKey(now);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getTodayKey(yesterday);

  let cursor = new Date(now);
  cursor.setHours(0, 0, 0, 0);

  if (!daySet.has(todayKey) && daySet.has(yesterdayKey)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (true) {
    const cursorKey = getTodayKey(cursor);
    if (!daySet.has(cursorKey)) {
      break;
    }

    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function parseAlarmTime(time: string) {
  const [hoursRaw, minutesRaw] = time.split(':');
  const hours = Number.parseInt(hoursRaw ?? '', 10);
  const minutes = Number.parseInt(minutesRaw ?? '', 10);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return { hours, minutes };
}

function getNextAlarmDate(time: string, now: Date) {
  const parsed = parseAlarmTime(time);
  if (!parsed) {
    return null;
  }

  const next = new Date(now);
  next.setHours(parsed.hours, parsed.minutes, 0, 0);
  if (next < now) {
    next.setDate(next.getDate() + 1);
  }

  return next;
}

function loadOwnedPlantsFromStorage() {
  if (typeof window === 'undefined') {
    return [] as string[];
  }

  const saved = window.localStorage.getItem(OWNED_PLANTS_STORAGE_KEY);
  if (!saved) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as string[]) : ([] as string[]);
  } catch {
    return [] as string[];
  }
}

function loadAlarmsFromStorage() {
  if (typeof window === 'undefined') {
    return [] as WateringAlarm[];
  }

  const saved = window.localStorage.getItem(ALARMS_STORAGE_KEY);
  if (!saved) {
    return [] as WateringAlarm[];
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return [] as WateringAlarm[];
    }

    return parsed.filter((alarm): alarm is WateringAlarm => {
      return (
        typeof alarm?.id === 'string' &&
        typeof alarm?.plantId === 'string' &&
        typeof alarm?.time === 'string' &&
        typeof alarm?.enabled === 'boolean'
      );
    });
  } catch {
    return [] as WateringAlarm[];
  }
}

export function DashboardPage() {
  const profile = getRegisteredUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [now, setNow] = useState(() => new Date());
  const [ownedPlantIds, setOwnedPlantIds] = useState<string[]>(loadOwnedPlantsFromStorage());
  const [alarms, setAlarms] = useState<WateringAlarm[]>(loadAlarmsFromStorage());
  const [wateringLogDays, setWateringLogDays] = useState<string[]>(loadWateringLogDays());
  const [dismissedNotificationIds, setDismissedNotificationIds] = useState<string[]>(loadDismissedNotificationIds());

  useEffect(() => {
    if (!profile?.id) {
      return;
    }

    let isActive = true;

    fetchOwnedPlants(profile.id)
      .then((remotePlants) => {
        if (!isActive) {
          return;
        }
        setOwnedPlantIds(remotePlants);
      })
      .catch(() => {
        // Keep local-storage data as fallback when API is unavailable.
      });

    return () => {
      isActive = false;
    };
  }, [profile?.id]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const syncAlarms = () => {
      setAlarms(loadAlarmsFromStorage());
      setWateringLogDays(loadWateringLogDays());
    };

    syncAlarms();
    window.addEventListener('focus', syncAlarms);
    document.addEventListener('visibilitychange', syncAlarms);
    window.addEventListener('storage', syncAlarms);

    return () => {
      window.removeEventListener('focus', syncAlarms);
      document.removeEventListener('visibilitychange', syncAlarms);
      window.removeEventListener('storage', syncAlarms);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      DISMISSED_NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(dismissedNotificationIds)
    );
  }, [dismissedNotificationIds]);

  const myPlants = useMemo(
    () => {
      const now = new Date();
      const enabledAlarmsByPlant = new Map<string, WateringAlarm[]>();

      alarms.forEach((alarm) => {
        if (!alarm.enabled) {
          return;
        }

        const existing = enabledAlarmsByPlant.get(alarm.plantId) ?? [];
        existing.push(alarm);
        enabledAlarmsByPlant.set(alarm.plantId, existing);
      });

      return plantsData
        .filter((plant) => ownedPlantIds.includes(plant.id))
        .map((plant) => {
          const plantAlarms = enabledAlarmsByPlant.get(plant.id) ?? [];
          const nextAlarmMs = plantAlarms
            .map((alarm) => getNextAlarmDate(alarm.time, now))
            .filter((date): date is Date => Boolean(date))
            .map((date) => date.getTime())
            .sort((a, b) => a - b)[0];

          // If no enabled alarm exists for a plant, keep it visible with a neutral fallback.
          if (!nextAlarmMs) {
            return {
              id: plant.id,
              plantName: plant.name,
              daysLeft: 0,
              progress: 0,
              hasAlarm: false,
            };
          }

          const minutesLeft = Math.max(0, Math.ceil((nextAlarmMs - now.getTime()) / 60000));
          const daysLeft = Math.floor(minutesLeft / (24 * 60));
          const progress = Math.round(((24 * 60 - Math.min(minutesLeft, 24 * 60)) / (24 * 60)) * 100);

          return {
            id: plant.id,
            plantName: plant.name,
            daysLeft,
            progress,
            hasAlarm: true,
          };
        });
    },
    [alarms, ownedPlantIds]
  );

  const plantsNeedingWaterToday = useMemo(() => {
    const ownedPlantSet = new Set(ownedPlantIds);
    const scheduledPlantIds = new Set(
      alarms
        .filter((alarm) => alarm.enabled && ownedPlantSet.has(alarm.plantId))
        .map((alarm) => alarm.plantId)
    );

    return scheduledPlantIds.size;
  }, [alarms, ownedPlantIds]);

  const careStreakDays = useMemo(() => {
    // Backward-compatible fallback for older users who have alarm completion but no watering log yet.
    const fallbackDays = alarms
      .map((alarm) => alarm.lastTriggeredDate)
      .filter((day): day is string => typeof day === 'string');

    const merged = Array.from(new Set([...wateringLogDays, ...fallbackDays]));
    return getConsecutiveDayStreak(merged, now);
  }, [alarms, now, wateringLogDays]);

  const notifications = useMemo(() => {
    const todayKey = getTodayKey(now);
    const ownedPlantSet = new Set(ownedPlantIds);

    const next = alarms
      .filter((alarm) => alarm.enabled && ownedPlantSet.has(alarm.plantId))
      .map((alarm) => {
        const plantName = plantsData.find((plant) => plant.id === alarm.plantId)?.name ?? 'your plant';
        const alarmDateToday = getAlarmDateForToday(alarm.time, now);
        if (!alarmDateToday) {
          return null;
        }

        const minutesUntil = Math.ceil((alarmDateToday.getTime() - now.getTime()) / 60000);
        const hasStoppedToday = alarm.lastTriggeredDate === todayKey;

        if (minutesUntil > 0 && minutesUntil <= 15) {
          const id = `${alarm.id}:upcoming:${todayKey}`;
          return {
            id,
            type: 'sunlight' as const,
            message: `${plantName} watering alarm will ring in ${minutesUntil} minute${minutesUntil === 1 ? '' : 's'}.`,
            time: `In ${minutesUntil} min`,
            isRead: false,
            priority: 2,
          };
        }

        if (!hasStoppedToday && minutesUntil <= 0 && minutesUntil >= -10) {
          const id = `${alarm.id}:ringing:${todayKey}`;
          return {
            id,
            type: 'watering' as const,
            message: `Watering alarm is ringing now for ${plantName}.`,
            time: 'Now',
            isRead: false,
            priority: 3,
          };
        }

        if (hasStoppedToday) {
          const id = `${alarm.id}:stopped:${todayKey}`;
          return {
            id,
            type: 'care-tip' as const,
            message: `Watering reminder completed for ${plantName} today.`,
            time: 'Completed today',
            isRead: true,
            priority: 1,
          };
        }

        return null;
      })
      .filter((notification): notification is DashboardNotification => Boolean(notification))
      .filter((notification) => !dismissedNotificationIds.includes(notification.id))
      .sort((a, b) => b.priority - a.priority);

    return next;
  }, [alarms, dismissedNotificationIds, now, ownedPlantIds]);

  const unreadNotificationCount = notifications.filter((notification) => !notification.isRead).length;

  const clearNotification = (notificationId: string) => {
    setDismissedNotificationIds((previous) =>
      previous.includes(notificationId) ? previous : [...previous, notificationId]
    );
  };

  const clearAllNotifications = () => {
    if (notifications.length === 0) {
      return;
    }

    setDismissedNotificationIds((previous) => {
      const next = new Set(previous);
      notifications.forEach((notification) => next.add(notification.id));
      return Array.from(next);
    });
  };

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
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl shadow-[#1E3D2F]/20 p-4 z-50">
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="font-display font-semibold text-lg text-[#1E3D2F]">
                    Notifications
                  </h3>
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs text-[#6B7C6E] hover:text-[#1E3D2F] transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <p className="text-sm text-[#6B7C6E] px-2 py-6 text-center">No active alarm notifications.</p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-auto">
                    {notifications.map((notif) => (
                      <NotificationItem
                        key={notif.id}
                        {...notif}
                        onClear={() => clearNotification(notif.id)}
                      />
                    ))}
                  </div>
                )}
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
              {plantsNeedingWaterToday}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-[#1E3D2F]/10">
            <h3 className="text-[#6B7C6E] text-sm font-medium uppercase tracking-wider mb-2">
              Care Streak
            </h3>
            <p className="text-4xl font-display font-bold text-[#52A974]">
              {careStreakDays} {careStreakDays === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>

        {/* My Plants Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-semibold text-[#1E3D2F] mb-6">
            My Plants
          </h2>
          {myPlants.length === 0 ? (
            <p className="text-[#6B7C6E]">No plants in your garden yet. Add plants in My Garden to see them here.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myPlants.map((plant) => (
                <WateringCountdown key={plant.id} {...plant} />
              ))}
            </div>
          )}
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
