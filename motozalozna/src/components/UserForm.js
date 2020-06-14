import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Button } from '@material-ui/core/';
import FormPersonalDetails from './FormPersonalDetails';
import FormCarInfoDetails from './FormCarInfoDetails';
import FormCarConditionDetails from './FormCarConditionDetails';
import FormPersonalTerms from './FormPersonalTerms';
import FormLoanDetails from './FormLoanDetails';
import Summary from './Summary';

import '../css/uniform.css'

export class UserForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      step: 1,

      krstne_meno: '',
      priezvisko: '',
      email: '',
      telefonne_cislo: null,

      karoseria: null, 
      palivo: null,
      pohon: null,
      prevodovka: null,
      vykon: null,
      vek: null,
      ec: '',
      pocetkm: null,

      poskodeny_lak: false,
      poskodena_karoseria: false,
      poskodeny_interier: false,
      opotrebena_naprava: false,
      opotrebene_pneu: false,
      poskodene_sklo: false,

      leasing: false,
      kluc: false,
      notar: false,
      blokacia: false,
      zalozne_pravo: '',

      dlzka_pozicky: null,
      cena: null,
      auto: null,
      autoIndex: null,
      autoName: '',
      cenaPozicky: null,
      vysledna_pozicka: null,

      obcianskyFile: null,
      vodicskyFile: null,
      poistenieFile: null,
      vozidloFiles: null,
    };

    this.handleState = this.handleState.bind(this)
  }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    // Proceed to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    // Handle input change
    handleChange = input => e => {
      console.log(e.target)
        this.setState({ [input]: e.target.value || e.target.checked });
        console.log(this.state.vodickyFile)
    }

    handlePushLast = (value) => {
      this.setState(prevState => ({
        vozidloFiles: [...prevState.vozidloFiles, value]
      }))
    }

    handleState = async (name, data) => {
      await this.setState({
        [name]: data
      }, function() {
        console.log(this.state)
      })
    }

    showFiles = (type, typeName) => {
      if( type && Object.keys(type).length > 0 )
        return (
          <div>
            {
              Object.entries(type).map((e, inx) => {
                return (
                  <div className="fileShow">
                    <label>{e[1].name}</label>
                    <Button onClick={this.handleDelete.bind(this, e[1], typeName)}>Delete</Button>
                  </div>
                )
              })
            }
          </div>
        )
      else
        return(
            <div>{
              type ? <div className="fileShow"> 

              {type.name ? 
                <div>
                  <label>{type.name}</label>
                  <Button onClick={this.handleDelete.bind(this, type, typeName)}>Delete</Button> 
                </div> :<div> </div>
              }
                </div> : <div> </div> 

            }</div>
        )
  }

  handleDelete(file, fileName) {
    switch(fileName) {
      case 'vozidloFiles':
        var array = [...this.state.vozidloFiles]
        var index = array.indexOf(file);
        if (index > -1) { 
          array.splice(index, 1);
        }
        this.setState({vozidloFiles: array});
        break;
      case 'poistenieFile':
        this.setState({poistenieFile: null})
        break;
      case 'obcianskyFile':
        this.setState({obcianskyFile: null})
        break;
      case 'vodicskyFile':
        this.setState({vodicskyFile: null})
        break;
    }
  }

  getStepContent = (stepIndex, values, summaryValues) => {
    switch (stepIndex) {
      case 0:
        return <FormPersonalDetails
                    handleFiles = {this.showFiles}
                    handleState = {this.handleState}
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}/>;
      case 1:
        return <FormCarInfoDetails
                    handlePushLast = {this.handlePushLast}
                    handleFiles = {this.showFiles}
                    handleState = {this.handleState}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}/>;
      case 2:
        return <FormCarConditionDetails
                    handleState = {this.handleState}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}/>;
      case 3:
        return <FormPersonalTerms
                    handleState = {this.handleState}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}/>;
      case 4:
        return <FormLoanDetails
                    handleState = {this.handleState}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}/>;
      case 5:
        return <Summary
                    prevStep={this.prevStep}
                    values={summaryValues}/>;
      default:
        return 'Unknown stepIndex';
    }
  }

  render() {
      // const classes = useStyles();
      const steps = getSteps();
      const { step } = this.state;
      const { karoseria, palivo, pohon, prevodovka, vykon,
              vek, ec, pocetkm, krstne_meno, priezvisko, email, telefonne_cislo,
              poskodeny_lak, poskodena_karoseria, poskodeny_interier,
              opotrebena_naprava, opotrebene_pneu, poskodene_sklo, leasing, kluc, notar, blokacia, zalozne_pravo, dlzka_pozicky, cena, auto, cenaPozicky, obcianskyFile,
              vodicskyFile,
              poistenieFile,
              autoIndex,
              vozidloFiles, vysledna_pozicka } = this.state;
      const values = { karoseria, palivo, pohon, prevodovka, vykon,
          vek, ec, pocetkm, krstne_meno, priezvisko, email, telefonne_cislo,
          poskodeny_lak, poskodena_karoseria, poskodeny_interier,
          autoIndex,
          opotrebena_naprava, opotrebene_pneu, poskodene_sklo, leasing, kluc, notar, blokacia, zalozne_pravo, dlzka_pozicky, cena, auto, cenaPozicky, vodicskyFile,
          poistenieFile,
          vozidloFiles,obcianskyFile, vysledna_pozicka };

      const summaryValues = [
        {name: 'Osobne Informacie', values: {krstne_meno, priezvisko, email, telefonne_cislo}},
        {name: 'Informacie o Aute', values: {karoseria, palivo, pohon, prevodovka, vykon,
          vek, ec, pocetkm}},
        {name: 'Stav Auta', values: {poskodeny_lak, poskodena_karoseria, poskodeny_interier,
          opotrebena_naprava, opotrebene_pneu, poskodene_sklo}},
        {name: 'Potvrdzujem', values: {leasing, kluc, notar, blokacia, zalozne_pravo}},
        {name: 'Pozicka', values: {dlzka_pozicky, cena, vysledna_pozicka}}
      ]

      return (
          <div>
              <Stepper activeStep={step} alternativeLabel>
                  {steps.map((label) => (
                  <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                  </Step>
                  ))}
              </Stepper>

              <div>
                  <Typography variant='inherit'>{this.getStepContent(step, values, summaryValues)}</Typography>
              </div>
          </div>
      )
  }

}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  function getSteps() {
    return ['Osobné údaje', 'Údaje o vozidle', 'Stav vozidla', 'Podmienky', 'Typ pôžičky', 'Suhrn'];
  }
  
//   function getStepContent(stepIndex, values) {
//     switch (stepIndex) {
//       case 0:
//         return <FormPersonalDetails
//                     nextStep={this.nextStep}
//                     handleChange={this.handleChange}
//                     values={values}/>;
//       case 1:
//         return <h1>TEST2</h1>;
//       case 2:
//         return <h1>TEST3</h1>;
//       case 3:
//         return <h1>TEST4</h1>;
//       case 4:
//         return <h1>TEST5</h1>;
//       default:
//         return 'Unknown stepIndex';
//     }
//   }


export default UserForm;
