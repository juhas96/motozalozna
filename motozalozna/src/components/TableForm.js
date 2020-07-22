import React, { Component, componentDidMount } from 'react';
import {
 AppBar, Toolbar, Typography, IconButton, Button, Container, TextField
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';

import UserTable from './UserTable';
import AdminTable from './AdminTable';
import './css/uniform.css';
import './css/tableForm.css';
import { login, logout } from '../service/HttpService';

export class TableForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userType: '',
        isLogged: false,
        email: '',
        password: '',
        adminRows: [],
        userRows: [],
        user_id: ''
        // payPrice: 0
    };

    this.handleState = this.handleState.bind(this);
    // this.handleComponent = this.handleComponent.bind(this)
  }

  componentDidMount() {
    if (window.localStorage.getItem('userId')) {
      this.setState({user_id: window.localStorage.getItem('userId')})
      this.setState({ userType: 'user' })
      this.setState({isLogged: true});
    }
  }

  handleState = async (name, data) => {
    await this.setState({
      [name]: data
    }, () => {
    });
  }

  handleComponent = () => {
      const { userType, email, password } = this.state;
      login({ email, password }).then(res => {
        this.setState({user_id: res.data.userId})
        console.log('userId:', res.data.userId);
        window.localStorage.setItem('token', res.data.token.toString());
        window.localStorage.setItem('userId', res.data.userId);
        this.setState({ userType: 'user' })
        this.setState({ isLogged: true })
      });
      // if (userType === 'admin' || userType === 'user') { this.setState({ isLogged: true }); }
  }

  getUsersContent = (userType) => {
      const { adminRows, userRows, user_id } = this.state;
    switch (userType) {
        case 'admin':
            return (
              <AdminTable
                handleState={this.handleState}
                rows={adminRows}
              />
            );
        case 'user':
            return (
              <UserTable
                handleState={this.handleState}
                user_id={user_id}
                rows={userRows}
              />
            );
      default:
        return 'Go home';
    }
  }

  handleLogout = () => {
    logout();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    this.setState({ userType: '' })
    this.setState({ isLogged: false })
    this.setState({ user_id: '' })
  }

  render() {
      const { userType, isLogged } = this.state;
      
      return (
        <div>
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
                <Typography variant="h6" color="inherit"> Motozalozna</Typography>
                {isLogged === true ? (
                  <Button onClick={this.handleLogout} variant="primary">Odhlásiť</Button>
                ) : null}
              </Toolbar>
            </AppBar>
          </div>
          { isLogged === false 
                ? (
                  <Container maxWidth="lg" style={{ marginBottom: '2%' }}>
                    <div className="categoryName">
                      <h1>Prihlásiť sa</h1>
                    </div>
                    <div className="wrapper" style={{ maxWidth: '80%', margin: 'auto' }}>
                      {/* <Form onSubmit={this.handleComponent}> */}
                      <div>
                        <div>
                          <TextField
                            required
                            label="Email"
                            variant="outlined"
                            className="loginLabel"
                            style={{ marginLeft: '10px', marginRight: '10px' }}
                            type="text"
                            onChange={(e) => this.setState({ email: e.target.value })}
                            margin="normal"
                            name="email"
                            id="email"
                            size="small"
                          />
                        </div>
                
                        <div>
                          <TextField
                            required
                            label="Heslo"
                            variant="outlined"
                            className="loginLabel"
                            style={{ marginLeft: '10px', marginRight: '10px' }}
                            type="text"
                            onChange={(e) => this.setState({password: e.target.value})}
                            margin="normal"
                            name="heslo"
                            id="heslo"
                            size="small"
                          />
                        </div>
                      </div>
                      <Button style={{ marginTop: '20px' }} onClick={this.handleComponent} variant="contained" color="primary">Login</Button>
                      {/* </Form> */}
                    </div> 
                  </Container>
                  )
                : (
                  <Container maxWidth="lg" style={{ marginBottom: '2%' }}>
                    <div>
                      { this.getUsersContent(userType) }
                    </div>
                  </Container>
              )}

        </div>
      );
  }
}

export default TableForm;
