import React from 'react';
import { MessageCircle, Calendar, Phone, Bot, Stethoscope, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const QuickActionsCard = () => {
  const handleEmergencyContact = () => {
    // In a real app, this would trigger emergency protocols
    window.open('tel:911', '_self');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bot className="w-5 h-5 text-medical-blue" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link to="/chat" className="block">
          <Button 
            variant="medical" 
            className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-medium">Chat with AI</span>
          </Button>
        </Link>
        
        <Button 
          variant="health" 
          className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
        >
          <Calendar className="w-6 h-6" />
          <span className="text-sm font-medium">Book Appointment</span>
        </Button>
        
        <Button 
          variant="destructive" 
          onClick={handleEmergencyContact}
          className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
        >
          <Phone className="w-6 h-6" />
          <span className="text-sm font-medium">Emergency</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;