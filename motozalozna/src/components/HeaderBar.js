import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { MenuIcon } from '@material-ui/core/';

const HeaderBar = () => {
    const { userType, isLogged } = useState();
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense" style={{ backgroundColor: '#3949ab' }}>
            { userType === 'admin' && isLogged 
                                    ? (
                                      <IconButton edge="start" color="inherit" aria-label="menu">
                                        <MenuIcon />
                                      </IconButton>
        )
                                    : null}
            <Typography variant="h6" color="inherit"> Motozalozna </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
};

export default HeaderBar;
