import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Bell, CheckCircle2, Droplets, Flower2, Plus, Trash2, UserRound } from 'lucide-react';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';
import { plantsData } from '../data/plants';

type GardenProfile = {
  name: string;
  phone: string;
  email: string;
};

type WateringAlarm = {
  id: string;
  plantId: string;
  time: string;
  enabled: boolean;
  lastTriggeredDate?: string;
};

const STORAGE_KEYS = {
  profile: 'leaforra.garden.profile',
  ownedPlants: 'leaforra.garden.ownedPlants',
  alarms: 'leaforra.garden.alarms',
};

const getTodayKey = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

const getCurrentTimeKey = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }
  const saved = window.localStorage.getItem(key);
  if (!saved) {
    return fallback;
  }
  try {
    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

export function MyGardenPage() {
  const [profile, setProfile] = useState<GardenProfile | null>(
    loadFromStorage<GardenProfile | null>(STORAGE_KEYS.profile, null)
  );
  const [ownedPlantIds, setOwnedPlantIds] = useState<string[]>(
    loadFromStorage<string[]>(STORAGE_KEYS.ownedPlants, [])
  );
  const [alarms, setAlarms] = useState<WateringAlarm[]>(
    loadFromStorage<WateringAlarm[]>(STORAGE_KEYS.alarms, [])
  );

  const [formName, setFormName] = useState(profile?.name ?? '');
  const [formPhone, setFormPhone] = useState(profile?.phone ?? '');
  const [formEmail, setFormEmail] = useState(profile?.email ?? '');
  const [formError, setFormError] = useState('');

  const [selectedPlantId, setSelectedPlantId] = useState(plantsData[0]?.id ?? '');
  const [alarmPlantId, setAlarmPlantId] = useState('');
  const [alarmTime, setAlarmTime] = useState('08:00');

  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | 'unsupported'>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.ownedPlants, JSON.stringify(ownedPlantIds));
    }
  }, [ownedPlantIds]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.alarms, JSON.stringify(alarms));
    }
  }, [alarms]);

  const ownedPlants = useMemo(
    () => plantsData.filter((plant) => ownedPlantIds.includes(plant.id)),
    [ownedPlantIds]
  );

  const availablePlants = useMemo(
    () => plantsData.filter((plant) => !ownedPlantIds.includes(plant.id)),
    [ownedPlantIds]
  );

  useEffect(() => {
    if (availablePlants.length > 0) {
      setSelectedPlantId((current) => {
        if (!current || !availablePlants.some((plant) => plant.id === current)) {
          return availablePlants[0].id;
        }
        return current;
      });
    }
  }, [availablePlants]);

  useEffect(() => {
    if (ownedPlants.length > 0) {
      setAlarmPlantId((current) => {
        if (!current || !ownedPlants.some((plant) => plant.id === current)) {
          return ownedPlants[0].id;
        }
        return current;
      });
    } else {
      setAlarmPlantId('');
    }
  }, [ownedPlants]);

  const recommendations = useMemo(() => {
    const notOwned = plantsData.filter((plant) => !ownedPlantIds.includes(plant.id));
    if (ownedPlantIds.length === 0) {
      return notOwned.slice(0, 3);
    }

    const ownedTags = new Set(ownedPlants.map((plant) => plant.tag));
    const scored = notOwned
      .map((plant) => ({
        plant,
        score: (ownedTags.has(plant.tag) ? 2 : 0) + (plant.featured ? 1 : 0),
      }))
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 3).map((entry) => entry.plant);
  }, [ownedPlantIds, ownedPlants]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const currentTime = getCurrentTimeKey();
      const todayKey = getTodayKey();

      setAlarms((previousAlarms) => {
        let changed = false;

        const nextAlarms = previousAlarms.map((alarm) => {
          if (!alarm.enabled || alarm.time !== currentTime || alarm.lastTriggeredDate === todayKey) {
            return alarm;
          }

          const targetPlant = plantsData.find((plant) => plant.id === alarm.plantId);
          if (notificationPermission === 'granted' && typeof window !== 'undefined' && 'Notification' in window) {
            new Notification('Watering Reminder', {
              body: `Time to water ${targetPlant?.name ?? 'your plant'}.`,
              icon: '/favicon.ico',
            });
          }

          changed = true;
          return { ...alarm, lastTriggeredDate: todayKey };
        });

        return changed ? nextAlarms : previousAlarms;
      });
    }, 30000);

    return () => window.clearInterval(timer);
  }, [notificationPermission]);

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    const cleanName = formName.trim();
    const cleanPhone = formPhone.trim();
    const cleanEmail = formEmail.trim();

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
    const phoneDigits = cleanPhone.replace(/\D/g, '');
    const isPhoneValid = phoneDigits.length >= 10;

    if (!cleanName || !isPhoneValid || !isEmailValid) {
      setFormError('Enter a valid name, phone number, and email to continue.');
      return;
    }

    setProfile({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
    });
  };

  const handleRequestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotificationPermission('unsupported');
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  const handleAddOwnedPlant = () => {
    if (!selectedPlantId || ownedPlantIds.includes(selectedPlantId)) {
      return;
    }
    setOwnedPlantIds((previous) => [...previous, selectedPlantId]);
  };

  const handleRemoveOwnedPlant = (plantId: string) => {
    setOwnedPlantIds((previous) => previous.filter((id) => id !== plantId));
    setAlarms((previous) => previous.filter((alarm) => alarm.plantId !== plantId));
  };

  const handleAddAlarm = () => {
    if (!alarmPlantId || !alarmTime) {
      return;
    }

    const newAlarm: WateringAlarm = {
      id: `${Date.now()}-${alarmPlantId}`,
      plantId: alarmPlantId,
      time: alarmTime,
      enabled: true,
    };

    setAlarms((previous) => [...previous, newAlarm]);
  };

  const toggleAlarm = (alarmId: string) => {
    setAlarms((previous) =>
      previous.map((alarm) =>
        alarm.id === alarmId ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  };

  const deleteAlarm = (alarmId: string) => {
    setAlarms((previous) => previous.filter((alarm) => alarm.id !== alarmId));
  };

  if (!profile) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#F8F5EE]">
        <div className="max-w-2xl mx-auto px-6 lg:px-20">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#C8E6D4] flex items-center justify-center">
                <UserRound className="w-6 h-6 text-[#1E3D2F]" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-[#1E3D2F]">My Garden</h1>
                <p className="text-[#6B7C6E]">Register to start managing your plants and reminders.</p>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <FormInput
                label="Name"
                placeholder="Enter your full name"
                value={formName}
                onChange={(event) => setFormName(event.target.value)}
                required
              />
              <FormInput
                label="Phone"
                placeholder="Enter your phone number"
                value={formPhone}
                onChange={(event) => setFormPhone(event.target.value)}
                required
              />
              <FormInput
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={formEmail}
                onChange={(event) => setFormEmail(event.target.value)}
                required
              />

              {formError && (
                <p className="text-sm text-red-600">{formError}</p>
              )}

              <Button type="submit" className="w-full">
                Register and Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 space-y-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[#1E3D2F] mb-3">My Garden</h1>
          <p className="text-[#6B7C6E]">
            Welcome, <span className="font-semibold text-[#1E3D2F]">{profile.name}</span>. Manage your plant collection and watering reminders here.
          </p>
        </div>

        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Flower2 className="w-5 h-5 text-[#3A7D57]" />
            <h2 className="text-2xl font-display font-semibold text-[#1E3D2F]">Your Plants</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <select
              className="flex-1 px-4 py-3 rounded-lg border-2 border-[#C8E6D4] focus:outline-none focus:border-[#52A974]"
              value={selectedPlantId}
              onChange={(event) => setSelectedPlantId(event.target.value)}
              disabled={availablePlants.length === 0}
            >
              {availablePlants.length === 0 && (
                <option value="">All plants already added</option>
              )}
              {availablePlants.map((plant) => (
                <option key={plant.id} value={plant.id}>{plant.name}</option>
              ))}
            </select>
            <Button onClick={handleAddOwnedPlant} disabled={availablePlants.length === 0}>
              <Plus className="w-4 h-4" />
              Add Plant
            </Button>
          </div>

          {ownedPlants.length === 0 ? (
            <p className="text-[#6B7C6E]">No plants added yet. Add your first plant to get personalized recommendations and alarms.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ownedPlants.map((plant) => (
                <div key={plant.id} className="rounded-xl border border-[#C8E6D4] p-4 bg-[#FDFEFC]">
                  <p className="font-semibold text-[#1E3D2F] mb-1">{plant.name}</p>
                  <p className="text-sm text-[#6B7C6E] mb-3">{plant.care.watering} • {plant.care.sunlight}</p>
                  <button
                    onClick={() => handleRemoveOwnedPlant(plant.id)}
                    className="text-sm text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-5 h-5 text-[#3A7D57]" />
            <h2 className="text-2xl font-display font-semibold text-[#1E3D2F]">Recommendations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((plant) => (
              <div key={plant.id} className="rounded-xl border border-[#C8E6D4] p-4 bg-[#FDFEFC]">
                <p className="font-semibold text-[#1E3D2F] mb-1">{plant.name}</p>
                <p className="text-sm text-[#6B7C6E] mb-2">{plant.description}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs bg-[#C8E6D4] text-[#1E3D2F]">
                  {plant.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-5 h-5 text-[#3A7D57]" />
            <h2 className="text-2xl font-display font-semibold text-[#1E3D2F]">Watering Alarms</h2>
          </div>

          <div className="rounded-xl border border-[#C8E6D4] bg-[#FDFEFC] p-4 mb-5">
            <p className="text-sm text-[#1E3D2F] mb-2">Browser notifications</p>
            <p className="text-sm text-[#6B7C6E] mb-3">
              Permission status: <span className="font-medium capitalize">{notificationPermission}</span>
            </p>
            <Button
              onClick={handleRequestNotificationPermission}
              disabled={notificationPermission === 'granted' || notificationPermission === 'unsupported'}
            >
              {notificationPermission === 'granted' ? 'Notifications Enabled' : 'Enable Notifications'}
            </Button>
            {notificationPermission === 'unsupported' && (
              <p className="text-sm text-red-600 mt-2">This browser does not support notifications.</p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-3 mb-6">
            <select
              className="flex-1 px-4 py-3 rounded-lg border-2 border-[#C8E6D4] focus:outline-none focus:border-[#52A974]"
              value={alarmPlantId}
              onChange={(event) => setAlarmPlantId(event.target.value)}
              disabled={ownedPlants.length === 0}
            >
              {ownedPlants.length === 0 && (
                <option value="">Add a plant first</option>
              )}
              {ownedPlants.map((plant) => (
                <option key={plant.id} value={plant.id}>{plant.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#3A7D57]" />
              <input
                type="time"
                className="px-4 py-3 rounded-lg border-2 border-[#C8E6D4] focus:outline-none focus:border-[#52A974]"
                value={alarmTime}
                onChange={(event) => setAlarmTime(event.target.value)}
              />
            </div>

            <Button onClick={handleAddAlarm} disabled={ownedPlants.length === 0}>Add Alarm</Button>
          </div>

          {alarms.length === 0 ? (
            <p className="text-[#6B7C6E]">No alarms set yet. Add a watering time for your plants.</p>
          ) : (
            <div className="space-y-3">
              {alarms.map((alarm) => {
                const targetPlant = plantsData.find((plant) => plant.id === alarm.plantId);
                return (
                  <div key={alarm.id} className="rounded-xl border border-[#C8E6D4] p-4 bg-[#FDFEFC] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#1E3D2F]">{targetPlant?.name ?? 'Plant'}</p>
                      <p className="text-sm text-[#6B7C6E]">Daily at {alarm.time}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAlarm(alarm.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          alarm.enabled ? 'bg-[#C8E6D4] text-[#1E3D2F]' : 'bg-[#ECECEC] text-[#4A4A4A]'
                        }`}
                      >
                        {alarm.enabled ? 'Enabled' : 'Paused'}
                      </button>
                      <button
                        onClick={() => deleteAlarm(alarm.id)}
                        className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
