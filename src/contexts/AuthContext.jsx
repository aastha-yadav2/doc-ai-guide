// AuthContext.jsx - Authentication context using Firebase Google Auth
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, provider } from '../firebase.js';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';

// Create authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State to store current user and loading state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in with Google function
  // Tries popup first, then falls back to redirect for browsers that block popups
  // Note: If you see auth/unauthorized-domain, add the current domain to
  // Firebase Console > Authentication > Settings > Authorized domains
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Fallback to redirect flow for popup issues
      if (error?.code === 'auth/popup-blocked' || error?.code === 'auth/popup-closed-by-user') {
        await signInWithRedirect(auth, provider);
        return; // The page will redirect
      }
      // Surface other errors (e.g., auth/unauthorized-domain)
      throw error;
    } finally {
      // Loading will be reset after redirect as well
      setLoading(false);
    }
  };

  // Sign out function
  const signOutUser = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle sign-in with redirect results (no-op if none)
  useEffect(() => {
    getRedirectResult(auth).catch((error) => {
      if (error) {
        console.error('Redirect sign-in error:', error);
      }
    });
  }, []);

  // Context value object containing user state and auth functions
  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut: signOutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};