import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {subscriber, dataService} from '../service/AppStateService';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export const ProgressBar = () => {
  const classes = useStyles();
  const [state, setState] = useState('');

  useEffect(() => {
      subscriber.subscribe((v) => {
          setState(v);
      })
  });

  return (
    <div className={classes.root}>
      { (state === 'loading' ? (
        <Backdrop open={state === 'loading'} className={classes.backdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
       ) : null)}
    </div>
  );
}