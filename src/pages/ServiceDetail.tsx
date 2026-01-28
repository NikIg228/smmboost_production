import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceDetail as ServiceDetailComponent } from '../components/ServiceDetail';
import { ServicesGrid } from '../components/ServicesGrid';
import { PaymentModal } from '../components/PaymentModal';
import { Service } from '../types';
import { services } from '../data/services';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
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

  useEffect(() => {
    if (id) {
      const foundService = services.find(s => s.id === id);
      if (foundService) {
        setService(foundService);
      }
    }
  }, [id]);

  const handleBack = () => {
    navigate('/services');
  };

  const handleServiceClick = (service: Service) => {
    navigate(`/services/${service.id}`);
  };

  const handleBuyClick = (service?: Service) => {
    if (service) {
      handleServiceClick(service);
    }
  };

  if (!service) {
    return (
      <ServicesGrid 
        onServiceClick={handleServiceClick} 
        onBuyClick={handleBuyClick} 
      />
    );
  }

  return (
    <>
      <ServiceDetailComponent
        service={service}
        onBack={handleBack}
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
    </>
  );
};
