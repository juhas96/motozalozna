import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import pay from '../service/HttpService';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const {stripeTokenId} = paymentMethod;

            // TODO: handle price from input
            pay({stripeTokenId, price: 1099});
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{maxWidth: '400px', margin: '0 auto'}}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Zaplatiť
            </button>
        </form>
    )
}

const Payment = (props) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
} 
