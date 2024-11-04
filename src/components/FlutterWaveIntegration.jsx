import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

export default function FlutterWaveIntegration() {
  const config = {
    public_key: 'FLWPUBK_TEST-94c29374da611c3af55486d155e02a83-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'etienejames5@gmail.com',
      phone_number: '08108755903',
      name: 'Etiene Essenoh',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response);
      closePaymentModal();
    },
    onClose: () => {},
  };

  return (
    <div className='App'>
      <h1>Flutterwave Demo</h1>
      <h1>Hello Test user</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}
