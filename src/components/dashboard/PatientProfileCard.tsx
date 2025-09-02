import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Calendar, 
  Heart, 
  Droplets, 
  Activity, 
  Weight, 
  Ruler,
  Phone,
  Mail,
  MapPin,
  Edit
} from 'lucide-react';

const PatientProfileCard = () => {
  const patientData = {
    name: "John Doe",
    age: 32,
    gender: "Male",
    patientId: "P001234",
    bloodGroup: "A+",
    height: "5'10\"",
    weight: "75 kg",
    phone: "+91 98765 43210",
    email: "john.doe@email.com",
    address: "123 Health Street, Wellness City",
    emergencyContact: "+91 98765 43211",
    allergies: ["Penicillin", "Shellfish"],
    medicalConditions: ["Hypertension"],
    lastVisit: "Dec 15, 2024"
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-elegant hover:shadow-glow transition-all duration-500 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Patient Profile
          </CardTitle>
          <Button variant="ghost" size="sm" className="hover-scale">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 animate-scale-in">
          <Avatar className="w-16 h-16 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder-avatar.jpg" alt={patientData.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-xl font-semibold text-foreground">{patientData.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {patientData.patientId}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {patientData.age} years
              </Badge>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                {patientData.gender}
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                Blood: {patientData.bloodGroup}
              </Badge>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-health-green/10 to-health-green/5 border border-health-green/20 hover-scale">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-health-green" />
              <span className="text-xs font-medium text-muted-foreground">Heart Rate</span>
            </div>
            <p className="text-lg font-semibold text-foreground">72 bpm</p>
          </div>
          
          <div className="p-3 rounded-lg bg-gradient-to-br from-medical-blue/10 to-medical-blue/5 border border-medical-blue/20 hover-scale">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-medical-blue" />
              <span className="text-xs font-medium text-muted-foreground">BP</span>
            </div>
            <p className="text-lg font-semibold text-foreground">120/80</p>
          </div>
          
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover-scale">
            <div className="flex items-center gap-2 mb-1">
              <Weight className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Weight</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{patientData.weight}</p>
          </div>
          
          <div className="p-3 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover-scale">
            <div className="flex items-center gap-2 mb-1">
              <Ruler className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-muted-foreground">Height</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{patientData.height}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Contact Information
          </h4>
          
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{patientData.phone}</span>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{patientData.email}</span>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{patientData.address}</span>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Droplets className="w-4 h-4 text-primary" />
            Medical Information
          </h4>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Allergies:</span>
              {patientData.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {allergy}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Conditions:</span>
              {patientData.medicalConditions.map((condition, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-warning/10 text-warning border-warning/20">
                  {condition}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Last visit: <span className="text-foreground font-medium">{patientData.lastVisit}</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProfileCard;