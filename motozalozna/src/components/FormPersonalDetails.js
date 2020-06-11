import React, { Component, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
//FORM CSS
import '../css/formPD.css'
import '../css/uniformForm.css'

import '../css/uniform.css'

const FormPersonalDetails = (props) =>  {

    const { values, handleChange, parentCallback } = props;
    var regexPNPrefix = /^(\+421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/  ///^(\+[1-9]{3})? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/
    var regexPN = /^\+?(09)\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
    var regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z]+[.]+[a-zA-Z]{2,3}?$/

    useEffect(() => {
        setTimeout(function () {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

        }, 25);
    }, []) 

    const continueNext = e => {
        e.preventDefault();
        
        props.nextStep();
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    return (
        <MuiThemeProvider>
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div>
                    <div className="categoryName">
                        <h1>Osobné údaje</h1>
                    </div>
                    <div className="wrapper">
                        <h3>Základné informácie</h3>
                            <div className="textHolders">
                                <TextField
                                    pattern = "^[a-zA-Z-À-ž]+$"
                                    inputProps = {{ pattern: /^[a-zA-Z-À-ž]+$/}}
                                    label="Meno"
                                    variant="outlined"
                                    className="textLabel"
                                    type="text"
                                    // onChange={}
                                    size="small"
                                    margin="normal"
                                    name="firstName"
                                    fullWidth
                                    defaultValue={values.firstName ? values.firstName : ''}
                                />

                                <TextField
                                    label="Priezvisko"
                                    variant="outlined"
                                    className="textLabel"
                                    type="text"
                                    onChange={handleChange('lastName')}
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={values.lastName ? values.lastName : ''}
                                />

                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    className="textLabel"
                                    type="email"
                                    onChange={handleChange('email')}
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={values.email ? values.email : ''}
                                />

                                <TextField
                                    label="Tel. číslo"
                                    variant="outlined"
                                    className="textLabel"
                                    type="tel"
                                    onChange={handleChange('phoneNumber')}
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={values.phoneNumber ? values.phoneNumber : ''}
                                />
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="wrapper">
                            <div className="attachment">
                                <h3 className="definitionName">Občiansky preukaz</h3>
                                <DropzoneArea
                                    filesLimit={1}
                                    dropzoneText={"Prosím nahrajte fotku Vašeho občianskeho preukazu"}/>
                            </div>

                            <div className="attachment">
                                <h3 className="definitionName">Vodičský preukaz</h3>
                                <DropzoneArea
                                    filesLimit={1}
                                    dropzoneText={"Prosím nahrajte fotku Vašeho vodičského preukazu"} />
                            </div>
                        </div>
                    <div className="customButton">
                        <Button onClick={continueNext} variant="contained" color="primary">Ďalej</Button>
                    </div>
                </div>
            </Container>
        </MuiThemeProvider>
    )
}

export default FormPersonalDetails;