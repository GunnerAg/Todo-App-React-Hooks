import React from 'react';
import {Nav, Navbar, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'


export default function NavB(props) {
    return (
        <div>  
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Todo List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    {/* there is a reason why this component wont get the props if not sent with the link element from react-router dom */}
                        {/* <Nav.Link href="/create-todo">Add Todo</Nav.Link> */}
                        <Navbar.Brand><Link to={`/create-todo`} >Add Todo</Link></Navbar.Brand>

                        {props.loggedInUser?
                        (<Button onClick={props.onLogOut}>Log Out</Button>):
                        (<><Nav.Link href="/sign-in">Sign In</Nav.Link>
                        <Nav.Link href="/sign-up">Register!</Nav.Link></>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}