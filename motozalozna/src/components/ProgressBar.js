import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {subscriber, dataService} from '../service/AppStateService';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    zIndex: 10,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const ProgressBar = () => {
  const classes = useStyles();
  const [state, setState] = useState('');

  useEffect(() => {
      subscriber.subscribe((v) => {
          console.log('state is', v)
          setState(v);
      })
  });

  return (
    <div className={classes.root}>
      { (state === 'loading' ? <LinearProgress color="secondary" /> : null)}
    </div>

  );
}