import React from 'react';
import './App.css';
import { LoginPage } from './components/LoginPage';
import { ProgressBar } from './components/ProgressBar';
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#D26B39'
        }
    }
})


function AppTable() {
  return (
    <div className="App" style={{ width: '100%' }}>
        <ThemeProvider theme={theme}>
          <ProgressBar />
          <LoginPage />
          <ToastContainer limit={3}/>
        </ThemeProvider>
    </div>
  );
}

export default AppTable;
