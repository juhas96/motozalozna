import React, {useState, useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button, TextField, Typography } from '@material-ui/core';
import { 
    Elements,
    CardElement,
    useStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements
} from '@stripe/react-stripe-js';
import { pay } from '../service/HttpService';
import './css/card.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const stripePromise = loadStripe('pk_test_51Gvl54FkmxPqM4nEAWAunvaQQnQxp229DBNWrMrRwMp0bgoGpYpGCvZMfH6830VUv6lRlPaWh3DSnaV6wpO6MJDS0011NE1Ox3');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const CheckoutForm = (props) => {
    const {loanId, sendData} = props;
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(0);
    const classes = useStyles();
    const [payed, setPayed] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { id } = paymentMethod;
            let tempAmount = Number(amount);
            tempAmount = tempAmount * 100;
            tempAmount = tempAmount.toFixed(2).split('.')[0];
            // 1099 equals 10.99
            pay({ id, price: Number(tempAmount), loanId: loanId }).then((res) => {
              setPayed(true);
              toast.success("Platba prebehla úspešne!", {
                position: toast.POSITION.TOP_RIGHT
              });
              sendData(res.data);
            }).catch((err) => {
              console.log(err);
              toast.error("Platba sa nepodarila! Platbu neopakujte. Kontaktujte admina!", {
                position: toast.POSITION.TOP_RIGHT
              });
            });
        }
    };

    return (
      <div>
      {payed === false ? (
        <div className="Payment">
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography style={{textAlign: 'left', fontSize: '12px'}} variant="h6" color="inherit">Číslo karty</Typography>
                <CardElement />
              </Grid>
              {/* <Grid item xs={6}>
                <Typography style={{textAlign: 'left', fontSize: '12px'}} variant="h6" color="inherit">Dátum expirácie</Typography>
                <CardExpiryElement />
              </Grid>
              <Grid item xs={6}>
                <Typography style={{textAlign: 'left', fontSize: '12px'}} variant="h6" color="inherit">CVC</Typography>
                <CardCvcElement />
              </Grid> */}
            </Grid>
          </div>


          <div style={{marginTop: '20px'}}>
          <Typography style={{textAlign: 'left', fontSize: '12px'}} variant="h6" color="inherit">Suma na zaplatenie</Typography>
          <Input
            required
            className="StripeElement"
            type="text"
            style={{marginBottom: '10px'}}
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            onChange={e => setAmount(e.target.value )}
            name="pay"
            id="pay"
            fullWidth="true"
            size="medium"
          />
          <div>
            <Button variant="contained" type="submit" color="primary" style={{ marginTop: '10px' }} disabled={!stripe}>Zaplatiť</Button>
            </div>
          </div>
        </form>
      </div>
      ) : (
        <div>
          <Typography variant="h5" color="inherit">Ďakujeme za úhradu splátky. Detaily nájdete na Vašom e-maily.</Typography>
        </div>
      )}
      </div>
    );
    
};

export const Payment = (props) => {
  const {loanId, sendData} = props;

  const handleSendData = (data) => {
    sendData(data);
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm loanId={loanId} sendData={sendData}/>
    </Elements>
  );
  } 
