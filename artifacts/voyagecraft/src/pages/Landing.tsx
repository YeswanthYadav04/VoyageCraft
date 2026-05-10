import { Link } from 'wouter';
import { ArrowRight, Compass, CreditCard, Route, MapPin, Calendar, CheckCircle2, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import parisImg from '@/assets/paris.png';
import tokyoImg from '@/assets/tokyo.png';
import sydneyImg from '@/assets/sydney.png';
import baliImg from '@/assets/bali.png';
import newyorkImg from '@/assets/newyork.png';
import santoriniImg from '@/assets/santorini.png';

const DESTINATIONS = [
  { name: 'Paris', country: 'France', img: parisImg, days: '5 Days' },
  { name: 'Tokyo', country: 'Japan', img: tokyoImg, days: '10 Days' },
  { name: 'Sydney', country: 'Australia', img: sydneyImg, days: '7 Days' },
  { name: 'Bali', country: 'Indonesia', img: baliImg, days: '8 Days' },
  { name: 'New York', country: 'USA', img: newyorkImg, days: '4 Days' },
  { name: 'Santorini', country: 'Greece', img: santoriniImg, days: '6 Days' },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero overflow-hidden px-4">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[80px] float-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/30 rounded-full blur-[100px] float-animation-delay"></div>
        
        <div className="container mx-auto max-w-6xl z-10 grid md:grid-cols-2 gap-12 items-center pt-20">
          <div className="text-left fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
              Design Your Dream Getaway <br />
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300">in Seconds</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-lg">
              Powered by AI, designed for explorers. Plan personalized trips with smart routes, budget control, and local insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/create-trip" data-testid="link-create-trip-hero">
                <Button size="lg" className="gradient-purple glow-button text-white border-0 text-lg px-8 h-14 rounded-full" data-testid="button-start-planning">
                  Start Planning <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="glass text-white border-white/30 hover:bg-white/10 text-lg px-8 h-14 rounded-full" data-testid="button-how-it-works">
                See How It Works
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block fade-in-up-delay-2 relative h-[500px]">
            <div className="absolute inset-0 glass-dark rounded-2xl p-6 border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-black/40 rounded-xl p-4 mb-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Compass className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Route Optimization</h3>
                  <p className="text-indigo-200 text-sm">Generating fastest paths...</p>
                </div>
              </div>
              <img src={sydneyImg} alt="Sydney" className="w-full h-48 object-cover rounded-xl mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Route, title: 'Smart Routes', desc: 'AI-optimized route planning with time-saving algorithms to maximize your experience.' },
              { icon: CreditCard, title: 'Budget Control', desc: 'Real-time budget tracking and cost optimization for accommodations and activities.' },
              { icon: Compass, title: 'Personalized Trips', desc: 'Tailored perfectly to your travel style, personal preferences, and desired pace.' }
            ].map((f, i) => (
              <Card key={i} className="card-hover border-border/50 bg-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                    <f.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Your personal AI travel concierge takes the hassle out of planning. Just three simple steps to your dream vacation.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border -z-10"></div>
            
            {[
              { icon: MapPin, step: '01', title: 'Tell us your destination', desc: 'Input where you want to go, when, and who you are traveling with.' },
              { icon: Compass, step: '02', title: 'AI creates your itinerary', desc: 'Our smart algorithms build a fully personalized day-by-day plan.' },
              { icon: CheckCircle2, step: '03', title: 'Book and enjoy', desc: 'Review your complete trip, make adjustments, and start exploring.' }
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-24 h-24 mx-auto bg-background rounded-full border-4 border-background shadow-xl flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 m-1"></div>
                  <step.icon className="h-8 w-8 text-primary relative z-10" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full gradient-purple text-white flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Popular Destinations</h2>
              <p className="text-muted-foreground">Discover where our travelers are heading next.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer card-hover shadow-md" data-testid={`card-destination-${dest.name.toLowerCase()}`}>
                <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-indigo-200 text-sm font-medium mb-1">{dest.country}</p>
                      <h3 className="text-white text-2xl font-bold">{dest.name}</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm">
                      {dest.days}
                    </div>
                  </div>
                  <div className="overflow-hidden h-0 group-hover:h-12 transition-all duration-300 mt-4">
                    <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 p-0 w-full justify-start" data-testid={`button-explore-${dest.name.toLowerCase()}`}>
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Traveler Stories</h2>
            <p className="text-muted-foreground">Hear from explorers who used VoyageCraft for their adventures.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", initial: "SJ", trip: "10 Days in Japan", quote: "VoyageCraft completely removed the stress of planning my Tokyo trip. The route optimization saved me hours of transit time!" },
              { name: "Marcus Thorne", initial: "MT", trip: "European Backpacking", quote: "The budget tracking feature is a lifesaver. I managed to do Paris, Rome, and Berlin under my $3000 limit thanks to the AI." },
              { name: "Elena Rodriguez", initial: "ER", trip: "Bali Honeymoon", quote: "It felt like having a luxury travel agent. The recommendations were perfectly tailored to what my husband and I love." }
            ].map((t, i) => (
              <Card key={i} className="border-none shadow-lg bg-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10"></div>
                <CardContent className="p-8 relative">
                  <Quote className="text-primary/20 w-12 h-12 absolute top-6 right-6" />
                  <div className="flex gap-1 text-yellow-400 mb-6">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-foreground leading-relaxed mb-8 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">{t.initial}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-sm text-muted-foreground">{t.trip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border pt-16 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Compass className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold gradient-text">VoyageCraft</span>
              </Link>
              <p className="text-sidebar-foreground/60 max-w-sm mb-6">
                Your AI-powered personal travel concierge. We make planning complex trips simple, beautiful, and completely personalized.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/create-trip" className="text-sidebar-foreground/60 hover:text-primary transition-colors">Plan a Trip</Link></li>
                <li><Link href="/dashboard" className="text-sidebar-foreground/60 hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="#" className="text-sidebar-foreground/60 hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sidebar-foreground/60 hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-sidebar-foreground/60 hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sidebar-foreground/60 hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-sidebar-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-sidebar-foreground/60">
            <p>© {new Date().getFullYear()} VoyageCraft. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
