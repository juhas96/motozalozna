import React from 'react';
import './App.css';
import { TableForm } from './components/TableForm';
import { ProgressBar } from './components/ProgressBar';

function AppTable() {
  return (
    <div className="App" style={{ width: '100%' }}>
      <ProgressBar />
      <TableForm />
    </div>
  );
}

export default AppTable;
