import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { ConsultationModal } from '../components/ConsultationModal';

export const Home: React.FC = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <>
      <Hero 
        onConsultation={() => setIsConsultationOpen(true)} 
      />
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </>
  );
};
