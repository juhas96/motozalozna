import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export class FormCarConditionDetails extends Component {
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
                    <h1>Stav vozidla</h1>
                    <h2>Má Vaše vozidlo tieto poškodenia?</h2>
                </div>
                    <div style={{display: 'block'}}>
                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.poskodeny_lak} onChange={handleChange('poskodeny_lak')} />
                                }
                                label="Poškodený lak"
                            />
                        </FormControl>

                        <br />

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.poskodena_karoseria} onChange={handleChange('poskodena_karoseria')} />
                                }
                                label="Poškodená karoséria"
                            />
                        </FormControl>

                        <br />

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.poskodeny_interier} onChange={handleChange('poskodeny_interier')} />
                                }
                                label="Poškodený interiér"
                            />
                        </FormControl>

                        <br />

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.opotrebena_naprava} onChange={handleChange('opotrebena_naprava')} />
                                }
                                label="Opotrebená náprava"
                            />
                        </FormControl>

                        <br />

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.opotrebene_pneu} onChange={handleChange('opotrebene_pneu')} />
                                }
                                label="Opotrebené pneumatiky"
                            />
                        </FormControl>

                        <br />

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.poskodene_sklo} onChange={handleChange('poskodene_sklo')} />
                                }
                                label="Poškodené čelné sklo"
                            />
                        </FormControl>
                    </div>
                    <br />
                    <Button style={{marginRight: '10px'}} onClick={this.back} variant="contained" color="primary">Späť</Button>
                    <Button onClick={this.continue} variant="contained" color="primary">Ďalej</Button>
                </Container>
            </MuiThemeProvider>
        )
    }
}

export default FormCarConditionDetails;