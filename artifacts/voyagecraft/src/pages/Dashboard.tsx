import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plane, Map, Camera, Globe, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { BUDGET_LABELS, COMPANION_LABELS } from '@/data/destinations';

import parisImg from '@/assets/paris.png';
import tokyoImg from '@/assets/tokyo.png';
import sydneyImg from '@/assets/sydney.png';
import baliImg from '@/assets/bali.png';

const DESTINATION_IMAGES: Record<string, string> = {
  paris: parisImg,
  tokyo: tokyoImg,
  sydney: sydneyImg,
  bali: baliImg,
};

const SPEND_DATA = [
  { name: 'Paris', spend: 3200 },
  { name: 'Tokyo', spend: 4100 },
  { name: 'Sydney', spend: 2800 },
  { name: 'Goa', spend: 1500 },
];

const MONTHLY_DATA = [
  { month: 'Jan', trips: 1 },
  { month: 'Mar', trips: 2 },
  { month: 'May', trips: 1 },
  { month: 'Jul', trips: 3 },
  { month: 'Sep', trips: 2 },
  { month: 'Nov', trips: 1 },
];

interface SavedTrip {
  destination: string;
  days: number;
  budget: string;
  companion: string;
  title: string;
  totalBudget: number;
  savedAt: string;
}

function getDestinationImage(destination: string): string | null {
  const key = destination.toLowerCase().trim();
  for (const [k, img] of Object.entries(DESTINATION_IMAGES)) {
    if (key.includes(k) || k.includes(key)) return img;
  }
  return null;
}

function getGradientForDest(destination: string): string {
  const gradients: Record<string, string> = {
    dubai: 'linear-gradient(135deg, #c6862a, #a0522d)',
    switzerland: 'linear-gradient(135deg, #2c3e50, #4a6741)',
    goa: 'linear-gradient(135deg, #f09819, #ff5858)',
    'new york': 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
  };
  const key = destination.toLowerCase();
  for (const [k, g] of Object.entries(gradients)) {
    if (key.includes(k)) return g;
  }
  return 'linear-gradient(135deg, #6d28d9, #4f46e5)';
}

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('voyagecraft_saved_trips');
    if (raw) {
      try { setSavedTrips(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const displayName = user?.name?.split(' ')[0] || 'Traveler';
  const totalTrips = 12 + savedTrips.length;

  return (
    <div className="min-h-screen bg-muted/20 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Welcome */}
        <div className="mb-8 fade-in-up flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {displayName}!
            </h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your travels and upcoming adventures.</p>
          </div>
          <Link href="/create-trip">
            <Button className="gradient-purple text-white border-0 glow-button hidden md:flex items-center gap-2" data-testid="button-plan-trip">
              <Plus size={16} /> Plan New Trip
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 fade-in-up-delay-1">
          {[
            { label: 'Trips Planned', value: totalTrips, icon: Plane, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Countries', value: 8, icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
            { label: 'Miles', value: '24.5k', icon: Map, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { label: 'Memories', value: 847 + savedTrips.length * 12, icon: Camera, color: 'text-pink-500', bg: 'bg-pink-500/10' },
          ].map(stat => (
            <Card key={stat.label} className="border-none shadow-md" data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8 fade-in-up-delay-2">

            {/* Saved Trips (dynamic) */}
            {savedTrips.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Your Saved Trips</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {savedTrips.slice(0, 4).map((trip, idx) => {
                    const img = getDestinationImage(trip.destination);
                    const gradient = getGradientForDest(trip.destination);
                    const savedDate = new Date(trip.savedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                    return (
                      <Card
                        key={idx}
                        className="overflow-hidden border-none shadow-lg card-hover cursor-pointer group"
                        onClick={() => {
                          localStorage.setItem('voyagecraft_current_trip', JSON.stringify(trip));
                          setLocation('/itinerary');
                        }}
                        data-testid={`saved-trip-${idx}`}
                      >
                        <div className="h-36 relative">
                          {img ? (
                            <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={trip.destination} />
                          ) : (
                            <div className="w-full h-full" style={{ background: gradient }} />
                          )}
                          <div className="absolute inset-0 bg-black/35" />
                          <Badge className="absolute top-3 right-3 bg-primary/80 text-white border-none backdrop-blur-sm text-xs">
                            {BUDGET_LABELS[trip.budget]}
                          </Badge>
                          <div className="absolute bottom-3 left-4 text-white">
                            <p className="font-bold text-sm">{trip.destination}</p>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="font-semibold text-sm mb-0.5 truncate">{trip.title}</p>
                          <p className="text-muted-foreground text-xs mb-3">
                            {trip.days} days · {COMPANION_LABELS[trip.companion]} · {savedDate}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-primary font-bold text-sm">
                              ${trip.totalBudget.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">View itinerary →</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mock Recent Trips */}
            <div>
              <h2 className="text-xl font-bold mb-4">Recent & Upcoming Trips</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Link href="/itinerary">
                  <Card className="overflow-hidden border-none shadow-lg card-hover cursor-pointer group">
                    <div className="h-32 relative">
                      <img src={tokyoImg} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Tokyo" />
                      <div className="absolute inset-0 bg-black/40" />
                      <Badge className="absolute top-3 right-3 bg-indigo-500 text-white border-none">Upcoming</Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-base">Tokyo, Japan</h3>
                      <p className="text-muted-foreground text-sm mb-3">Cultural Immersion · May 2026</p>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '20%' }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5">Planning in progress</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/itinerary">
                  <Card className="overflow-hidden border-none shadow-lg card-hover cursor-pointer group">
                    <div className="h-32 relative">
                      <img src={parisImg} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Paris" />
                      <div className="absolute inset-0 bg-black/40" />
                      <Badge className="absolute top-3 right-3 bg-primary text-white border-none">Completed</Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-base">Paris, France</h3>
                      <p className="text-muted-foreground text-sm mb-3">Romantic Getaway · Mar 2026</p>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '100%' }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5">Trip completed</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Budget Chart */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Spending by Destination</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SPEND_DATA} barSize={36}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={val => `$${val}`} tick={{ fontSize: 11 }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(109,40,217,0.05)' }}
                      contentStyle={{ borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                      formatter={(val: number) => [`$${val.toLocaleString()}`, 'Spent']}
                    />
                    <Bar dataKey="spend" fill="#6d28d9" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 fade-in-up-delay-3">
            <Card className="gradient-purple text-white border-none shadow-xl glow-purple overflow-hidden relative">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
              <CardContent className="p-8 relative z-10">
                <h3 className="text-lg font-bold mb-1">Next Adventure</h3>
                <p className="text-indigo-200 text-sm mb-6">Tokyo, Japan</p>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-5xl font-extrabold">42</div>
                    <div className="text-sm text-indigo-200">Days left</div>
                  </div>
                  <Plane size={44} className="opacity-30" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Planning Activity</CardTitle>
              </CardHeader>
              <CardContent className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MONTHLY_DATA}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="trips" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-5">
                <h3 className="font-semibold text-sm mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/create-trip">
                    <Button className="w-full gradient-purple text-white border-0 h-10 text-sm" data-testid="button-quick-plan">
                      <Plus size={15} className="mr-2" /> Plan New Trip
                    </Button>
                  </Link>
                  <Link href="/itinerary">
                    <Button variant="outline" className="w-full h-10 text-sm" data-testid="button-quick-view">
                      View Last Itinerary
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
