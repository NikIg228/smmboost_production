import React, { useState } from 'react';
import { Menu, X, Zap, Users, MessageCircle, Settings, LogIn, LogOut, User as UserIcon, UserCircle } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { ConsultationModal } from './ConsultationModal';
import { LogoutNotification } from './LogoutNotification';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../lib/supabase';

interface HeaderProps {
  onPageChange: (page: string) => void;
  currentPage: string;
  onAuthModal: (modal: { isOpen: boolean; mode: 'login' | 'register' }) => void;
  onConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPageChange, currentPage, onAuthModal, onConsultation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Главная', icon: Zap },
    { id: 'services', label: 'Услуги', icon: Users },
    { id: 'reviews', label: 'Отзывы', icon: MessageCircle },
    { id: 'support', label: 'Поддержка', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      setShowProfileMenu(false);
      if (error) {
        console.error('Error signing out:', error);
        // Все равно очищаем локальное состояние
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        // Показываем уведомление в стиле сайта
        setShowLogoutNotification(true);
        // Перезагружаем страницу через 2 секунды
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Error signing out:', error);
      // В случае ошибки все равно перезагружаем страницу
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-700/50 shadow-lg" style={{ backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer button-hover-lift"
            onClick={() => onPageChange('home')}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center glow-effect">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              <span className="hidden xs:inline">SMM Boost</span>
              <span className="xs:hidden">SMM Boost</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>


          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-gray-300">
                    {user?.user_metadata?.name || user?.email?.split('@')[0]}
                  </span>
                </button>
                
                {showProfileMenu && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-48 glass-effect rounded-lg shadow-lg border border-gray-700/50 py-2 z-50"
                    style={{
                      animation: 'fadeIn 0.2s ease-out'
                    }}
                  >
                    <button
                      onClick={() => {
                        onPageChange('profile');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Профиль
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Выйти
                    </button>
                  </div>
                )}
                </div>
            ) : (
              <button 
                onClick={() => onAuthModal({ isOpen: true, mode: 'login' })}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 button-hover-lift glow-effect neon-button"
              >
                <LogIn className="w-4 h-4" />
                <span>Войти</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
              
              
              <div className="pt-4 border-t border-gray-800 space-y-2">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        onPageChange('profile');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <UserCircle className="w-4 h-4" />
                      <span className="text-sm">
                        {user?.user_metadata?.name || user?.email?.split('@')[0]}
                      </span>
                    </button>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Выйти</span>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      onAuthModal({ isOpen: true, mode: 'login' });
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Войти</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Logout Notification */}
      <LogoutNotification
        isOpen={showLogoutNotification}
        onClose={() => setShowLogoutNotification(false)}
      />
    </header>
  );
};