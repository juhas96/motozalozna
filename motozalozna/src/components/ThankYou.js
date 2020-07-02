import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 800,
    marginTop: '10%',
    margin: '0 auto',
    alignItems: 'center'
  },
});

const ThankYou = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h2" gutterBottom>
                Ďakujeme za vyplnenie formuláru. Súhrn a novo vytvorený používateľský účet nájdete v maily.
            </Typography>
        </div>
    );
}

export default ThankYou;