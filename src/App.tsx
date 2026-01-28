import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetailPage } from './pages/ServiceDetail';
import { Profile } from './pages/Profile';
import { Reviews } from './pages/Reviews';
import { Support } from './pages/Support';
import { FAQ } from './pages/FAQ';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Refund } from './pages/Refund';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { PaymentCancel } from './pages/PaymentCancel';
import { Admin } from './pages/Admin';
import { ResetPassword } from './pages/ResetPassword';
import { AuthCallback } from './pages/AuthCallback';

function App() {
  const { t } = useTranslation();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });

  const handleAuthModeChange = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-900 text-white relative">
          {/* Анимированный фон */}
          <AnimatedBackground />
          
          {/* Основной контент поверх фона */}
          <div className="relative z-10">
            <Header 
              onAuthModal={setAuthModal}
            />
            <main className="pt-14 sm:pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/support" element={<Support />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
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
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
