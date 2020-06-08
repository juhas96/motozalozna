import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { findPrice } from '../service/CarPrice';


export class FormPersonalTerms extends Component {
    continue = e => {
        findPrice({
            karoseria: this.props.values.karoseria,
            palivo: this.props.values.palivo,
            pohon: this.props.values.pohon,
            prevodovka: this.props.values.prevodovka,
            vykon: this.props.values.vykon,
            vek: this.props.values.vek,
            pocetkm: this.props.values.pocetkm,
            dovezene: 0,
            auto: 168
        }).then(res => console.log('CENA VOZIDLA JE: ', res)).catch(err => console.log(err));
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
                    <h1>Podmienky</h1>
                </div>
                    <div style={{display: 'block'}}>
                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.leasing ? values.leasing : false} onChange={handleChange('leasing')} />
                                }
                                label="Potvrdzujem, že na vozidlo nie je žiadna ťarcha, leasing a iné záložné právo."
                            />
                        </FormControl>

                        <br />

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.blokacia ? values.blokacia : false} onChange={handleChange('blokacia')} />
                                }
                                label="Potvrdzujem, že na vozidlo nie je blokácia na dopravnom inšpektoráte alebo blokácia na daňovom úrade a exekútorskom úrade."
                            />
                        </FormControl>

                        <br />

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.kluc ? values.kluc : false} onChange={handleChange('kluc')} />
                                }
                                label="Potvrdzujem, že vlastním druhý náhradný kľúč."
                            />
                        </FormControl>

                        <br />

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.notar ? values.notar : false} onChange={handleChange('notar')} />
                                }
                                label="Potvrdzujem umožnenie plnej moci na zriadenie záložného práva na tlačive Motozáložne overenú notárom."
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

export default FormPersonalTerms