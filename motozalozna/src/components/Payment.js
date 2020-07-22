import React, {useState} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button, TextField, Typography } from '@material-ui/core';
import { 
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { pay } from '../service/HttpService';
import './css/card.css'

const stripePromise = loadStripe('pk_test_51Gvl54FkmxPqM4nEAWAunvaQQnQxp229DBNWrMrRwMp0bgoGpYpGCvZMfH6830VUv6lRlPaWh3DSnaV6wpO6MJDS0011NE1Ox3');

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { id } = paymentMethod;
            console.log('price', amount);
            console.log('Payment Method: ', paymentMethod)
            console.log('StripeTokenId: ', id)
            // TODO: handle price from input
            // 1099 equals 10.99 , replace '.' in price
            pay({ id, price: amount*100, loanId: 1 });
        }
    };

    return (
      <div className="Payment">
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div>
          <TextField
            required
            label="Suma na zaplatenie"
            variant="outlined"
            style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}
            type="text"
            onChange={e => setAmount(e.target.value )}
            name="pay"
            id="pay"
            size="small"
          />
          </div>
          <div>
          <Typography variant="h6" color="inherit"> Detaily karty</Typography>
            <CardElement
              className="StripeElement StripeElement--invalid"
            />
          </div>
          <div>
            <Button variant="contained" type="submit" color="primary" style={{ marginTop: '10px' }} disabled={!stripe}>Zaplatiť</Button>
          </div>
        </form>
      </div>
    );
};

export const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm/>
  </Elements>
); 
