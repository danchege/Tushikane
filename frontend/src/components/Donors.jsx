import React from 'react';
import { DonationForm } from '@/components/DonationForm';

const Donors = () => {
  return (
    <div className="donors-container">
      <h2>Make a Donation</h2>
      <DonationForm />
    </div>
  );
};

export default Donors;
