import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


const PersonalInfoForm = () => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const schema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    tel_number: Yup.string().matches(phoneRegExp, 'Format telefonneho cisla nie je spravny').required(),
    birthDate: Yup.date().required(),
    birthNumber: Yup.string().required(),
    id_number: Yup.string().required()
  });

    return (
      <Container>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            tel_number: '',
            birthDate: '',
            birthNumber: '',
            id_number: ''
          }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId='validationFormikfirstName'>
                    <Form.Label>Meno</Form.Label>
                      <Form.Control 
                        type='text'
                        name='firstName'
                        placeholder='Meno'
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.firstName && !errors.firstName}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId='validationFormiklastName'>
                    <Form.Label>Priezvisko</Form.Label>
                      <Form.Control 
                        type='text'
                        name='lastName'
                        placeholder='Priezvisko'
                        value={values.lastName}
                        onChange={handleChange}
                        isValid={touched.lastName && !errors.lastName}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId='validationFormikEmail'>
                    <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md='4' controlId='validationFormikTelNumber'>
                      <Form.Label>Tel. cislo</Form.Label>
                      <Form.Control 
                        type='text'
                        name='tel_number'
                        value={values.tel_number}
                        onChange={handleChange}
                        isValid={touched.tel_number && !errors.tel_number}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md='4' controlId='validationFormikBirthDate'>
                      <Form.Label>Datum narodenia</Form.Label>
                      <Form.Control 
                        type='date'
                        name='birthDate'
                        value={values.birthDate}
                        onChange={handleChange}
                        isValid={touched.birthDate && !errors.birthDate}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md='4' controlId='validationFormikBirthNumber'>
                      <Form.Label>Rodne cislo</Form.Label>
                      <Form.Control 
                        type='text'
                        name='birthNumber'
                        value={values.birthNumber}
                        onChange={handleChange}
                        isValid={touched.birthNumber && !errors.birthNumber}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md='12' controlId='validationFormikIdNumber'>
                      <Form.Label>Cislo OP</Form.Label>
                      <Form.Control 
                        type='text'
                        name='id_number'
                        value={values.id_number}
                        onChange={handleChange}
                        isValid={touched.id_number && !errors.id_number}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Button variant="primary" type="submit">Submit</Button>
              </Form>
            )}
        </Formik>
      </Container>
    )
}

export default PersonalInfoForm
