import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServicesGrid } from '../components/ServicesGrid';
import { Service } from '../types';

export const Services: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service: Service) => {
    navigate(`/services/${service.id}`);
  };

  const handleBuyClick = (service?: Service) => {
    if (service) {
      handleServiceClick(service);
    }
  };

  return (
    <ServicesGrid 
      onServiceClick={handleServiceClick} 
      onBuyClick={handleBuyClick} 
    />
  );
};
