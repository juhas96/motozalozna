import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { DevTool } from "react-hook-form-devtools";
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'blcok',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
      margin: '10px'
    },
    // formControl: {
    //     margin: theme.spacing(1),
    //     minWidth: 120,
    //   },
    //   selectEmpty: {
    //     marginTop: theme.spacing(2),
    //   }
  }));

const CarInfoForm = () => {
    const classes = useStyles();
    const {register, errors, handleSubmit, control} = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            karoseria: '',
            palivo: '',
            pohon: '',
            prevodovka: '',
            vykon: '',
            vek: '',
            ec: '',
            km: ''
        }
    })

    return (
        <Container className={classes.root} maxWidth='md'>
            <DevTool control={control} />
            <CssBaseline />
            <div style={{textAlign: 'center', width: '100%' }}>
                <h1>Údaje o vozidle</h1>
            </div>
            <form>
            <div style={{display: 'block'}}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="karoseria-label">Typ karosérie</InputLabel>
                    <Select
                        labelId="karoseria"
                        name="karoseria"
                        id="karoseria"
                        className={classes.textField}
                        >
                        <MenuItem value={0}>Hachback / Sedan</MenuItem>
                        <MenuItem value={1}>Kombi</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="palivo-label">Palivo</InputLabel>
                    <Select
                        labelId="palivo"
                        name="palivo"
                        id="palivo"
                        className={classes.textField}
                        >
                        <MenuItem value={0}>Benzín</MenuItem>
                        <MenuItem value={1}>Nafta</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="pohon-label">Typ pohonu</InputLabel>
                    <Select
                        labelId="pohon"
                        name="pohon"
                        id="pohon"
                        className={classes.textField}
                        >
                        <MenuItem value={0}>Jednej nápravy</MenuItem>
                        <MenuItem value={1}>4x4</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="prevodovka-label">Prevodovka</InputLabel>
                    <Select
                        labelId="prevodovka"
                        name="prevodovka"
                        id="prevodovka"
                        className={classes.textField}
                        >
                        <MenuItem value={0}>Manuálna</MenuItem>
                        <MenuItem value={1}>Automatická</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div>
              <TextField
                name="vykon"
                label="Výkon v kw"
                variant="outlined"
                error={!!errors.vykon}
                className={classes.textField}
                type="number"
                inputRef={register({required: true})} />

              <TextField
                name="vek"
                label="Vek vozidla v rokoch"
                variant="outlined"
                error={!!errors.vek}
                className={classes.textField}
                type="number"
                inputRef={register({required: true})} />
              </div>

              <div>
              <TextField
                name="km"
                label="Pocet najazdených km"
                variant="outlined"
                error={!!errors.km}
                className={classes.textField}
                type="number"
                inputRef={register({required: true})} />

              <TextField
                name="ec"
                label="ECV Vozidla"
                variant="outlined"
                error={!!errors.ec}
                className={classes.textField}
                type="text"
                inputRef={register({required: true})} />
              </div>

              <div>
                  <div>
              <h2>Poistenie vozidla</h2>
              <DropzoneArea
                filesLimit="1"
                dropzoneText={"Prosím nahrajte potvrdenie o poisteni Vašeho vozidla"}
                />
                </div>
                <div>
                <h2>Fotky vozidla</h2>
              <DropzoneArea
                filesLimit="10"
                dropzoneText={"Prosím nahrajte fotky Vašeho vozidla"}
                />
                </div>
              </div>
            </form>
        </Container>
    )
}

export default CarInfoForm
