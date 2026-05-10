import { MapPin, Calendar, Users, DollarSign, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import sydneyImg from '@/assets/sydney.png';

const DATA = [
  { name: 'Accommodation', value: 40, color: '#6d28d9' },
  { name: 'Activities', value: 25, color: '#4f46e5' },
  { name: 'Food', value: 20, color: '#a78bfa' },
  { name: 'Transport', value: 15, color: '#818cf8' },
];

export default function Itinerary() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img src={sydneyImg} alt="Sydney" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto max-w-6xl fade-in-up">
            <Badge className="bg-primary/20 text-white hover:bg-primary/30 border border-primary/50 mb-4 backdrop-blur-md">
              AI Optimized
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Sydney Adventure</h1>
            <p className="text-xl text-indigo-100 flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1"><Calendar size={20} /> 7 Days</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Users size={20} /> 2 Travelers</span>
              <span>•</span>
              <span className="flex items-center gap-1"><DollarSign size={20} /> Premium Experience</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 mt-8 grid md:grid-cols-12 gap-8">
        {/* Timeline - Left Column */}
        <div className="md:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Itinerary</h2>
            <div className="flex gap-2">
              <Badge variant="outline">Map View</Badge>
              <Badge variant="secondary">Export</Badge>
            </div>
          </div>

          {/* Day 1 */}
          <Card className="border-border shadow-sm overflow-hidden card-hover">
            <div className="bg-muted px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Day 1: Iconic Sydney</h3>
              <span className="text-sm text-muted-foreground">Thu, Oct 12</span>
            </div>
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>
                
                <div className="p-6 relative">
                  <div className="absolute left-[1.625rem] w-3 h-3 bg-primary rounded-full ring-4 ring-background"></div>
                  <div className="pl-12">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1">
                      <Clock size={14} /> 9:00 AM
                    </div>
                    <h4 className="font-bold text-lg mb-2">Sydney Opera House</h4>
                    <p className="text-muted-foreground mb-4">UNESCO World Heritage Site, guided tour inside the opera hall. Experience the architectural marvel up close.</p>
                    <div className="h-32 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 w-full mb-4"></div>
                  </div>
                </div>

                <div className="p-6 relative">
                  <div className="absolute left-[1.625rem] w-3 h-3 bg-primary rounded-full ring-4 ring-background"></div>
                  <div className="pl-12">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1">
                      <Clock size={14} /> 1:00 PM
                    </div>
                    <h4 className="font-bold text-lg mb-2">Harbour Bridge Climb</h4>
                    <p className="text-muted-foreground">Panoramic views from the top of the iconic bridge. A thrilling 3-hour guided ascent.</p>
                  </div>
                </div>

                <div className="p-6 relative pb-8">
                  <div className="absolute left-[1.625rem] w-3 h-3 bg-primary rounded-full ring-4 ring-background"></div>
                  <div className="pl-12">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1">
                      <Clock size={14} /> 6:00 PM
                    </div>
                    <h4 className="font-bold text-lg mb-2">Bondi Beach Sunset</h4>
                    <p className="text-muted-foreground">Watch the famous sunset, followed by a premium seafood dinner at Icebergs Dining Room.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day 2 */}
          <Card className="border-border shadow-sm overflow-hidden card-hover">
            <div className="bg-muted px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Day 2: Blue Mountains & Harbour</h3>
              <span className="text-sm text-muted-foreground">Fri, Oct 13</span>
            </div>
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>
                <div className="p-6 relative">
                  <div className="absolute left-[1.625rem] w-3 h-3 bg-primary rounded-full ring-4 ring-background"></div>
                  <div className="pl-12">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1">
                      <Clock size={14} /> 8:00 AM
                    </div>
                    <h4 className="font-bold text-lg mb-2">Blue Mountains National Park</h4>
                    <p className="text-muted-foreground">Visit the Three Sisters rock formation and scenic lookouts. Includes private transport.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 space-y-6">
          <Card className="gradient-purple text-white border-0 shadow-lg glow-purple">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin size={20} /> Trip Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-2">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="text-white/80">Total Budget</span>
                  <span className="font-bold text-xl">$4,250</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="text-white/80">Style</span>
                  <span className="font-medium">Premium</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Pace</span>
                  <span className="font-medium">Moderate</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hotel Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-xl p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold">The Darling</h4>
                    <p className="text-sm text-muted-foreground">Star Sydney District</p>
                  </div>
                  <div className="flex text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-primary">$280 / night</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                {DATA.map(d => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
