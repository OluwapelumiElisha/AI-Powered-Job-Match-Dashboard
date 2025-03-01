'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Interface for User
interface User {
  name: string;
  skills: string[];
}

// Interface for AuthContextType
interface AuthContextType {
  user: User | null;
  signup: (name: string, skills: string[]) => Promise<void>;
  logout: () => void;
  loading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const router = useRouter();

  // Check localStorage for user session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (name: string, skills: string[]) => {
    setLoading(true); // Set loading to true when signup starts
    try {
      // Send signup data to the API
      const response = await fetch('https://67bdb194321b883e790d8762.mockapi.io/api/elisha/v1/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, skills }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const newUser = { name, skills };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      router.push('/'); // Redirect to the main page after signup
    } catch (err) {
      throw err; // Re-throw the error to handle it in the component
    } finally {
      setLoading(false); // Set loading to false when signup finishes
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/auth/signup'); // Redirect to the signup page after logout
  };

  return (
    <AuthContext.Provider value={{ user, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};