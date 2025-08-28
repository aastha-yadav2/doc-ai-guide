import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-healthcare-chatbot.png";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-white via-medical-blue-light to-health-green-light py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your AI-Powered{" "}
              <span className="bg-gradient-to-r from-medical-blue to-health-green bg-clip-text text-transparent">
                Healthcare Assistant
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Chat with our AI or connect with doctors instantly for trusted medical guidance
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto group"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chat
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
              >
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">Trusted by thousands of patients</p>
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span className="font-semibold text-medical-blue mr-1">24/7</span>
                  Available
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-health-green mr-1">HIPAA</span>
                  Compliant
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-medical-blue mr-1">AI+</span>
                  Real Doctors
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Healthcare chatbot with doctor illustration"
                className="w-full h-auto max-w-lg mx-auto rounded-2xl shadow-strong"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/20 to-health-green/20 rounded-3xl blur-3xl -z-10 transform scale-110"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;