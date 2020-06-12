import React, { Component, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { TextField, Button, Container }  from '@material-ui/core/';
import { Form } from 'react-bootstrap'
//FORM CSS
import '../css/formPD.css'
import '../css/uniformForm.css'

import '../css/uniform.css'

const FormPersonalDetails = (props) =>  {

    const { values, handleChange, handleState } = props;

    var regexPNPrefix = /^(\+421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{2}$/  ///^(\+[1-9]{3})? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/
    var regexPN = /^\+?(09)\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})$/
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    var regexName = /^[a-zA-Z-À-ž]+$/

    var regexTMail = /^[a-zA-Z-À-ž-@.]+$/
    var regexNumber = /^[+]?[0-9]*$/

    const [ firstName, setFirstName ] = useState()
    const [ lastName, setLastName ] = useState()
    const [ email, setEmail ] = useState()
    const [ number, setNumber ] = useState()
    const [ carLicense, setCarLicense ] = useState()
    const [ ID ,setID ] = useState()

    const [ emailError, setEmailError ] = useState(false)
    const [ numberError, setNumberError ] = useState(false)

    useEffect(() => {
        setFirstName(values.firstName); setLastName(values.lastName); setEmail(values.email); setNumber(values.phoneNumber)

        setTimeout(function () {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

        }, 25);
    }, [ setFirstName, setLastName, setEmail, setNumber ]) 

    const continueNext = e => {
        e.preventDefault();

        if(emailError + numberError === 0 && ID != 0 && carLicense != 0) {
            handleState('firstName', firstName); handleState('lastName', lastName)
            handleState('email', email); handleState('phoneNumber', number)
            handleState('vodicskyFile', carLicense); handleState('obcianskyFile', ID)
            props.nextStep();
        }
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    function handleCheck(e) {
        const value = e.target.value

        switch(e.target.name) {
            case 'firstName': 
                if(regexName.test(value) || e.target.value === "")
                    setFirstName(value)
                break;
            case 'lastName':
                if(regexName.test(value) || value === "")
                    setLastName(value)
                break;
            case 'email':
                if(regexTMail.test(value) || value === "")
                    setEmail(value)
                if(regexEmail.test(email))
                    setEmailError(false)
                else
                    setEmailError(true)
                break;
            case 'phoneNumber':
                if(regexNumber.test(value) || value === "")
                    setNumber(value)
                if((regexPN.test(number) || regexPNPrefix.test(number)))
                    setNumberError(false)
                else
                    setNumberError(true)
                break;
        }
    }

    return (
        <MuiThemeProvider>
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div>
                    <Form onSubmit={continueNext}>
                        <div className="categoryName">
                            <h1>Osobné údaje</h1>
                        </div>
                        <div className="wrapper">
                            <h2>Základné informácie</h2>
                                <div className="textHolders">
                                    <TextField
                                        required={true}
                                        inputProps={{style: {fontSize: 22.0}}}
                                        label="Meno"
                                        variant="outlined"
                                        className="textLabel"
                                        type="text"
                                        onChange={(e) => handleCheck(e)}
                                        size="small"
                                        margin="normal"
                                        name="firstName"
                                        id="firstName"
                                        fullWidth
                                        defaultValue={values.firstName}
                                    />

                                    <TextField
                                        required={true}
                                        inputProps={{style: {fontSize: 22.0}}}
                                        label="Priezvisko"
                                        variant="outlined"
                                        className="textLabel"
                                        type="text"
                                        onChange={(e) => handleCheck(e)}
                                        size="small"
                                        margin="normal"
                                        name="lastName"
                                        fullWidth
                                        defaultValue={values.lastName ? values.lastName : ''}
                                    />

                                    <TextField
                                        required={true}
                                        inputProps={{style: {fontSize: 22.0}}}
                                        label="Email"
                                        variant="outlined"
                                        className="textLabel"
                                        type="email"
                                        error={emailError}
                                        onChange={(e) => handleCheck(e)}
                                        size="small"
                                        margin="normal"
                                        name="email"
                                        fullWidth
                                        defaultValue={values.email ? values.email : ''}
                                    />

                                    <TextField
                                        required={true}
                                        inputProps={{style: {fontSize: 22.0}}}
                                        label="Tel. číslo"
                                        variant="outlined"
                                        className="textLabel"
                                        type="tel"
                                        name="phoneNumber"
                                        error={numberError}
                                        onChange={(e) => handleCheck(e)}
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
                                    <h2 className="definitionName">Občiansky preukaz</h2>
                                    <DropzoneArea
                                        required = {true}
                                        filesLimit={1}
                                        onChange={(files) => setID(files)}
                                        dropzoneText={"Prosím nahrajte fotku Vašeho občianskeho preukazu"}/>
                                </div>

                                <div className="attachment">
                                    <h2 className="definitionName">Vodičský preukaz</h2>
                                    <DropzoneArea
                                        required = {true}
                                        filesLimit={1}
                                        onChange={(files) => setCarLicense(files)}
                                        dropzoneText={"Prosím nahrajte fotku Vašeho vodičského preukazu"} />
                                </div>
                            </div>
                        <div className="customButton">
                            <Button type="submit" variant="contained" color="primary">Ďalej</Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </MuiThemeProvider>
    )
}

export default FormPersonalDetails;