'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * Session context type
 */
interface SessionContextType {
  sessionId: string | null;
  isLoading: boolean;
}

/**
 * Session context for providing session ID throughout the app
 */
const SessionContext = createContext<SessionContextType>({
  sessionId: null,
  isLoading: true,
});

/**
 * Hook to access session context
 */
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionManager');
  }
  return context;
}

/**
 * Generates a UUID v4
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Gets a cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

/**
 * Sets a cookie with expiration
 */
function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * SessionManager Component
 * Manages user session with UUID stored in cookie
 * 
 * @param children - Child components that need access to session
 */
export function SessionManager({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session cookie
    const existingSession = getCookie('voting_session_id');

    if (existingSession) {
      // Use existing session
      setSessionId(existingSession);
    } else {
      // Generate new session ID
      const newSessionId = generateUUID();
      setSessionId(newSessionId);

      // Store in cookie with 30-day expiration
      setCookie('voting_session_id', newSessionId, 30);
    }

    setIsLoading(false);
  }, []);

  return (
    <SessionContext.Provider value={{ sessionId, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}
