import React, { useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { Box, Checkbox, FormControlLabel, FormControl, Container, Button } from '@material-ui/core/'
import '../css/formPT.css'
import '../css/uniform.css'

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

        console.log('cenaaa', cena)

        var maximum = ((cena / 100.0) * 40.0).toFixed(0)

        console.log('maaax', maximum)
        props.handleState('cenaPozicky', maximum)

        props.nextStep()
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
                                        <Checkbox color="primary" checked={values.poskodeny_lak ? true : false} onChange={handleChange('poskodeny_lak')} />
                                    }
                                    label= {
                                        <Box component="div" fontSize={20}>
                                            Poškodený lak
                                        </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodena_karoseria ? true : false} onChange={handleChange('poskodena_karoseria')} />
                                    }
                                    label= {
                                        <Box component="div" fontSize={20}>
                                            Poškodená karoséria
                                        </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodeny_interier ? true : false} onChange={handleChange('poskodeny_interier')} />
                                    }
                                    label= {
                                        <Box component="div" fontSize={20}>
                                            Poškodený interiér
                                        </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.opotrebena_naprava ? true : false} onChange={handleChange('opotrebena_naprava')} />
                                    }
                                    label= {
                                        <Box component="div" fontSize={20}>
                                            Opotrebená náprava
                                     </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.opotrebene_pneu ? true : false} onChange={handleChange('opotrebene_pneu')} />
                                    }
                                    label= {
                                        <Box component="div" fontSize={20}>
                                            Opotrebené pneumatiky
                                     </Box>
                                    }
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodene_sklo ? true : false} onChange={handleChange('poskodene_sklo')} />
                                    }
                                    label= {
                                        <Box component="div" fontSize={20}>
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
        </MuiThemeProvider>
    )
}

export default FormCarConditionDetails;