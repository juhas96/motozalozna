import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { DevTool } from "react-hook-form-devtools";
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '50ch',
    margin: '10px'
  },
}));

const PersonalInfoForm = () => {
  const classes = useStyles();
  const [idFile, setIdFile] = useState();
  const [carLicenseFile, setCarLicenseFile] = useState();

  const { register, errors, handleSubmit, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone_number: '',
    }
  })

    return (
      <Container className={classes.root} maxWidth='md'>
        <DevTool control={control} />
        <CssBaseline />
        <div style={{textAlign: 'center', width: '100%' }}>
          <h1>Osobné údaje</h1>
        </div>
          <form>
            <div>
              <TextField
                name="firstName"
                label="Meno"
                variant="outlined"
                error={!!errors.firstName}
                className={classes.textField}
                type="text"
                size="small"
                inputRef={register({required: true})} />

              <TextField
                name="lastName"
                label="Priezvisko"
                variant="outlined"
                error={!!errors.lastName}
                className={classes.textField}
                type="text"
                size="small"
                inputRef={register({required: true})} />
              </div>

              <div>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  className={classes.textField}
                  type="email"
                  size="small"
                  inputRef={register({required: true})} />

                <TextField
                  name="phoneNumber"
                  label="Tel. číslo"
                  variant="outlined"
                  error={!!errors.phoneNumber}
                  className={classes.textField}
                  type="tel"
                  size="small"
                  inputRef={register({required: true})} />
              </div>

              <div>
                <h2>Občiansky preukaz</h2>
              <DropzoneArea
                filesLimit="1"
                dropzoneText={"Prosím nahrajte fotku Vašeho občianskeho preukazu"}
                onChange={(files) => setIdFile(files)}  />
              </div>

              <div> 
              <h2>Vodičský preukaz</h2>
              <DropzoneArea
                filesLimit="1"
                dropzoneText={"Prosím nahrajte fotku Vašeho vodičského preukazu"}
                onChange={(files) => setCarLicenseFile(files)}  />
              </div>
          </form>
        </Container>
    )
}

export default PersonalInfoForm
