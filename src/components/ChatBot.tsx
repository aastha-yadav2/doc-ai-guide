import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, User, Bot, Calendar, Clock, Stethoscope, ArrowLeft, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import nourivoxLogo from "@/assets/nourivox-logo.png";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 p-4 rounded-2xl bg-health-green-light max-w-xs">
    <Bot className="w-5 h-5 text-health-green" />
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-health-green rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-health-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-health-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  </div>
);

const QuickActions = ({ onActionClick }: { onActionClick: (action: string) => void }) => (
  <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
    <Button
      variant="outline"
      size="sm"
      onClick={() => onActionClick("I'd like to book an appointment")}
      className="flex items-center gap-2"
    >
      <Calendar className="w-4 h-4" />
      Book Appointment
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onActionClick("Show my reminders")}
      className="flex items-center gap-2"
    >
      <Clock className="w-4 h-4" />
      View Reminders
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onActionClick("I need to speak with a doctor")}
      className="flex items-center gap-2"
    >
      <Stethoscope className="w-4 h-4" />
      Connect with Doctor
    </Button>
  </div>
);

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'Hello! I\'m your Nourivox AI assistant - a voice that nurtures your health. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Placeholder function for sending messages to backend AI
  const sendMessageToAI = async (message: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simulate AI responses based on keywords
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
      return "I can help you book an appointment! What type of specialist would you like to see? Please let me know your preferred date and time.";
    } else if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
      return "I understand you're experiencing some symptoms. While I can provide general information, it's important to consult with a healthcare professional for proper diagnosis. Would you like me to connect you with a doctor?";
    } else if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      return "For medication-related questions, I recommend speaking with a pharmacist or your doctor. I can help you find nearby pharmacies or schedule a consultation with your physician.";
    } else if (lowerMessage.includes('doctor')) {
      return "I'll connect you with one of our available doctors right away. Please hold on while I check their availability. In the meantime, can you briefly describe your concern?";
    } else if (lowerMessage.includes('reminder')) {
      return "Here are your upcoming reminders:\n• Medication at 8:00 PM today\n• Follow-up appointment on Friday at 2:00 PM\n• Blood pressure check next Monday";
    } else {
      return "Thank you for your question. I'm here to help with your healthcare needs. If you need immediate medical attention, please call emergency services. For non-urgent matters, I can assist with appointments, reminders, or connect you with a healthcare professional.";
    }
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim();
    if (!content) return;

    const userMessage: Message = {
      id: Date.now().toString() + Math.random(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponse = await sendMessageToAI(content);
      
      const aiMessage: Message = {
        id: Date.now().toString() + Math.random(),
        role: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMicClick = () => {
    toast({
      title: "Voice Input",
      description: "Voice input feature coming soon!",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={nourivoxLogo} 
              alt="Nourivox Logo" 
              className="h-10 w-auto animate-fade-in"
            />
          </div>
          
          {/* Back to Home Button */}
          <Button variant="ghost" size="sm" asChild className="hover-scale">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-medical-blue text-white ml-auto'
                  : 'bg-health-green-light text-foreground mr-auto border border-border'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.role === 'ai' && (
                  <Bot className="w-5 h-5 text-health-green flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <User className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-2">
        <QuickActions onActionClick={handleSendMessage} />
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="pr-12 text-base"
              disabled={isTyping}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleMicClick}
            className="flex-shrink-0"
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;