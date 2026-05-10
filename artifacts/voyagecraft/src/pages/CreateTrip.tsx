import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { MapPin, Users, Heart, User, Coffee, TreePine, ShoppingBag, Utensils, Music, Landmark, Plane, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { DESTINATION_LIST } from '@/data/destinations';
import { useAuth } from '@/contexts/AuthContext';

const BUDGETS = [
  { id: 'budget', label: 'Budget', desc: '< $500', icon: '🎒' },
  { id: 'moderate', label: 'Moderate', desc: '$500 – $2,000', icon: '✈️' },
  { id: 'premium', label: 'Premium', desc: '$2,000 – $5,000', icon: '💎' },
  { id: 'luxury', label: 'Luxury', desc: '$5,000+', icon: '👑' },
];

const COMPANIONS = [
  { id: 'solo', label: 'Solo', icon: User, desc: 'Just me' },
  { id: 'couple', label: 'Couple', icon: Heart, desc: '2 travelers' },
  { id: 'family', label: 'Family', icon: Users, desc: '4–5 travelers' },
  { id: 'friends', label: 'Friends', icon: Users, desc: '4–6 travelers' },
];

const INTERESTS = [
  { id: 'adventure', label: 'Adventure', icon: TreePine },
  { id: 'culture', label: 'Culture', icon: Landmark },
  { id: 'food', label: 'Food & Dining', icon: Utensils },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'relaxation', label: 'Relaxation', icon: Coffee },
  { id: 'nature', label: 'Nature', icon: TreePine },
  { id: 'nightlife', label: 'Nightlife', icon: Music },
  { id: 'history', label: 'History', icon: Landmark },
];

const LOADING_MESSAGES = [
  'Analyzing top destinations...',
  'Optimizing your route...',
  'Finding the best hotels...',
  'Personalizing for your travel style...',
  'Calculating budget breakdown...',
  'Finalizing your AI itinerary...',
];

export default function CreateTrip() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState('moderate');
  const [companion, setCompanion] = useState('couple');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const inputRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = destination.length > 0
    ? DESTINATION_LIST.filter(d =>
        d.name.toLowerCase().includes(destination.toLowerCase()) ||
        d.country.toLowerCase().includes(destination.toLowerCase())
      )
    : DESTINATION_LIST;

  const handleInterestToggle = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (step === 3) {
      let progress = 0;
      let msgIdx = 0;

      const progressInterval = setInterval(() => {
        progress += 2;
        setLoadingProgress(Math.min(progress, 98));
        if (progress >= 100) clearInterval(progressInterval);
      }, 60);

      const msgInterval = setInterval(() => {
        msgIdx++;
        setLoadingMsg(msgIdx % LOADING_MESSAGES.length);
      }, 500);

      const navTimer = setTimeout(() => {
        const tripData = { destination, days, budget, companion, interests: selectedInterests };
        localStorage.setItem('voyagecraft_current_trip', JSON.stringify(tripData));
        setLocation('/itinerary');
      }, 3200);

      return () => {
        clearInterval(progressInterval);
        clearInterval(msgInterval);
        clearTimeout(navTimer);
      };
    }
  }, [step, destination, days, budget, companion, selectedInterests, setLocation]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between mb-2 text-sm font-medium text-muted-foreground">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {['Trip Details', 'Travel Style', 'Generating'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i ? 'gradient-purple text-white' : step === i + 1 ? 'border-2 border-primary text-primary' : 'border-2 border-muted text-muted-foreground'}`}>
                  {step > i ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-xl border border-border/50">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-8 fade-in-up">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">Where to?</h1>
                <p className="text-muted-foreground">Tell us your dream destination and we'll craft the perfect trip</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Destination</label>
                <div className="relative" ref={inputRef}>
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                  <Input
                    value={destination}
                    onChange={e => { setDestination(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="e.g. Tokyo, Bali, Paris..."
                    className="pl-12 pr-10 h-14 text-base bg-muted/50 border-transparent focus:bg-background"
                    data-testid="input-destination"
                  />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
                      {filteredSuggestions.map(dest => (
                        <button
                          key={dest.id}
                          onClick={() => { setDestination(dest.name); setShowSuggestions(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                          data-testid={`suggestion-${dest.id}`}
                        >
                          <span className="text-2xl">{dest.emoji}</span>
                          <div>
                            <div className="font-semibold text-sm">{dest.name}</div>
                            <div className="text-xs text-muted-foreground">{dest.country}</div>
                          </div>
                        </button>
                      ))}
                      {filteredSuggestions.length === 0 && (
                        <div className="px-4 py-3 text-sm text-muted-foreground">No matching destinations — we'll generate a custom itinerary</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold flex justify-between items-center">
                  <span>Duration</span>
                  <span className="text-primary font-bold text-base">{days} {days === 1 ? 'Day' : 'Days'}</span>
                </label>
                <Slider
                  value={[days]}
                  onValueChange={v => setDays(v[0])}
                  min={1}
                  max={14}
                  step={1}
                  className="py-4"
                  data-testid="slider-days"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 day</span>
                  <span>Weekend</span>
                  <span>1 week</span>
                  <span>2 weeks</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold">Budget Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {BUDGETS.map(b => (
                    <Card
                      key={b.id}
                      className={`p-4 cursor-pointer transition-all border-2 text-center ${budget === b.id ? 'border-primary bg-primary/5 shadow-md' : 'border-transparent hover:border-primary/30 hover:bg-muted'}`}
                      onClick={() => setBudget(b.id)}
                      data-testid={`budget-${b.id}`}
                    >
                      <div className="text-2xl mb-1">{b.icon}</div>
                      <h4 className="font-semibold text-sm">{b.label}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!destination.trim()}
                className="w-full h-14 text-lg gradient-purple text-white glow-button border-0"
                data-testid="button-step1-continue"
              >
                Continue <span className="ml-2">→</span>
              </Button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-8 fade-in-up">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">Who's joining?</h1>
                <p className="text-muted-foreground">We'll tailor activities, hotels, and dining to your group</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {COMPANIONS.map(c => (
                  <Card
                    key={c.id}
                    className={`p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all border-2 ${companion === c.id ? 'border-primary bg-primary/5 shadow-md' : 'border-transparent hover:border-primary/30 hover:bg-muted'}`}
                    onClick={() => setCompanion(c.id)}
                    data-testid={`companion-${c.id}`}
                  >
                    <div className={`p-3 rounded-2xl ${companion === c.id ? 'bg-primary/10' : 'bg-muted'}`}>
                      <c.icon className={`h-8 w-8 ${companion === c.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="text-center">
                      <span className="font-bold block">{c.label}</span>
                      <span className="text-xs text-muted-foreground">{c.desc}</span>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold">Interests & Activities</label>
                <div className="flex flex-wrap gap-2.5">
                  {INTERESTS.map(i => (
                    <button
                      key={i.id}
                      onClick={() => handleInterestToggle(i.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                        selectedInterests.includes(i.id)
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                          : 'bg-background border-border hover:border-primary/50 hover:bg-muted'
                      }`}
                      data-testid={`interest-${i.id}`}
                    >
                      <i.icon size={14} />
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-2xl p-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Plane size={16} className="text-primary" />
                  <span>
                    <strong className="text-foreground">{destination}</strong> · {days} days · {BUDGETS.find(b => b.id === budget)?.label} · {COMPANIONS.find(c => c.id === companion)?.label}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="h-14 px-8 rounded-xl">← Back</Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 h-14 text-lg gradient-purple text-white glow-button border-0"
                  data-testid="button-generate"
                >
                  Generate My Trip →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 — Loading */}
          {step === 3 && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-10">
              <div className="relative">
                <div className="w-28 h-28 rounded-full border-4 border-muted border-t-primary animate-spin" />
                <div className="w-20 h-20 rounded-full border-4 border-muted border-b-indigo-500 animate-spin absolute top-4 left-4" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary h-8 w-8" />
              </div>

              <div className="space-y-3 max-w-sm">
                <h2 className="text-2xl font-extrabold">
                  Curating your AI travel experience
                </h2>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  {LOADING_MESSAGES[loadingMsg]}
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-4 text-sm text-muted-foreground">
                  <span className="bg-muted px-3 py-1 rounded-full">{destination}</span>
                  <span className="bg-muted px-3 py-1 rounded-full">{days} days</span>
                  <span className="bg-muted px-3 py-1 rounded-full capitalize">{budget}</span>
                  <span className="bg-muted px-3 py-1 rounded-full capitalize">{companion}</span>
                </div>
              </div>

              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Generating itinerary</span>
                  <span>{loadingProgress}%</span>
                </div>
                <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full transition-all duration-100"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {!user && step < 3 && (
          <p className="text-center text-muted-foreground text-sm mt-6">
            <button onClick={() => setLocation('/login')} className="text-primary hover:underline font-medium">Sign in</button> to save your trips and access your dashboard
          </p>
        )}
      </div>
    </div>
  );
}
