import React, { Component, componentDidMount } from 'react';
import {
 AppBar, Toolbar, Typography, IconButton, Button, Container, TextField
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';

import UserTable from './UserTable';
import AdminTable from './AdminTable';
import './css/uniform.css';
import './css/tableForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, logout } from '../service/HttpService';

export class LoginPage extends Component {
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
    this.setState({userRows: []});
    this.setState({adminRows: []});
    if (window.localStorage.getItem('userId')) {
      this.setState({user_id: window.localStorage.getItem('userId')})
      this.setState({ userType: window.localStorage.getItem('userType') })
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
        toast.success('Prihlásenie prebehlo úspešne.', {position: toast.POSITION.TOP_RIGHT});
        this.setState({user_id: res.data.userId})
        window.localStorage.setItem('token', res.data.token.toString());
        window.localStorage.setItem('userId', res.data.userId);
        window.localStorage.setItem('userType', res.data.isAdmin == true ? 'admin' : 'user');
        this.setState({ userType: res.data.isAdmin == true ? 'admin' : 'user' })
        this.setState({ isLogged: true })
      }).catch(err => {
        console.log('error nastal')
        toast.error('Prihlásenie sa nepodarilo. Pravdepodobne ste zadali zlé údaje. V prípade opakovanej chyby kontaktujte admina.', {position: toast.POSITION.TOP_RIGHT});
      });
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
    logout().then(() => {
      toast.success('Odhlásenie prebehlo úspešne.',
      {position: toast.POSITION.TOP_RIGHT}
    );
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('userType');
      this.setState({ userType: '' })
      this.setState({ isLogged: false })
      this.setState({ user_id: '' })
      this.setState({userRows: []});
      this.setState({adminRows: []});
      this.setState({email: ''});
      this.setState({password: ''});
    }).catch(() => {
      toast.error('Odhlásenie sa nepodarilo.',
      {position: toast.POSITION.TOP_RIGHT}
    );
    });
  }

  render() {
      const { userType, isLogged } = this.state;
      
      return (
        <div>
          <div>
            <AppBar position="static">
              <Toolbar variant="dense" style={{ backgroundColor: '#D26B39' }}>
                { userType === 'admin' && isLogged 
                            ? (
                              <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                              </IconButton>
                              )
                            : null}
                <Typography variant="h6" color="inherit"> Motozalozna</Typography>
                {isLogged === true ? (
                  <Button onClick={this.handleLogout} variant="primary" style={{color: 'white'}}>Odhlásiť</Button>
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
                            type="password"
                            id="heslo"
                            size="small"
                          />
                        </div>
                      </div>
                      <Button 
                        style={{ marginTop: '20px' }} 
                        onClick={this.handleComponent} 
                        variant="contained" 
                        color="primary" 
                        disabled={(this.state.password.length == 0 || this.state.email.length == 0) ? true : false}>
                          Prihlásiť sa
                      </Button>
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

export default LoginPage;
