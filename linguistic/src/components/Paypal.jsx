import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPal = ({ amount, handlePaymentApprove }) => {
  const initialOptions = {
    'client-id': 'AYHSg9MQnZAo6vDKgYgYOvqPBykI2AoTpQfhpJ9W3eXO9ClFIqZ9Z1bHMzeWj2EjxiBskTE2n0DCW97h',
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after creating the order
              return orderId;
            });
        }}
        onApprove={handlePaymentApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPal;
