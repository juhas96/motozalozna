import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'block',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

function CarConditionForm() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        poskodeny_lak: false,
        poskodena_karoseria: false,
        poskodeny_interier: false,
        opotrebena_naprava: false,
        opotrebene_pneu: false,
        poskodene_sklo: false
    });

    const {poskodeny_lak, poskodena_karoseria, poskodeny_interier, opotrebena_naprava, opotrebene_pneu, poskodene_sklo} = state;
    const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    };

//     Polodeny lak 300€
// Poškodená karoséria 300€
// Poškodený interiér 300€
// Opotrebena náprava 300€
// Opotrebene pneu 300€
// Poškodené čelne sklo 300€

    return (
        <Container className={classes.root} maxWidth='md'>
            <CssBaseline />
            <div style={{textAlign: 'center', width: '100%' }}>
                <h1>Stav vozidla</h1>
                <h2>Má Vaše vozidlo tieto poškodenia?</h2>
            </div>
            <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={poskodeny_lak} onChange={handleChange} name="poskodeny_lak" />}
            label="Poškodený lak"
          />
          <FormControlLabel
            control={<Checkbox checked={poskodena_karoseria} onChange={handleChange} name="poskodena_karoseria" />}
            label="Poškodená karoséria"
          />
          <FormControlLabel
            control={<Checkbox checked={poskodeny_interier} onChange={handleChange} name="poskodeny_interier" />}
            label="Poškodený interiér"
          />
           <FormControlLabel
            control={<Checkbox checked={opotrebena_naprava} onChange={handleChange} name="opotrebena_naprava" />}
            label="Opotrebená náprava"
          />
           <FormControlLabel
            control={<Checkbox checked={opotrebene_pneu} onChange={handleChange} name="opotrebene_pneu" />}
            label="Opotrebené pneumatiky"
          />
           <FormControlLabel
            control={<Checkbox checked={poskodene_sklo} onChange={handleChange} name="poskodene_sklo" />}
            label="Poškodené čelné sklo"
          />
        </FormGroup>
      </FormControl>
            
        </Container>
    )
}

export default CarConditionForm
