import React from 'react';
import {Form, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom';




export default function AddForm(props) {
  
    
    if(!props.loggedInUser){
        return <Redirect to="/sign-in"/>
    }
        return (  
            <div>
                <Form onSubmit={props.onSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Todo Name</Form.Label>
                        <Form.Control name='name' type="text" placeholder="Enter Name" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name='description' type="text" placeholder="Enter a description" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicImage" className="form-group" >
                        <Form.Label htmlFor="image" >Picture</Form.Label>
                        <Form.Control name='image' type="file" id="image" className="form-control" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Add
                    </Button>
                </Form>
            </div>
    )
}
