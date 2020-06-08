import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export class FormCarInfoDetails extends Component {
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
                    <h1>Údaje o vozidle</h1>
                </div>
                    <div style={{display: 'block'}}>
                        <FormControl style={{marginRight: '10px'}}>
                            <InputLabel id="karoseria-label">Typ karosérie</InputLabel>
                            <Select
                                style={{width: '25ch'}}
                                labelId="karoseria"
                                id="karoseria"
                                onChange={handleChange('karoseria')}
                                defaultValue={values.karoseria ? values.karoseria : 0}>
                                <MenuItem value={0}>Hachback / Sedan</MenuItem>
                                <MenuItem value={1}>Kombi</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel id="palivo-label">Palivo</InputLabel>
                            <Select
                                style={{width: '25ch'}}
                                labelId="palivo"
                                id="palivo"
                                onChange={handleChange('palivo')}
                                defaultValue={values.palivo ? values.palivo : 0}>
                                <MenuItem value={0}>Benzín</MenuItem>
                                <MenuItem value={1}>Nafta</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{display: 'block'}}>
                        <FormControl style={{marginRight: '10px'}}>
                            <InputLabel id="pohon-label">Typ pohonu</InputLabel>
                            <Select
                                style={{width: '25ch'}}
                                labelId="pohon"
                                id="pohon"
                                onChange={handleChange('pohon')}
                                defaultValue={values.pohon ? values.pohon : 0}>
                                <MenuItem value={0}>Jednej nápravy</MenuItem>
                                <MenuItem value={1}>4x4</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel id="prevodovka-label">Prevodovka</InputLabel>
                            <Select
                                style={{width: '25ch'}}
                                labelId="prevodovka"
                                id="prevodovka"
                                onChange={handleChange('prevodovka')}
                                defaultValue={values.prevodovka ? values.prevodovka : 0}>
                                <MenuItem value={0}>Manuálna</MenuItem>
                                <MenuItem value={1}>Automatická</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <TextField
                            label="Vykon v KW"
                            variant="outlined"
                            type="number"
                            onChange={handleChange('vykon')}
                            size="small"
                            margin="normal"
                            fullWidth
                            defaultValue={values.vykon ? values.vykon : 0}/>

                        <TextField
                            label="Vek vozidla v rokoch"
                            variant="outlined"
                            type="number"
                            onChange={handleChange('vek')}
                            size="small"
                            margin="normal"
                            fullWidth
                            defaultValue={values.vek ? values.vek : 0}/>
                    </div>

                    <div>
                        <TextField
                            label="Počet najazdených km"
                            variant="outlined"
                            type="number"
                            onChange={handleChange('pocetkm')}
                            size="small"
                            margin="normal"
                            fullWidth
                            defaultValue={values.pocetkm ? values.pocetkm : 0}/>

                        <TextField
                            label="EČV vozidla"
                            variant="outlined"
                            type="text"
                            onChange={handleChange('ec')}
                            size="small"
                            margin="normal"
                            fullWidth
                            defaultValue={values.ec ? values.ec : 0}/>
                    </div>

                    <div>
                        <h2>Poistenie vozidla</h2>
                        <DropzoneArea
                            filesLimit="1"
                            dropzoneText={"Prosím nahrajte potvrdenie o poisteni Vašeho vozidla"}/>
                    </div>

                    <div> 
                        <h2>Fotky vozidla</h2>
                        <DropzoneArea
                            filesLimit="1"
                            dropzoneText={"Prosím nahrajte fotky Vašeho vozidla"} />
                    </div>
                    <br />
                    <Button style={{marginRight: '10px'}} onClick={this.back} variant="contained" color="primary">Späť</Button>
                    <Button onClick={this.continue} variant="contained" color="primary">Ďalej</Button>
                </Container>
            </MuiThemeProvider>
        )
    }
}

export default FormCarInfoDetails;