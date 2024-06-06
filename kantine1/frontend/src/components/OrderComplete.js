import React from 'react';
import { useLocation } from 'react-router-dom';

function OrderComplete() {
  const location = useLocation();
  const { orderNumber, delivery, classroom } = location.state;

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Your order number is <strong>{orderNumber}</strong>.</p>
      {delivery ? (
        <p>Your order will be delivered to classroom <strong>{classroom}</strong> in a few minutes. Please show this number upon delivery.</p>
      ) : (
        <p>Please go down to the cafeteria to collect your food. Remember to show this number to collect your order.</p>
      )}
    </div>
  );
}

export default OrderComplete;
