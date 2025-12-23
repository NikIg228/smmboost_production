import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { ConsultationModal } from './components/ConsultationModal';
import { PaymentModal } from './components/PaymentModal';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceDetail } from './components/ServiceDetail';
import { ProfilePage } from './components/ProfilePage';
import { ReviewsPage } from './components/ReviewsPage';
import { SupportPage } from './components/SupportPage';
import { FAQPage } from './components/pages/FAQPage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { RefundPage } from './components/pages/RefundPage';
import { Footer } from './components/Footer';
import { Service } from './types';

function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    service: Service | null;
    quantity: number;
    url: string;
    totalPrice: number;
  }>({
    isOpen: false,
    service: null,
    quantity: 0,
    url: '',
    totalPrice: 0
  });

  // Функция для плавного скролла к началу страницы
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  // Обновленная функция смены страницы с автоскроллом
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    scrollToTop();
  };

  // Listen for page change events from footer
  React.useEffect(() => {
    const handleFooterPageChange = (event: CustomEvent) => {
      handlePageChange(event.detail);
    };

    window.addEventListener('pageChange', handleFooterPageChange as EventListener);
    return () => {
      window.removeEventListener('pageChange', handleFooterPageChange as EventListener);
    };
  }, []);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setCurrentPage('service-detail');
    scrollToTop();
  };

  const handleBuyClick = (service?: Service) => {
    // If service is provided, open its detail page
    if (service) {
      handleServiceClick(service);
    }
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setCurrentPage('services');
    scrollToTop();
  };

  const handleAuthModeChange = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onPageChange={handlePageChange} onConsultation={() => setIsConsultationOpen(true)} />;
      case 'services':
        return <ServicesGrid onServiceClick={handleServiceClick} onBuyClick={handleBuyClick} />;
      case 'service-detail':
        return selectedService ? (
          <ServiceDetail 
            service={selectedService} 
            onBack={handleBackToServices}
            onPaymentClick={(service, quantity, url, totalPrice) => {
              setPaymentModal({
                isOpen: true,
                service,
                quantity,
                url,
                totalPrice
              });
            }}
          />
        ) : (
          <ServicesGrid onServiceClick={handleServiceClick} onBuyClick={handleBuyClick} />
        );
      case 'profile':
        return <ProfilePage />;
      case 'reviews':
        return <ReviewsPage onPageChange={handlePageChange} />;
      case 'support':
        return <SupportPage />;
      case 'faq':
        return <FAQPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'refund':
        return <RefundPage />;
      default:
        return <Hero onPageChange={handlePageChange} onConsultation={() => setIsConsultationOpen(true)} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Анимированный фон */}
      <AnimatedBackground />
      
      {/* Основной контент поверх фона */}
      <div className="relative z-10">
        <Header 
          onPageChange={handlePageChange} 
          currentPage={currentPage}
          onAuthModal={setAuthModal}
          onConsultation={() => setIsConsultationOpen(true)}
        />
        <main className="pt-14 sm:pt-16">
          {renderContent()}
        </main>
        <Footer />
      </div>
      
      {/* Global Modals */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        mode={authModal.mode}
        onModeChange={handleAuthModeChange}
      />
      
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
      
      {paymentModal.service && (
        <PaymentModal
          isOpen={paymentModal.isOpen}
          onClose={() => {
            setPaymentModal({ 
              isOpen: false,
              service: null,
              quantity: 0,
              url: '',
              totalPrice: 0
            });
          }}
          service={paymentModal.service}
          quantity={paymentModal.quantity}
          url={paymentModal.url}
          totalPrice={paymentModal.totalPrice}
        />
      )}
      </div>
    </ErrorBoundary>
  );
}

export default App;