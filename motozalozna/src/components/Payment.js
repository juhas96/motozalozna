import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@material-ui/core';
import { 
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { pay } from '../service/HttpService';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { stripeTokenId } = paymentMethod;

            // TODO: handle price from input
            // 1099 equals 10.99 , replace '.' in price
            pay({ stripeTokenId, price: 1099 });
        }
    };

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <CardElement />
        <Button variant="contained" type="submit" color="primary" style={{ marginTop: '10px' }} disabled={!stripe}>Zaplatiť</Button>
      </form>
    );
};

export const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
); 
