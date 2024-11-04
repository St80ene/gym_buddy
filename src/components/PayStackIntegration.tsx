import React from 'react';
import { PaystackButton } from 'react-paystack';

const PayStackIntegration = () => {
  const config = {
    reference: new Date().getTime().toString(),
    email: 'etienejames5@gmail.com',
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_76abe9c16a9089fb2fb27516d7a31f4b6c756c56',
  };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div>
      <h1>PayStack Demo</h1>
      <h1>Hello Test user</h1>
      <PaystackButton {...componentProps} />
    </div>
  );
};

export default PayStackIntegration;
