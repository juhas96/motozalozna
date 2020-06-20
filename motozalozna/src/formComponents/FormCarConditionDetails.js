import React, { useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, FormControl, Container, Button } from '@material-ui/core/'
import './formCss/formPT.css'
import './formCss/uniform.css'

const FormCarConditionDetails = (props) =>  {

    const { values, handleChange } = props;

    useEffect(() => {
        console.log(values)
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

        var skoda = values.poskodena_karoseria + values.poskodene_sklo + values.poskodeny_interier + values.opotrebena_naprava + values.opotrebene_pneu + values.poskodeny_lak
        skoda = skoda*300


        var cena = values.cena - skoda
        props.handleState('cena', cena)

        var maximum = ((cena / 100.0) * 40.0).toFixed(0)

        props.handleState('cenaPozicky', maximum)
        props.handleState('vysledna_pozicka', maximum)

        props.nextStep()
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    return (
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div>
                <div className="categoryName">
                    <h1>Stav vozidla</h1>
                </div>
                    <div className="wrapper" style={{'textAlign': "center"}}>
                        <div className="descriptionLabel">
                            <h2>Má Vaše vozidlo tieto poškodenia?</h2>
                        </div>
                        <FormControl>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodeny_lak ?? false} onChange={handleChange('poskodeny_lak')} />
                                    }
                                    label= {
                                        <Box component="div" >
                                            Poškodený lak
                                        </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodena_karoseria ?? false} onChange={handleChange('poskodena_karoseria')} />
                                    }
                                    label= {
                                        <Box component="div">
                                            Poškodená karoséria
                                        </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodeny_interier ?? false} onChange={handleChange('poskodeny_interier')} />
                                    }
                                    label= {
                                        <Box component="div">
                                            Poškodený interiér
                                        </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.opotrebena_naprava ?? false} onChange={handleChange('opotrebena_naprava')} />
                                    }
                                    label= {
                                        <Box component="div">
                                            Opotrebená náprava
                                     </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.opotrebene_pneu ?? false} onChange={handleChange('opotrebene_pneu')} />
                                    }
                                    label= {
                                        <Box component="div">
                                            Opotrebené pneumatiky
                                     </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodene_sklo ?? false} onChange={handleChange('poskodene_sklo')} />
                                    }
                                    label= {
                                        <Box component="div">
                                            Poškodené čelné sklo
                                        </Box>
                                    }
                                />
                            </div>

                        </FormControl>
                    </div>
                    <div className="customButton">
                        <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                        <Button onClick={continueNext} variant="contained" color="primary">Ďalej</Button>
                    </div>
                </div>
            </Container>
    )
}

export default FormCarConditionDetails;