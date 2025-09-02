import { Button } from "@/components/ui/button";
import { Heart, Menu, X, LogOut, User, ArrowLeft, ArrowRight, FileText, Languages } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAboutClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackward = () => {
    window.history.back();
  };

  const handleForward = () => {
    window.history.forward();
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-medical-blue to-health-green p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Nourivox</span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 mr-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackward}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleForward}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-medical-blue transition-colors font-medium">
              {t('navigation.home')}
            </Link>
            <button 
              onClick={handleAboutClick}
              className="text-muted-foreground hover:text-medical-blue transition-colors font-medium"
            >
              {t('navigation.about')}
            </button>
            <Link to="/doctors" className="text-muted-foreground hover:text-medical-blue transition-colors font-medium">
              {t('navigation.doctors')}
            </Link>
            <Link to="/vaccines" className="text-muted-foreground hover:text-medical-blue transition-colors font-medium">
              {t('navigation.vaccines')}
            </Link>
            <Link to="/pharmacy" className="text-muted-foreground hover:text-medical-blue transition-colors font-medium">
              {t('navigation.pharmacy')}
            </Link>
            <Link to="/government-schemes" className="text-muted-foreground hover:text-medical-blue transition-colors font-medium flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {t('navigation.schemes')}
            </Link>
          </div>

          {/* Language Switcher & Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
              <Button
                variant={i18n.language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('en')}
                className="text-xs px-3 py-1 h-7"
              >
                English
              </Button>
              <Button
                variant={i18n.language === 'hi' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('hi')}
                className="text-xs px-3 py-1 h-7"
              >
                हिंदी
              </Button>
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL} alt={user.displayName} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.displayName && <p className="font-medium">{user.displayName}</p>}
                      {user.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      {t('navigation.dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('navigation.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="text-foreground hover:text-medical-blue" asChild>
                  <Link to="/login">{t('navigation.login')}</Link>
                </Button>
                <Button variant="medical" size="default" asChild>
                  <Link to="/signup">{t('navigation.signup')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Navigation Controls */}
              <div className="flex items-center space-x-2 px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackward}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="ml-2">{t('navigation.back')}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleForward}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="ml-2">{t('navigation.forward')}</span>
                </Button>
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1 mx-3 mb-2">
                <Button
                  variant={i18n.language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => changeLanguage('en')}
                  className="text-xs px-3 py-1 h-7 flex-1"
                >
                  English
                </Button>
                <Button
                  variant={i18n.language === 'hi' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => changeLanguage('hi')}
                  className="text-xs px-3 py-1 h-7 flex-1"
                >
                  हिंदी
                </Button>
              </div>

              <Link
                to="/"
                className="block px-3 py-2 text-foreground hover:bg-medical-blue-light rounded-md font-medium"
              >
                {t('navigation.home')}
              </Link>
              <button
                onClick={handleAboutClick}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:bg-medical-blue-light rounded-md font-medium"
              >
                {t('navigation.about')}
              </button>
              <Link
                to="/doctors"
                className="block px-3 py-2 text-muted-foreground hover:bg-medical-blue-light rounded-md font-medium"
              >
                {t('navigation.doctors')}
              </Link>
              <Link
                to="/vaccines"
                className="block px-3 py-2 text-muted-foreground hover:bg-medical-blue-light rounded-md font-medium"
              >
                {t('navigation.vaccines')}
              </Link>
              <Link
                to="/pharmacy"
                className="block px-3 py-2 text-muted-foreground hover:bg-medical-blue-light rounded-md font-medium"
              >
                {t('navigation.pharmacy')}
              </Link>
              <Link
                to="/government-schemes"
                className="block px-3 py-2 text-muted-foreground hover:bg-medical-blue-light rounded-md font-medium flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-4 w-4" />
                {t('navigation.governmentSchemes')}
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm">
                      <p className="font-medium">{user.displayName}</p>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/dashboard">{t('navigation.dashboard')}</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('navigation.logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/login">{t('navigation.login')}</Link>
                    </Button>
                    <Button variant="medical" className="justify-start" asChild>
                      <Link to="/signup">{t('navigation.signup')}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;