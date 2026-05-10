import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bookmark, MapPin, Settings } from 'lucide-react';

import parisImg from '@/assets/paris.png';
import tokyoImg from '@/assets/tokyo.png';
import santoriniImg from '@/assets/santorini.png';

export default function Profile() {
  return (
    <div className="min-h-screen bg-muted/20 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 fade-in-up">
          <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground font-bold">AJ</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold mb-2">Alex Johnson</h1>
            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mb-4">
              <MapPin size={16} /> San Francisco, CA • Joined Jan 2025
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <div className="text-center px-4 py-2 bg-card rounded-xl shadow-sm border border-border/50">
                <div className="font-bold text-lg text-primary">12</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Trips</div>
              </div>
              <div className="text-center px-4 py-2 bg-card rounded-xl shadow-sm border border-border/50">
                <div className="font-bold text-lg text-primary">8</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Countries</div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2">
            <Settings size={16} /> Edit Profile
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8 fade-in-up-delay-1">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Bookmark className="text-primary" /> Saved Trips
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'Paris', img: parisImg, tags: 'Luxury • 5 Days' },
                  { name: 'Tokyo', img: tokyoImg, tags: 'Culture • 10 Days' },
                  { name: 'Santorini', img: santoriniImg, tags: 'Relaxation • 7 Days' }
                ].map((trip, i) => (
                  <Card key={i} className="overflow-hidden border-none shadow-md card-hover group">
                    <div className="h-40 relative">
                      <img src={trip.img} alt={trip.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-bold text-lg">{trip.name}</h3>
                        <p className="text-white/80 text-xs">{trip.tags}</p>
                      </div>
                      <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors">
                        <Bookmark size={16} fill="currentColor" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Travel Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-muted-foreground mb-3 block">Preferred Destinations</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="px-3 py-1">Europe</Badge>
                      <Badge variant="secondary" className="px-3 py-1">Asia</Badge>
                      <Badge variant="secondary" className="px-3 py-1">Oceania</Badge>
                      <Badge variant="outline" className="px-3 py-1 border-dashed">+ Add</Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-3 block">Travel Style</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-primary hover:bg-primary px-3 py-1">Adventure</Badge>
                      <Badge className="bg-indigo-500 hover:bg-indigo-500 px-3 py-1">Culture</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="fade-in-up-delay-2">
            <Card className="border-none shadow-md sticky top-24">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input defaultValue="Alex Johnson" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="alex@example.com" type="email" />
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <Label className="text-muted-foreground block mb-2">Notifications</Label>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="n1" className="font-normal">Email updates</Label>
                    <Switch id="n1" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="n2" className="font-normal">Trip reminders</Label>
                    <Switch id="n2" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="n3" className="font-normal">AI suggestions</Label>
                    <Switch id="n3" defaultChecked />
                  </div>
                </div>

                <Button className="w-full gradient-purple text-white mt-4">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
