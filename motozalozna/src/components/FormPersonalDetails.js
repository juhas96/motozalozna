import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export class FormPersonalDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    

    render() {
        const { values, handleChange } = this.props;

        return (
            <MuiThemeProvider>
                <Container maxWidth='md' style={{marginBottom: '2%'}}>
                    <div style={{textAlign: 'center', width: '100%' }}>
                        <h1>Osobné údaje</h1>
                    </div>
                    <div>
                        <TextField
                            label="Meno"
                            variant="outlined"
                            type="text"
                            onChange={handleChange('firstName')}
                            size="small"
                            margin="normal"
                            fullWidth
                            defaultValue={values.firstName ? values.firstName : ''}/>

                        <TextField
                            label="Priezvisko"
                            variant="outlined"
                            type="text"
                            onChange={handleChange('lastName')}
                            size="small"
                            margin="normal"
                            fullWidth
                            defaultValue={values.lastName ? values.lastName : ''}/>
                    </div>

                    <div>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            onChange={handleChange('email')}
                            size="small"
                            margin="normal"
                            fullWidth
                            defaultValue={values.email ? values.email : ''}/>

                        <TextField
                            label="Tel. číslo"
                            variant="outlined"
                            type="tel"
                            onChange={handleChange('phoneNumber')}
                            size="small"
                            margin="normal"
                            fullWidth
                            defaultValue={values.phoneNumber ? values.phoneNumber : ''}/>
                    </div>

                    <div>
                        <h2>Občiansky preukaz</h2>
                        <DropzoneArea
                            filesLimit="1"
                            dropzoneText={"Prosím nahrajte fotku Vašeho občianskeho preukazu"}/>
                    </div>

                    <div> 
                        <h2>Vodičský preukaz</h2>
                        <DropzoneArea
                            filesLimit="1"
                            dropzoneText={"Prosím nahrajte fotku Vašeho vodičského preukazu"} />
                    </div>
                    <br />
                    <Button onClick={this.continue} variant="contained" color="primary">Ďalej</Button>
                </Container>
            </MuiThemeProvider>
        )
    }
}

export default FormPersonalDetails;