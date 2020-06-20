import React from 'react';
import './App.css';
import UserForm from './formComponents/UserForm';
import TableForm from './tableComponents/TableForm'

function AppForm() {
  return (
      <div className="App" style={{width: '100%'}}>
        <UserForm />
      </div>
  );
}

export default AppForm;
