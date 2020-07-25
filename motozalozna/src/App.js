import React from 'react';
import './App.css';
import UserForm from './components/UserForm';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D26B39'
    }
  }
})

function App() {
  return (
      <div className="App" style={{width: '100%'}}>
        <ThemeProvider theme={theme}>
          <UserForm/>
          <ToastContainer limit={3} />
        </ThemeProvider>
      </div>
  );
}

export default App;
