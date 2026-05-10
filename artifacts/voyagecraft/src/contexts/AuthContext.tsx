import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'email' | 'google';
  joinedAt: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'voyagecraft_user';
const USERS_KEY = 'voyagecraft_users';

interface StoredUser extends User {
  passwordHash: string;
}

function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  function persistUser(u: User) {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  }

  function getStoredUsers(): StoredUser[] {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  function saveStoredUsers(users: StoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    await new Promise(r => setTimeout(r, 800));
    const users = getStoredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { success: false, error: 'No account found with this email.' };
    if (found.passwordHash !== hashPassword(password)) return { success: false, error: 'Incorrect password.' };
    const { passwordHash: _, ...userWithoutPassword } = found;
    persistUser(userWithoutPassword);
    return { success: true };
  }

  async function signup(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    await new Promise(r => setTimeout(r, 900));
    if (!name.trim()) return { success: false, error: 'Name is required.' };
    if (!email.includes('@')) return { success: false, error: 'Please enter a valid email.' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    const users = getStoredUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: StoredUser = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      provider: 'email',
      joinedAt: new Date().toISOString(),
      passwordHash: hashPassword(password),
    };
    saveStoredUsers([...users, newUser]);
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    persistUser(userWithoutPassword);
    return { success: true };
  }

  async function loginWithGoogle(): Promise<{ success: boolean; error?: string }> {
    await new Promise(r => setTimeout(r, 1200));
    const googleProfiles = [
      { name: 'Alex Johnson', email: 'alex.johnson@gmail.com' },
      { name: 'Sam Rivera', email: 'sam.rivera@gmail.com' },
      { name: 'Jordan Lee', email: 'jordan.lee@gmail.com' },
    ];
    const profile = googleProfiles[Math.floor(Math.random() * googleProfiles.length)];
    const users = getStoredUsers();
    let existing = users.find(u => u.email === profile.email);
    if (!existing) {
      const newUser: StoredUser = {
        id: generateId(),
        name: profile.name,
        email: profile.email,
        provider: 'google',
        joinedAt: new Date().toISOString(),
        passwordHash: '',
      };
      saveStoredUsers([...users, newUser]);
      existing = newUser;
    }
    const { passwordHash: _, ...userWithoutPassword } = existing;
    persistUser(userWithoutPassword);
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
