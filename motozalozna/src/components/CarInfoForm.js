import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
function CarInfoForm() {
    return (
        <Container>
           <Form onSubmit={console.log}>
                <Form.Group controlId="karoseria">
                    <Form.Label>Typ karoserie</Form.Label>
                    <Form.Control as="select" custom>
                        <option>Hatchback / sedan</option>
                        <option>Kombi</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="palivo">
                    <Form.Label>Palivo</Form.Label>
                    <Form.Control as="select" custom>
                        <option>Benzin</option>
                        <option>Nafta</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="pohon">
                    <Form.Label>Typ pohonu</Form.Label>
                    <Form.Control as="select" custom>
                        <option>Jednej napravy</option>
                        <option>4x4</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="prevodovka">
                    <Form.Label>Prevodovka</Form.Label>
                    <Form.Control as="select" custom>
                        <option>Manualna</option>
                        <option>Automaticka</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="vykon">
                    <Form.Label>Vykon v kw</Form.Label>
                    <Form.Control 
                        type='number'
                        name='vykon'
                      />
                </Form.Group>
                
                <Form.Group controlId="vek">
                    <Form.Label>Vek vozidla v rokoch</Form.Label>
                    <Form.Control 
                        type='number'
                        name='vek'
                      />
                </Form.Group>

                <Form.Group controlId="pocetkm">
                    <Form.Label>Pocet najazdenych km</Form.Label>
                    <Form.Control 
                        type='number'
                        name='km'
                      />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form> 
        </Container>
    )
}

export default CarInfoForm
