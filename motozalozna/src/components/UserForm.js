import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Button } from '@material-ui/core/';
import FormPersonalDetails from './FormPersonalDetails';
import FormCarInfoDetails from './FormCarInfoDetails';
import FormPersonalTerms from './FormPersonalTerms';
import FormLoanDetails from './FormLoanDetails';
import Summary from './Summary';
import { Row } from 'react-bootstrap'

import '../css/uniform.css'
import ThankYou from './ThankYou';

export class UserForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      step: 0,

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
      zalozne_pravo: false,

      dlzka_pozicky: 0,
      urok: 0,
      cena: 0,
      auto: null,
      autoIndex: null,
      autoName: '',
      cenaPozicky: 0,
      vysledna_pozicka: 0,

      obcianskyFile: null,
      technickyFile: null,
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
      this.setState({ [input]: e.target.value || e.target.checked });
    }

    handlePushLast = (value) => {
      if(Object.entries(value).length > 0) {
        Object.entries(value).map(e => {
          if(e[1].name) {
            this.setState(prevState => ({
              vozidloFiles: [...prevState.vozidloFiles, e[1]]
            }))
          }
        })
      }
     
      this.setState(prevState => ({
        vozidloFiles: [...prevState.vozidloFiles, value]
      }))
    }

    handleState = async (name, data) => {
      await this.setState({
        [name]: data
      }, function() {
      })
    }

    showFiles = (type, typeName) => {
      if( type && Object.keys(type).length > 0 )
        return (
          <div>
            {
              Object.entries(type).map((e, inx) => {
                return (
                  <div>
                    { e[1].name ? 
                      <div className="fileShow">
                        <Row>
                          <div className="col-sm-9 col-md-9">
                            <Typography>{e[1].name}</Typography>
                          </div>
                          <div className="col-sm-3 col-md-3">
                            <Button style={{'display': 'inline-block', 'verticalAlign': 'middle', 'height': '100%'}} onClick={this.handleDelete.bind(this, e[1], typeName)}>Delete</Button>
                          </div>
                        </Row>
                      </div>: <div> </div>
                    }
                  </div>
                )
              })
            }
          </div>
        )
      else
        return(
            <div>
              {
                type ? <div> 
                { type.name ? 
                  <div className="fileShow">
                    <Row>
                      <div className="col-sm-9 col-md-9">
                        <Typography style={{'marginTop': "5px"}}>{type.name}</Typography>
                      </div>
                      <div className="col-sm-3 col-md-3">
                        <Button style={{'display': 'inline-block', 'verticalAlign': 'middle', 'height': '100%'}} onClick={this.handleDelete.bind(this, type, typeName)}>Delete</Button> 
                      </div>
                    </Row>
                  </div> : <div> </div>
                }
                  </div> : <div> </div> 
              }
            </div>
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
      case 'technickyFile':
        this.setState({technickyFile: null})
        break;
    }
  }

  getStepContent = (stepIndex, values, summaryValues) => {
    switch (stepIndex) {
      case 0:
        return <FormCarInfoDetails
                    handlePushLast = {this.handlePushLast}
                    handleFiles = {this.showFiles}
                    handleState = {this.handleState}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}/>;
      case 1:
        return <FormPersonalDetails
                    handleFiles = {this.showFiles}
                    handleState = {this.handleState}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}/>;
      case 2:
        return <Summary
                    prevStep={this.prevStep}
                    summaryValues={summaryValues}
                    nextStep={this.nextStep}
                    values={values}/>;
      case 3:
        return <ThankYou />;
      // case 4:
      //   return <FormLoanDetails
      //               handleState = {this.handleState}
      //               nextStep={this.nextStep}
      //               prevStep={this.prevStep}
      //               handleChange={this.handleChange}
      //               values={values}/>;
      // case 5:
      //   return <Summary
      //               prevStep={this.prevStep}
      //               summaryValues={summaryValues}
      //               values={values}/>;
      default:
        return 'Unknown stepIndex';
    }
  }

  render() {
      const steps = getSteps();
      const { step } = this.state;
      const { karoseria, palivo, pohon, prevodovka, vykon,
              vek, ec, pocetkm, krstne_meno, priezvisko, email, telefonne_cislo,
              poskodeny_lak, poskodena_karoseria, poskodeny_interier,
              opotrebena_naprava, opotrebene_pneu, poskodene_sklo, leasing, kluc, notar, blokacia, zalozne_pravo, dlzka_pozicky, cena, auto, cenaPozicky, obcianskyFile,
              technickyFile,
              poistenieFile,
              autoIndex,
              vozidloFiles, vysledna_pozicka, urok } = this.state;
      const values = { karoseria, palivo, pohon, prevodovka, vykon,
          vek, ec, pocetkm, krstne_meno, priezvisko, email, telefonne_cislo,
          poskodeny_lak, poskodena_karoseria, poskodeny_interier,
          autoIndex,
          opotrebena_naprava, opotrebene_pneu, poskodene_sklo, leasing, kluc, notar, blokacia, zalozne_pravo, dlzka_pozicky, cena, auto, cenaPozicky, technickyFile,
          poistenieFile,
          vozidloFiles, obcianskyFile, vysledna_pozicka, urok };

      const summaryValues = [
        {name: 'Osobné Informacie', values: {krstne_meno, priezvisko, email, telefonne_cislo}},
        {name: 'Informácie o Aute', values: {karoseria, palivo, pohon, prevodovka, vykon,
          vek, ec, pocetkm}},
        {name: 'Stav Auta', values: {poskodeny_lak, poskodena_karoseria, poskodeny_interier,
          opotrebena_naprava, opotrebene_pneu, poskodene_sklo}},
        {name: 'Potvrdzujem', values: {leasing, kluc, notar, blokacia, zalozne_pravo}},
        {name: 'Pôžička', values: {dlzka_pozicky, cena, vysledna_pozicka}}
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
    return ['Údaje o vozidle', 'Osobné údaje', 'Suhrn'];
  }

export default UserForm;
