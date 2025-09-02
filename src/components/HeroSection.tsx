import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-healthcare-chatbot.png";
import nourivoxLogo from "@/assets/nourivox-logo.png";
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-gradient-to-br from-white via-medical-blue-light to-health-green-light py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Animated Logo */}
            <div className="flex justify-center lg:justify-start mb-8">
              <img 
                src={nourivoxLogo} 
                alt="Nourivox - A voice that nurtures your health" 
                className="h-20 w-auto animate-fade-in hover-scale"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/chat">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto group"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('hero.startChat')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
              >
                {t('hero.learnMore')}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">{t('hero.trustedBy')}</p>
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span className="font-semibold text-medical-blue mr-1">24/7</span>
                  {t('hero.available247')}
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-health-green mr-1">HIPAA</span>
                  {t('hero.hipaaCompliant')}
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-medical-blue mr-1">AI+</span>
                  {t('hero.aiDoctors')}
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