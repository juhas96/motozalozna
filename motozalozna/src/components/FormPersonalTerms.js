import React, { Component, useEffect } from 'react';
import { Checkbox, Box, FormControlLabel, FormControl, Container, Button } from '@material-ui/core/';
import '../css/formPT.css'
import '../css/uniform.css'

const FormPersonalTerms = (props) => {
    
    const { values, handleChange } = props;
    return (
        <div>
                <div className="wrapper" style={{'textAlign': "left"}}>
                <div className="categoryName" style={{'textAlign': "center"}}>
                    <h1 className='whiterText'>Podmienky</h1>
                </div>
                    <FormControl>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox className='orangeCheckbox'  checked={values.leasing ? values.leasing : false} onChange={handleChange('leasing')} />
                                }
                                label= {
                                    <Box component="div">
                                        <span className='whiterText'>1. Potvrdzujem, že na vozidlo nie je žiadna ťarcha, leasing a iné záložné právo.</span>
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox className='orangeCheckbox'  checked={values.blokacia ? values.blokacia : false} onChange={handleChange('blokacia')} />
                                }
                                label= {
                                    <Box component="div">
                                        <span className='whiterText'>2. Potvrdzujem, že na vozidlo nie je blokácia na dopravnom inšpektoráte alebo blokácia na daňovom úrade a exekútorskom úrade.</span>
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox className='orangeCheckbox'  checked={values.kluc ? values.kluc : false} onChange={handleChange('kluc')} />
                                }
                                label= {
                                    <Box component="div">
                                        <span className='whiterText'>3. Potvrdzujem, že vlastním druhý náhradný kľúč.</span>
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker">
                            <FormControlLabel
                                control={
                                    <Checkbox className='orangeCheckbox'  checked={values.notar ? values.notar : false} onChange={handleChange('notar')} />
                                }
                                label= {
                                    <Box component="div">
                                        <span className='whiterText'>4. Potvrdzujem umožnenie plnej moci na zriadenie záložného práva na tlačive Motozáložne overenú notárom.</span>
                                     </Box>
                                }
                            />
                        </div>

                    </FormControl>
                </div>
                </div>
    )
}

export default FormPersonalTerms