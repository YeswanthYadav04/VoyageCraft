import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Plane, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home">
          <Plane className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold gradient-text">VoyageCraft</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
          <Link href="/profile" className="text-sm font-medium hover:text-primary transition-colors">Profile</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="hover:text-primary">Login</Button>
          <Link href="/create-trip">
            <Button className="gradient-purple glow-button text-white border-0">Create Trip</Button>
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass bg-white/90 dark:bg-black/90 p-4 flex flex-col gap-4 shadow-lg border-t border-border">
          <Link href="/" onClick={() => setMobileOpen(false)} className="px-4 py-2 hover:bg-muted rounded-md">Home</Link>
          <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="px-4 py-2 hover:bg-muted rounded-md">Dashboard</Link>
          <Link href="/profile" onClick={() => setMobileOpen(false)} className="px-4 py-2 hover:bg-muted rounded-md">Profile</Link>
          <hr />
          <Button variant="ghost" className="w-full justify-start">Login</Button>
          <Link href="/create-trip" onClick={() => setMobileOpen(false)}>
            <Button className="w-full gradient-purple text-white">Create Trip</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
