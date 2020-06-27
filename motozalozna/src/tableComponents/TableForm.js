import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Container, InputLabel, TextField } from '@material-ui/core/'
import { Form } from 'react-bootstrap'
import MenuIcon from '@material-ui/icons/Menu';

import UserTable from './UserTable'
import AdminTable from './AdminTable'
import '../formComponents/formCss/uniform.css'
import './tableCss/tableForm.css'

export class TableForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
        userType: "",
        isLogged: false,
        adminRows: [],
        userRows: [],
        payPrice: 0
    };

    this.handleState = this.handleState.bind(this)
    // this.handleComponent = this.handleComponent.bind(this)
  }

    handleState = async (name, data) => {
      await this.setState({
        [name]: data
      }, function() {
      })
    }

    handleComponent = () => {
        if(this.state.userType == 'admin' || this.state.userType == 'user')
            this.setState({'isLogged': true})
    }

  getUsersContent = (userType) => {
    switch (userType) {
        case "admin":
            return <AdminTable
                    handleState = {this.handleState}
                    rows = {this.state.adminRows}/>;
        case "user":
            return <UserTable
                    handleState = {this.handleState}
                    rows = {this.state.userRows}
                    />;
      default:
        return 'Go home';
    }
  }

  render() {
      const { } = this.state;
      const values = { };
      
      return (
        <div>
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense" style={{backgroundColor: '#3949ab'}}>
                        { this.state.userType == 'admin' && this.state.isLogged ? 
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            :
                            null
                        }
                        <Typography variant="h6" color="inherit"> Motozalozna </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            { this.state.isLogged == false ? 
                <Container maxWidth='lg' style={{marginBottom: '2%'}}>
                    <div className="categoryName">
                        <h1>Prihlásiť sa</h1>
                    </div>
                    <div className='wrapper' style={{maxWidth: '80%', margin: 'auto'}}>
                        {/* <Form onSubmit={this.handleComponent}> */}
                        <div>
                            <div>
                                <TextField
                                    required={true}
                                    label="Meno"
                                    variant="outlined"
                                    className="loginLabel"
                                    style={{marginLeft: "10px", marginRight: "10px"}}
                                    type="text"
                                    onChange={e => this.setState({"userType": e.target.value})}
                                    margin="normal"
                                    name="krstne_meno"
                                    id="krstne_meno"
                                    size = 'small'
                                />
                            </div>
                
                            <div>
                                <TextField
                                        required={true}
                                        label="Heslo"
                                        variant="outlined"
                                        className="loginLabel"
                                        style={{marginLeft: "10px", marginRight: "10px"}}
                                        type="text"
                                        // onChange={(e) => handleCheck(e)}
                                        margin="normal"
                                        name="krstne_meno"
                                        id="krstne_meno"
                                        size = 'small'
                                    />
                            </div>
                        </div>
                        <Button style={{marginTop: "20px"}} onClick={this.handleComponent} variant="contained" color="primary">Login</Button>
                        {/* </Form> */}
                    </div> 
                </Container>
                :
                <Container maxWidth='lg' style={{marginBottom: '2%'}}>
                    <div>
                        { this.getUsersContent(this.state.userType) }
                    </div>
                </Container>
            }

          </div>
      )
  }
}



export default TableForm;