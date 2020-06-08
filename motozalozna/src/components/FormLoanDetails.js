import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

export class FormLoanDetails extends Component {
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
        const marks = [
            {
              value: 0,
              label: '0€',
            },
            {
              value: 10000,
              label: '10000€',
            }
        ];

        function valueText(value) {
            return `${value}€`;
        }

        return (
            <MuiThemeProvider>
                <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div style={{textAlign: 'center', width: '100%' }}>
                    <h1>Stav vozidla</h1>
                </div>
                    <div style={{display: 'block'}}>
                        <h3>Chcete Vaše vozidlo používať počas záložného práva?</h3>
                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.zalozne_pravo ? values.zalozne_pravo : false} onChange={handleChange('zalozne_pravo')} />
                                }
                                label="Áno"
                            />
                        </FormControl>

                        <br />

                        <FormControl style={{marginRight: '10px'}}>
                            <InputLabel id="dlzka_pozicky-label">Dĺžka pôžičky</InputLabel>
                            <Select
                                style={{width: '25ch'}}
                                labelId="dlzka_pozicky"
                                id="dlzka_pozicky"
                                onChange={handleChange('dlzka_pozicky')}
                                defaultValue={values.dlzka_pozicky ? values.dlzka_pozicky : 0}>
                                <MenuItem value={0}>1 Týždeň</MenuItem>
                                <MenuItem value={1}>2 Týždne</MenuItem>
                                <MenuItem value={2}>Mesiac</MenuItem>
                            </Select>
                        </FormControl>

                        <br />
                        <br />
                        <Typography id="discrete-slider-custom" gutterBottom>
                            <h2>Vyberte si výšku Vašej pôžičky</h2>
                        </Typography>
                        <Slider
                            defaultValue={0}
                            min={0}
                            max={10000}
                            getAriaValueText={valueText}
                            aria-labelledby="discrete-slider-custom"
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </div>
                    <br />
                    <Button style={{marginRight: '10px'}} onClick={this.back} variant="contained" color="primary">Späť</Button>
                    <Button variant="contained" color="primary">Potvrdiť</Button>
                </Container>
            </MuiThemeProvider>
        )
    }
}

export default FormLoanDetails;