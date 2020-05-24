import React from 'react'
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import { Button, Form } from 'react-bootstrap';
import Stepper from 'bs-stepper'

function MotoForm() {

    const formik = useFormik({})

    useEffect(() => {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true
          })
    });


    return (
        <div>
            {/* <Form>
                <label htmlFor='firstName'>Meno</label>
                <input type='text' id='firstName' name='firstName'/>

                <label htmlFor='lastName'>Priezvisko</label>
                <input type='text' id='lastName' name='lastName'/>

                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email'/>

                <label htmlFor='tel-number'>Tel. cislo</label>
                <input type='number' id='tel-number' name='tel-number'/>

                <label htmlFor='birthdate'>Datum narodenia</label>
                <input type='date' id='birthdate' name='birthdate'/>

                <label htmlFor='birthnumber'>Rodne cislo</label>
                <input type='text' id='birthnumber' name='birthnumber'/>

                <label htmlFor='op-number'>Cislo OP</label>
                <input type='text' id='op-number' name='op-number'/>

                <Button variant='primary'>Potvrdit</Button>
            </Form> */}
            <div id="stepper1" class="bs-stepper">
          <div class="bs-stepper-header">
            <div class="step" data-target="#test-l-1">
              <button class="step-trigger">
                <span class="bs-stepper-circle">1</span>
                <span class="bs-stepper-label">Email</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#test-l-2">
              <button class="step-trigger">
                <span class="bs-stepper-circle">2</span>
                <span class="bs-stepper-label">Password</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#test-l-3">
              <button class="step-trigger">
                <span class="bs-stepper-circle">3</span>
                <span class="bs-stepper-label">Validate</span>
              </button>
            </div>
          </div>
          <div class="bs-stepper-content">
            <form onSubmit={this.onSubmit}>
              <div id="test-l-1" class="content">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                </div>
                <button class="btn btn-primary" onClick={() => this.stepper.next()}>Next</button>
              </div>
              <div id="test-l-2" class="content">
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button class="btn btn-primary" onClick={() => this.stepper.next()}>Next</button>
              </div>
              <div id="test-l-3" class="content text-center">
                <button type="submit" class="btn btn-primary mt-5">Submit</button>
              </div>
            </form>
          </div>
        </div>>
        </div>
        
    )
}

export default MotoForm
