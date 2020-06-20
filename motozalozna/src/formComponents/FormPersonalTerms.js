import React, { Component, useEffect } from 'react';
import { Checkbox, Box, FormControlLabel, FormControl, Container, Button } from '@material-ui/core/';
import './formCss/formPT.css'
import './formCss/uniform.css'

const FormPersonalTerms = (props) => {
    
    const { values, handleChange } = props;

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

        if((values.leasing + values.notar + values.kluc + values.blokacia) == 4) {
            props.nextStep()
        }
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    return (
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div className="categoryName">
                    <h1>Podmienky</h1>
                </div>
                <div className="wrapper" style={{'textAlign': "left"}}>
                    <FormControl>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.leasing ?? false} onChange={handleChange('leasing')} />
                                }
                                label= {
                                    <Box component="div">
                                        1. Potvrdzujem, že na vozidlo nie je žiadna ťarcha, leasing a iné záložné právo.
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.blokacia ?? false} onChange={handleChange('blokacia')} />
                                }
                                label= {
                                    <Box component="div">
                                        2. Potvrdzujem, že na vozidlo nie je blokácia na dopravnom inšpektoráte alebo blokácia na daňovom úrade a exekútorskom úrade.
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.kluc ?? false} onChange={handleChange('kluc')} />
                                }
                                label= {
                                    <Box component="div">
                                        3. Potvrdzujem, že vlastním druhý náhradný kľúč.
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.notar ?? false} onChange={handleChange('notar')} />
                                }
                                label= {
                                    <Box component="div">
                                        4. Potvrdzujem umožnenie plnej moci na zriadenie záložného práva na tlačive Motozáložne overenú notárom.
                                     </Box>
                                }
                            />
                        </div>

                    </FormControl>
                </div>
                <div className="customButton">
                    <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                    <Button id='nextButton' name='nextButton' onClick={continueNext} variant="contained" color="primary">Ďalej</Button>
                </div>
            </Container>
    )
}

export default FormPersonalTerms