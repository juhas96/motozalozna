import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { findPrice } from '../service/CarPrice';
import '../css/formPT.css'
import '../css/uniform.css'

const FormPersonalTerms = (props) => {
    const { values, handleChange } = props;

    const continueNext = e => {
        findPrice({
            karoseria: props.values.karoseria,
            palivo: props.values.palivo,
            pohon: props.values.pohon,
            prevodovka: props.values.prevodovka,
            vykon: props.values.vykon,
            vek: props.values.vek,
            pocetkm: props.values.pocetkm,
            dovezene: 0,
            auto: 168
        }).then(res => console.log('CENA VOZIDLA JE: ', res)).catch(err => console.log(err));

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
                <div className="categoryName">
                    <h1>Podmienky</h1>
                </div>
                <div className="wrapper" style={{'textAlign': "left"}}>
                    <FormControl>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.leasing ? values.leasing : false} onChange={handleChange('leasing')} />
                                }
                                label="1. Potvrdzujem, že na vozidlo nie je žiadna ťarcha, leasing a iné záložné právo."
                            />
                        </div>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.blokacia ? values.blokacia : false} onChange={handleChange('blokacia')} />
                                }
                                label="2. Potvrdzujem, že na vozidlo nie je blokácia na dopravnom inšpektoráte alebo blokácia na daňovom úrade a exekútorskom úrade."
                            />
                        </div>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.kluc ? values.kluc : false} onChange={handleChange('kluc')} />
                                }
                                label="3. Potvrdzujem, že vlastním druhý náhradný kľúč."
                            />
                        </div>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.notar ? values.notar : false} onChange={handleChange('notar')} />
                                }
                                label="4. Potvrdzujem umožnenie plnej moci na zriadenie záložného práva na tlačive Motozáložne overenú notárom."
                            />
                        </div>

                    </FormControl>
                </div>
                <div className="customButton">
                    <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                    <Button onClick={continueNext} variant="contained" color="primary">Ďalej</Button>
                </div>
            </Container>
        </MuiThemeProvider>
    )
}

export default FormPersonalTerms