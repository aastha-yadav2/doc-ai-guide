// Login.jsx - Login page with Firebase Google Authentication
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail } from 'lucide-react';

const Login = () => {
  // Get auth functions from context
  const { signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  
  // Local state for form and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Helpful error message mapping for common Firebase Auth errors
  const getFriendlyAuthError = (error) => {
    if (error?.code === 'auth/unauthorized-domain') {
      const host = typeof window !== 'undefined' ? window.location.hostname : 'your domain';
      return `Sign-in blocked: unauthorized domain. Add "${host}" to Firebase Auth > Settings > Authorized domains.`;
    }
    if (error?.code === 'auth/popup-blocked') return 'Popup was blocked by the browser. Please allow popups or try again.';
    if (error?.code === 'auth/cancelled-popup-request') return 'Another sign-in attempt is in progress. Please try again.';
    return 'Failed to sign in with Google. Please try again.';
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      // Redirect to home after successful login
      navigate('/');
    } catch (error) {
      setError(getFriendlyAuthError(error));
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle traditional form submission (placeholder for future implementation)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('Traditional login not implemented yet. Please use Google Sign In.');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-medical-blue to-health-green flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to your Healthcare Assistant account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Google Sign In Button */}
          <Button 
            onClick={handleGoogleSignIn}
            disabled={isLoading || loading}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
            variant="outline"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Traditional Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" variant="medical" disabled>
              Sign In (Coming Soon)
            </Button>
          </form>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <Link to="/forgot-password" className="text-sm text-medical-blue hover:underline">
              Forgot your password?
            </Link>
            <div className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-medical-blue hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;