import React from 'react';
import {Form, Button} from 'react-bootstrap'

export default function SignUp(props) {
    return (
        <div>
             <Form onSubmit={props.onSignUp}>
                <Form.Group controlId="formBasicUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username"  type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password"  type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
