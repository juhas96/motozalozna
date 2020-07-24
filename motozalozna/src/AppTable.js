import React from 'react';
import './App.css';
import { LoginPage } from './components/LoginPage';
import { ProgressBar } from './components/ProgressBar';
import { ToastContainer } from 'react-toastify'

function AppTable() {
  return (
    <div className="App" style={{ width: '100%' }}>
      <ProgressBar />
      <LoginPage />
      <ToastContainer limit={3}/>
    </div>
  );
}

export default AppTable;
