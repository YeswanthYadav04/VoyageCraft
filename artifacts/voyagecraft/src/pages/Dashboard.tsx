import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, Map, Camera, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Link } from 'wouter';

import parisImg from '@/assets/paris.png';
import tokyoImg from '@/assets/tokyo.png';
import sydneyImg from '@/assets/sydney.png';

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

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-muted/20 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 fade-in-up">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex! 👋</h1>
          <p className="text-muted-foreground mt-2">Here's an overview of your travels and upcoming adventures.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 fade-in-up-delay-1">
          <Card className="border-none shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Plane size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Trips Planned</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
                <Globe size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Countries</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
                <Map size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Miles</p>
                <h3 className="text-2xl font-bold">24.5k</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-pink-500/10 text-pink-500 rounded-xl">
                <Camera size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Memories</p>
                <h3 className="text-2xl font-bold">847</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trips & Charts */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8 fade-in-up-delay-2">
            <h2 className="text-2xl font-bold">Recent & Upcoming Trips</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/itinerary">
                <Card className="overflow-hidden border-none shadow-lg card-hover cursor-pointer group">
                  <div className="h-32 relative">
                    <img src={tokyoImg} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Tokyo" />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <Badge className="absolute top-4 right-4 bg-indigo-500 text-white border-none">Upcoming</Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg">Tokyo, Japan</h3>
                    <p className="text-muted-foreground text-sm mb-3">Cultural Immersion • May 2026</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{width: '20%'}}></div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/itinerary">
                <Card className="overflow-hidden border-none shadow-lg card-hover cursor-pointer group">
                  <div className="h-32 relative">
                    <img src={parisImg} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Paris" />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <Badge className="absolute top-4 right-4 bg-primary text-white border-none">Completed</Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg">Paris, France</h3>
                    <p className="text-muted-foreground text-sm mb-3">Romantic Getaway • Mar 2026</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Spending by Destination</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SPEND_DATA}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                    <Bar dataKey="spend" fill="#6d28d9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 fade-in-up-delay-3">
            <Card className="gradient-purple text-white border-none shadow-xl glow-purple">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">Next Adventure</h3>
                <p className="text-indigo-200 mb-6">Tokyo, Japan</p>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-4xl font-extrabold">42</div>
                    <div className="text-sm text-indigo-200">Days left</div>
                  </div>
                  <Plane size={48} className="opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Planning Activity</CardTitle>
              </CardHeader>
              <CardContent className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MONTHLY_DATA}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{borderRadius: '8px'}} />
                    <Line type="monotone" dataKey="trips" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5'}} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
}
