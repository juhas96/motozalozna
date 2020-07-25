import React, { useEffect, useState } from 'react';
import { TextField, Button, Container }  from '@material-ui/core/';
import { Form } from 'react-bootstrap'
import FormLoanDetails from './FormLoanDetails';
import FormPersonalTerms from './FormPersonalTerms'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//FORM CSS
import '../css/formPD.css'
import '../css/uniformForm.css'

import '../css/uniform.css'

const FormPersonalDetails = (props) =>  {

    const { values, handleState, handleFiles, handleChange, handlePushLast } = props;

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
        if(emailError + numberError === 0 && values.krstne_meno && values.priezvisko && values.technickyFile && values.obcianskyFile && ((values.leasing + values.notar + values.kluc + values.blokacia) == 4)) {
            props.nextStep();
        } else {
            toast.error('Musíte vyplniť všetky polia.', {position: toast.POSITION.TOP_RIGHT});
        }
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
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
                if(regexEmail.test(value) || value === "")
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

    function handleCar(value) {
        if(value != undefined)
            handleState('auto', value.key);
    }

    function handleVozidlo(e) {
        if(values.vozidloFiles && e.target.files.length == 1)
            handlePushLast(e.target.files[0])
        else if(values.vozidloFiles)
            handlePushLast(e.target.files)
        else
            handleState('vozidloFiles', e.target.files)
    }

    return (
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div>
                    <Form onSubmit={continueNext}>
                        <div className="categoryName">
                            <h1>Osobné údaje</h1>
                        </div>
                        <div className="wrapper">
                            <h2 className="whiterText">Kontaktné údaje</h2>
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

                            <FormLoanDetails
                                handleState = {handleState}
                                handleChange={handleChange}
                                values={values}/>

                            <div className="divider"></div>

                            <div className="wrapper">
                                <div className="attachment">
                                    <h2 className="definitionName whiterText">Občiansky preukaz</h2>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" name="ID" id="ID" onChange={(e) => handleState('obcianskyFile', e.target.files[0])}/>
                                        <label id="obciansky" className="custom-file-label" htmlFor="customFile">Vyberte súbor</label>
                                    </div>
                                        {handleFiles(values.obcianskyFile, 'obcianskyFile')}
                                </div>

                                <div className="attachment">
                                    <h2 className="definitionName whiterText">Technický preukaz</h2>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" name="carLicense" id="carLicense" onChange={(e) => handleState('technickyFile', e.target.files[0])}/>
                                        <label id="technicky" className="custom-file-label" htmlFor="customFile">Vyberte súbor</label>
                                    </div>
                                        {handleFiles(values.technickyFile, 'technickyFile')}
                                </div>

                                <div className="attachment">
                                <h2 className="definitionName whiterText">Fotky vozidla</h2>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile" multiple onChange={(e) => handleVozidlo(e)}/>
                                    <label id="vodicsky" className="custom-file-label" htmlFor="customFile">Vyberte súbor</label>
                                </div>
                                    {handleFiles(values.vozidloFiles, 'vozidloFiles')}
                            </div>
                            </div>
                            <div className="divider"></div>
                            <FormPersonalTerms
                                handleState = {handleState}
                                handleChange = {handleChange}
                                values= {values} />

                        <div className="customButton">
                            <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                            <Button 
                                onClick={continueNext}
                                disabled={((values.leasing + values.notar + values.kluc + values.blokacia) != 4)}
                                type="submit"
                                variant="contained"
                                color="primary">
                                    Ďalej
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
    )
}

export default FormPersonalDetails;