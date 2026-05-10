import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { MapPin, Users, Heart, User, Coffee, TreePine, ShoppingBag, Utensils, Music, Landmark, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

const BUDGETS = [
  { id: 'budget', label: 'Budget', desc: '< $500' },
  { id: 'moderate', label: 'Moderate', desc: '$500 - $2000' },
  { id: 'premium', label: 'Premium', desc: '$2000 - $5000' },
  { id: 'luxury', label: 'Luxury', desc: '$5000+' },
];

const COMPANIONS = [
  { id: 'solo', label: 'Solo', icon: User },
  { id: 'couple', label: 'Couple', icon: Heart },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'friends', label: 'Friends', icon: Users },
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

export default function CreateTrip() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(7);
  const [budget, setBudget] = useState('premium');
  const [companion, setCompanion] = useState('couple');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestToggle = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setLocation('/itinerary');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, setLocation]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between mb-2 text-sm font-medium text-muted-foreground">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500 ease-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-xl border border-border/50 fade-in-up">
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Where to?</h1>
                <p className="text-muted-foreground">Tell us your dream destination</p>
              </div>
              
              <div className="space-y-4">
                <label className="text-sm font-semibold">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Sydney, Australia" 
                    className="pl-12 h-14 text-lg bg-muted/50 border-transparent focus:bg-background"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold flex justify-between">
                  <span>Duration</span>
                  <span className="text-primary">{days} Days</span>
                </label>
                <Slider 
                  value={[days]} 
                  onValueChange={(v) => setDays(v[0])} 
                  min={1} 
                  max={30} 
                  step={1} 
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold">Budget Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {BUDGETS.map(b => (
                    <Card 
                      key={b.id} 
                      className={`p-4 cursor-pointer transition-all border-2 ${budget === b.id ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/30 hover:bg-muted'}`}
                      onClick={() => setBudget(b.id)}
                    >
                      <h4 className="font-semibold">{b.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setStep(2)} 
                disabled={!destination}
                className="w-full h-14 text-lg gradient-purple text-white glow-button"
              >
                Continue <span className="ml-2">→</span>
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Who's joining?</h1>
                <p className="text-muted-foreground">Select your travel style</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {COMPANIONS.map(c => (
                  <Card 
                    key={c.id} 
                    className={`p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all border-2 ${companion === c.id ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/30 hover:bg-muted'}`}
                    onClick={() => setCompanion(c.id)}
                  >
                    <c.icon className={`h-8 w-8 ${companion === c.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-semibold">{c.label}</span>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold">Interests & Activities</label>
                <div className="flex flex-wrap gap-3">
                  {INTERESTS.map(i => (
                    <button
                      key={i.id}
                      onClick={() => handleInterestToggle(i.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                        selectedInterests.includes(i.id) 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-background border-border hover:border-primary/50 hover:bg-muted'
                      }`}
                    >
                      <i.icon size={16} />
                      <span className="text-sm font-medium">{i.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="h-14 px-8">Back</Button>
                <Button 
                  onClick={() => setStep(3)} 
                  className="flex-1 h-14 text-lg gradient-purple text-white glow-button"
                >
                  Generate My Trip <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-muted border-t-primary animate-spin"></div>
                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary h-8 w-8 animate-pulse" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">Curating your AI travel experience…</h2>
                <p className="text-muted-foreground animate-pulse">Analyzing top destinations and optimizing routes...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
