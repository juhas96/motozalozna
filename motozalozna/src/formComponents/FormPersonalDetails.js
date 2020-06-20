import React, { useEffect, useState } from 'react';
import { TextField, Button, Container }  from '@material-ui/core/';
import { Form } from 'react-bootstrap'
//FORM CSS
import './formCss/formPD.css'
import './formCss/uniformForm.css'

import './formCss/uniform.css'

const FormPersonalDetails = (props) =>  {

    const { values, handleState, handleFiles } = props;

    var regexPNPrefix = /^(\+421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/  ///^(\+[1-9]{3})? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/
    var regexPN = /^\+?(09)\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    var regexName = /^[a-zA-Z-À-ž]+$/

    var regexTMail = /^[a-zA-Z-À-ž-@.]+$/
    var regexNumber = /^[+]?[0-9]*$/

    const [ emailError, setEmailError ] = useState(false)
    const [ numberError, setNumberError ] = useState(false)

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

        if(emailError + numberError === 0 && values.krstne_meno && values.priezvisko && values.vodicskyFile && values.obcianskyFile) {
            props.nextStep();
        }
    }

    function handleCheck(e) {
        const value = e.target.value
        console.log(value);

        if(regexEmail.test(value)) {
            console.log('tady');
        }

        switch(e.target.name) {
            case 'krstne_meno': 
                if((regexName.test(value) || e.target.value === ""))
                    handleState('krstne_meno', value)
                break;
            case 'priezvisko':
                if((regexName.test(value) || value === ""))
                    handleState('priezvisko', value)
                break;
            case 'email':
                if(regexTMail.test(value) || value === "")
                    handleState('email',value)
                if(regexEmail.test(value))
                    setEmailError(false)
                else
                    setEmailError(true)
                break;
            case 'telefonne_cislo':
                if(regexNumber.test(value) || value === "")
                    handleState('telefonne_cislo', value)
                if((regexPN.test(value) || regexPNPrefix.test(value)))
                    setNumberError(false)
                else
                    setNumberError(true)
                break;
            default:
                break;
        }
    }

    return (
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
                                        label="Meno"
                                        variant="outlined"
                                        className="textLabel"
                                        type="text"
                                        onChange={(e) => handleCheck(e)}
                                        size="small"
                                        margin="normal"
                                        name="krstne_meno"
                                        id="krstne_meno"
                                        fullWidth
                                        defaultValue={values.krstne_meno ?? ''}
                                    />

                                    <TextField
                                        required={true}
                                        label="Priezvisko"
                                        variant="outlined"
                                        className="textLabel"
                                        type="text"
                                        onChange={(e) => handleCheck(e)}
                                        size="small"
                                        margin="normal"
                                        name="priezvisko"
                                        fullWidth
                                        defaultValue={values.priezvisko ?? ''}
                                    />

                                    <TextField
                                        required={true}
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
                                        defaultValue={values.email ?? ''}
                                    />

                                    <TextField
                                        required={true}
                                        label="Tel. číslo"
                                        variant="outlined"
                                        className="textLabel"
                                        type="tel"
                                        name="telefonne_cislo"
                                        error={numberError}
                                        onChange={(e) => handleCheck(e)}
                                        size="small"
                                        margin="normal"
                                        fullWidth
                                        defaultValue={values.telefonne_cislo ?? ''}
                                    />
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="wrapper">
                                <div className="attachment">
                                    <h2 className="definitionName">Občiansky preukaz</h2>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" name="ID" id="ID" onChange={(e) => handleState('obcianskyFile', e.target.files[0])}/>
                                        <label id="obciansky" className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                    {/* {showFiles(ID)} */}
                                    {/* <DropzoneArea  
                                        required = {true}
                                        filesLimit={1}
                                        onChange={(files) => setID(files)}
                                        dropzoneText={"Prosím nahrajte fotku Vašeho občianskeho preukazu"}/> */}
                                        {handleFiles(values.obcianskyFile, 'obcianskyFile')}
                                </div>

                                <div className="attachment">
                                    <h2 className="definitionName">Vodičský preukaz</h2>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" name="carLicense" id="carLicense" onChange={(e) => handleState('vodicskyFile', e.target.files[0])}/>
                                        <label id="vodicsky" className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                    {/* <DropzoneArea
                                        required = {true}
                                        filesLimit={1}
                                        value = {carLicense}
                                        onChange={(files) => setCarLicense(files)}
                                        dropzoneText={"Prosím nahrajte fotku Vašeho vodičského preukazu"} /> */}
                                        {handleFiles(values.vodicskyFile, 'vodicskyFile')}
                                </div>
                        </div>
                        <div className="customButton">
                            <Button type="submit" variant="contained" color="primary">Ďalej</Button>
                        </div>
                    </Form>
                </div>
            </Container>
    )
}

export default FormPersonalDetails;