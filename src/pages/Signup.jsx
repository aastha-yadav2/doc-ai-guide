// Signup.jsx - Signup page with role selection and Firebase Google Authentication
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Mail, User, UserCheck, Shield } from 'lucide-react';

const Signup = () => {
  // Get auth functions from context
  const { signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  
  // Local state for form and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('patient');
  
  // Form data for different user types
  const [formData, setFormData] = useState({
    patient: {
      fullName: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    doctor: {
      fullName: '',
      specialization: '',
      hospital: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    admin: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Handle Google sign up
  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      setSuccessMessage('Account created successfully!');
      
      // Redirect to dashboard after successful signup
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      setError('Failed to create account with Google. Please try again.');
      console.error('Google sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle traditional form submission (placeholder for future implementation)
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentFormData = formData[activeTab];
    
    // Basic validation
    if (currentFormData.password !== currentFormData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (currentFormData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setError('Traditional signup not implemented yet. Please use Google Sign Up.');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [name]: value
      }
    }));
  };

  // Get icon for role tab
  const getRoleIcon = (role) => {
    switch (role) {
      case 'patient': return <User className="w-4 h-4" />;
      case 'doctor': return <UserCheck className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-medical-blue to-health-green flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join Healthcare Assistant and start managing your health
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success Message */}
          {successMessage && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Google Sign Up Button */}
          <Button 
            onClick={handleGoogleSignUp}
            disabled={isLoading || loading}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
            variant="outline"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or create account manually</span>
            </div>
          </div>

          {/* Role-based Signup Forms */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="patient" className="flex items-center gap-2">
                {getRoleIcon('patient')}
                Patient
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                {getRoleIcon('doctor')}
                Doctor
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                {getRoleIcon('admin')}
                Admin
              </TabsTrigger>
            </TabsList>

            {/* Patient Form */}
            <TabsContent value="patient">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.patient.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="25"
                      value={formData.patient.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.patient.email}
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
                    placeholder="••••••••"
                    value={formData.patient.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.patient.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" variant="medical" disabled>
                  Create Patient Account (Coming Soon)
                </Button>
              </form>
            </TabsContent>

            {/* Doctor Form */}
            <TabsContent value="doctor">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Dr. Jane Smith"
                    value={formData.doctor.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    placeholder="Cardiology"
                    value={formData.doctor.specialization}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hospital">Hospital/Clinic</Label>
                  <Input
                    id="hospital"
                    name="hospital"
                    placeholder="City General Hospital"
                    value={formData.doctor.hospital}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="dr.jane@hospital.com"
                    value={formData.doctor.email}
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
                    placeholder="••••••••"
                    value={formData.doctor.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.doctor.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" variant="medical" disabled>
                  Create Doctor Account (Coming Soon)
                </Button>
              </form>
            </TabsContent>

            {/* Admin Form */}
            <TabsContent value="admin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Admin User"
                    value={formData.admin.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@healthcare.com"
                    value={formData.admin.email}
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
                    placeholder="••••••••"
                    value={formData.admin.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.admin.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" variant="medical" disabled>
                  Create Admin Account (Coming Soon)
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Link to Login */}
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-medical-blue hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;