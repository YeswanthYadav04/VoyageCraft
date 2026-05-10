import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Plane, Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const isHeroPage = location === '/';

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
  }

  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHeroPage
          ? 'glass shadow-sm py-3 border-b border-white/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home">
          <Plane className={`h-6 w-6 ${isHeroPage && !scrolled ? 'text-violet-300' : 'text-primary'}`} />
          <span className={`text-xl font-bold ${isHeroPage && !scrolled ? 'text-white' : 'gradient-text'}`}>
            VoyageCraft
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/', label: 'Home' },
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/create-trip', label: 'Plan a Trip' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                location === href
                  ? 'text-primary'
                  : isHeroPage && !scrolled
                  ? 'text-white/80 hover:text-white'
                  : 'hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full pl-1 pr-4 py-1 transition-all"
                data-testid="button-user-menu"
              >
                <div className="w-8 h-8 rounded-full gradient-purple text-white text-xs font-bold flex items-center justify-center">
                  {getInitials(user.name)}
                </div>
                <span className="text-sm font-semibold text-foreground">{user.name.split(' ')[0]}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {user.provider === 'google' && (
                      <span className="text-xs text-indigo-500 font-medium">via Google</span>
                    )}
                  </div>
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm transition-colors">
                    <LayoutDashboard size={15} className="text-muted-foreground" /> Dashboard
                  </Link>
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm transition-colors">
                    <User size={15} className="text-muted-foreground" /> Profile
                  </Link>
                  <div className="border-t border-border">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 transition-colors"
                      data-testid="button-logout"
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className={`${isHeroPage && !scrolled ? 'text-white hover:text-white hover:bg-white/10' : 'hover:text-primary'}`}
                  data-testid="button-login"
                >
                  Login
                </Button>
              </Link>
              <Link href="/create-trip">
                <Button className="gradient-purple glow-button text-white border-0" data-testid="button-create-trip">
                  Create Trip
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className={`md:hidden p-2 rounded-lg ${isHeroPage && !scrolled ? 'text-white' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-card/95 backdrop-blur-xl p-5 flex flex-col gap-3 shadow-xl border-t border-border">
          <Link href="/" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 hover:bg-muted rounded-xl font-medium">Home</Link>
          <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 hover:bg-muted rounded-xl font-medium">Dashboard</Link>
          <Link href="/create-trip" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 hover:bg-muted rounded-xl font-medium">Plan a Trip</Link>
          <Link href="/profile" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 hover:bg-muted rounded-xl font-medium">Profile</Link>
          <hr className="border-border" />
          {user ? (
            <div className="space-y-2">
              <div className="px-4 py-2 bg-muted rounded-xl">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-medium">
                <LogOut size={16} /> Sign out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Login</Button>
              </Link>
              <Link href="/create-trip" onClick={() => setMobileOpen(false)}>
                <Button className="w-full gradient-purple text-white border-0">Create Trip</Button>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Close user menu on outside click */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}
    </nav>
  );
}
