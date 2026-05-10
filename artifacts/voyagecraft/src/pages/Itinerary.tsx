import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { MapPin, Calendar, Users, DollarSign, Star, Clock, Bookmark, ArrowLeft, Plane, Wifi, Coffee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  findDestination,
  getTripDays,
  calculateTotalBudget,
  getTravelerCount,
  BUDGET_LABELS,
  COMPANION_LABELS,
  type DestinationInfo,
} from '@/data/destinations';
import { useAuth } from '@/contexts/AuthContext';

interface TripData {
  destination: string;
  days: number;
  budget: string;
  companion: string;
  interests: string[];
}

const FALLBACK_GRADIENT = 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)';

const PIE_COLORS = ['#6d28d9', '#4f46e5', '#a78bfa', '#818cf8'];

function formatCurrency(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n.toLocaleString()}`;
}

export default function Itinerary() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [trip, setTrip] = useState<TripData | null>(null);
  const [dest, setDest] = useState<DestinationInfo | null>(null);
  const [saved, setSaved] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number>(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('voyagecraft_current_trip');
    if (raw) {
      try {
        const data: TripData = JSON.parse(raw);
        setTrip(data);
        const found = findDestination(data.destination);
        setDest(found);
      } catch {
        setLocation('/create-trip');
      }
    } else {
      setLocation('/create-trip');
    }
  }, [setLocation]);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  const tripDays = dest ? getTripDays(dest, trip.days) : [];
  const totalBudget = dest ? calculateTotalBudget(dest, trip.days, trip.budget, trip.companion) : 0;
  const hotel = dest?.hotels[trip.budget] || null;
  const heroGradient = dest?.heroGradient || FALLBACK_GRADIENT;
  const budgetBreakdown = dest?.budgetBreakdown[trip.budget] || { accommodation: 40, activities: 25, food: 20, transport: 15 };
  const transport = dest?.transport[trip.budget] || 'Local transport';

  const tripTitle = dest
    ? dest.groupTitles[trip.companion] || `${dest.name} ${COMPANION_LABELS[trip.companion]}`
    : `${trip.destination} Adventure`;

  const tripDesc = dest
    ? dest.groupDescriptions[trip.companion]
    : `A ${trip.days}-day ${trip.budget} trip to ${trip.destination}.`;

  const pieData = [
    { name: 'Accommodation', value: budgetBreakdown.accommodation, color: PIE_COLORS[0] },
    { name: 'Activities', value: budgetBreakdown.activities, color: PIE_COLORS[1] },
    { name: 'Food', value: budgetBreakdown.food, color: PIE_COLORS[2] },
    { name: 'Transport', value: budgetBreakdown.transport, color: PIE_COLORS[3] },
  ];

  function handleSave() {
    if (!user) { setLocation('/login'); return; }
    const savedTrips: object[] = JSON.parse(localStorage.getItem('voyagecraft_saved_trips') || '[]');
    const entry = { ...trip, title: tripTitle, totalBudget, savedAt: new Date().toISOString() };
    localStorage.setItem('voyagecraft_saved_trips', JSON.stringify([entry, ...savedTrips]));
    setSaved(true);
  }

  const imageUrl = dest ? `/src/assets/${dest.id.replace(' ', '-').replace('-', '')}.png` : null;
  const validImage = imageUrl && !imgError;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Banner */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        {validImage ? (
          <img
            src={imageUrl}
            alt={trip.destination}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0" style={{ background: heroGradient }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />

        {/* Back button */}
        <button
          onClick={() => setLocation('/create-trip')}
          className="absolute top-20 left-6 glass text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-white/20 transition-all"
          data-testid="button-back"
        >
          <ArrowLeft size={16} /> New Trip
        </button>

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`absolute top-20 right-6 glass text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${saved ? 'bg-primary/40 border border-primary/50' : 'hover:bg-white/20'}`}
          data-testid="button-save-trip"
        >
          <Bookmark size={16} fill={saved ? 'white' : 'none'} />
          {saved ? 'Saved!' : 'Save Trip'}
        </button>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/30 text-white border border-primary/40 backdrop-blur-md">AI Optimized</Badge>
              <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-md">{BUDGET_LABELS[trip.budget]}</Badge>
              <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-md capitalize">{trip.companion}</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight">
              {tripTitle}
            </h1>
            <p className="text-white/80 text-base max-w-xl mb-4 leading-relaxed">{tripDesc}</p>
            <div className="flex items-center gap-4 flex-wrap text-white/90 text-sm font-medium">
              <span className="flex items-center gap-1.5"><Calendar size={16} /> {trip.days} {trip.days === 1 ? 'Day' : 'Days'}</span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5"><Users size={16} /> {getTravelerCount(trip.companion)}</span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5"><MapPin size={16} /> {dest ? `${dest.name}, ${dest.country}` : trip.destination}</span>
              {totalBudget > 0 && (
                <>
                  <span className="text-white/40">•</span>
                  <span className="flex items-center gap-1.5"><DollarSign size={16} /> {formatCurrency(totalBudget)} total</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 mt-10 grid md:grid-cols-12 gap-8">

        {/* LEFT: Timeline */}
        <div className="md:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-extrabold">Your {trip.days}-Day Itinerary</h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer">Map View</Badge>
              <Badge variant="secondary" className="cursor-pointer">Export PDF</Badge>
            </div>
          </div>

          {tripDays.length > 0 ? tripDays.map((day, dayIdx) => (
            <Card key={dayIdx} className="border-border shadow-sm overflow-hidden card-hover">
              <button
                className="w-full text-left"
                onClick={() => setExpandedDay(expandedDay === dayIdx ? -1 : dayIdx)}
                data-testid={`button-day-${dayIdx + 1}`}
              >
                <div className={`px-6 py-4 border-b flex justify-between items-center transition-colors ${expandedDay === dayIdx ? 'bg-primary/5' : 'bg-muted/50 hover:bg-muted'}`}>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full gradient-purple text-white text-xs font-bold flex items-center justify-center">
                        {dayIdx + 1}
                      </div>
                      <h3 className="font-bold text-base">Day {dayIdx + 1}: {day.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-10">{day.theme} · {day.activities.length} activities</p>
                  </div>
                  <div className={`text-muted-foreground transition-transform duration-300 ${expandedDay === dayIdx ? 'rotate-180' : ''}`}>
                    ▾
                  </div>
                </div>
              </button>

              {expandedDay === dayIdx && (
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="absolute left-[2.15rem] top-0 bottom-0 w-px bg-border" />
                    {day.activities.map((activity, actIdx) => (
                      <div key={actIdx} className="p-6 relative">
                        <div className="absolute left-[1.625rem] w-4 h-4 bg-primary rounded-full ring-4 ring-background flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                        <div className="pl-12">
                          <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-1">
                            <Clock size={13} /> {activity.time}
                          </div>
                          <h4 className="font-bold text-base mb-1.5">{activity.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )) : (
            /* Fallback for unknown destinations */
            Array.from({ length: Math.min(trip.days, 5) }, (_, i) => (
              <Card key={i} className="border-border shadow-sm overflow-hidden card-hover">
                <div className="px-6 py-4 border-b bg-muted/50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full gradient-purple text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-base">Day {i + 1}: Explore {trip.destination}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm">Your AI-curated activities for {trip.destination} on day {i + 1} will be tailored to your {trip.companion} travel style and {trip.budget} budget.</p>
                </CardContent>
              </Card>
            ))
          )}

          <Button
            className="w-full h-12 gradient-purple text-white glow-button border-0 mt-4"
            onClick={() => setLocation('/create-trip')}
            data-testid="button-new-trip"
          >
            <Plane size={16} className="mr-2" /> Plan Another Trip
          </Button>
        </div>

        {/* RIGHT: Sidebar */}
        <div className="md:col-span-4 space-y-5">

          {/* Trip Summary Card */}
          <Card className="gradient-purple text-white border-0 shadow-lg glow-purple overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin size={18} /> Trip Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3 mt-1">
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="text-white/70 text-sm">Total Budget</span>
                  <span className="font-extrabold text-2xl">{formatCurrency(totalBudget)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                  <span className="text-white/70">Destination</span>
                  <span className="font-semibold">{dest ? dest.name : trip.destination}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                  <span className="text-white/70">Duration</span>
                  <span className="font-semibold">{trip.days} {trip.days === 1 ? 'day' : 'days'}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                  <span className="text-white/70">Style</span>
                  <span className="font-semibold">{BUDGET_LABELS[trip.budget]}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                  <span className="text-white/70">Group</span>
                  <span className="font-semibold capitalize">{COMPANION_LABELS[trip.companion]}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70">Transport</span>
                  <span className="font-semibold text-right text-xs max-w-[140px]">{transport}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hotel Card */}
          {hotel && (
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recommended Hotel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/60 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-sm">{hotel.name}</h4>
                      <p className="text-xs text-muted-foreground">{hotel.location}</p>
                    </div>
                    <div className="flex text-yellow-400 gap-0.5">
                      {Array.from({ length: hotel.stars }, (_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{hotel.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-primary">${hotel.pricePerNight} / night</span>
                    <span className="text-xs text-muted-foreground">{trip.days} nights = {formatCurrency(hotel.pricePerNight * trip.days)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {hotel.amenities.slice(0, 4).map(a => (
                      <span key={a} className="text-xs bg-background border border-border px-2 py-0.5 rounded-full flex items-center gap-1">
                        {a.includes('WiFi') ? <Wifi size={10} /> : a.includes('Pool') || a.includes('Spa') ? <Coffee size={10} /> : null}
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Budget Breakdown */}
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={68}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                      formatter={(val: number) => [`${val}%`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {pieData.map(d => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-muted-foreground">{d.name}</span>
                    <span className="font-semibold ml-auto">{d.value}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Per day estimate</span>
                  <span className="font-bold text-primary">
                    {formatCurrency(Math.round(totalBudget / trip.days))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Destination Info */}
          {dest && (
            <Card className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-semibold">{dest.country}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Currency</span>
                  <span className="font-semibold">{dest.currency}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Time Zone</span>
                  <span className="font-semibold text-right text-xs">{dest.timezone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Best For</span>
                  <span className="font-semibold capitalize">{COMPANION_LABELS[trip.companion]}</span>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
