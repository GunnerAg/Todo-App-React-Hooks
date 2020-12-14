import React, {useState,useEffect} from 'react'
import {Form, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import {API_URL} from '../config.js';


export default function EditForm(props) {

    let [todo,setTodo]=useState({})

    
    useEffect(()=>{
        let id = props.match.params.id
        axios.get(`${API_URL}/todos/${id}`, {withCredentials: true})
          .then((res)=>{
            setTodo(todo=res.data)
          })
      },[])

    let BtnStyle={
        margin: '10px'
      }

    let handleNameChange = (e) =>{
        let updatedTodo = JSON.parse(JSON.stringify(todo))
        updatedTodo.name = e.currentTarget.value
        setTodo (todo = updatedTodo)
    }

    let handleDescriptionChange = (e) =>{
        let updatedTodo = JSON.parse(JSON.stringify(todo))
        updatedTodo.description = e.currentTarget.value
        setTodo (todo = updatedTodo)
    }
    
    let handleCompleted = ()=>{
        let updatedTodo = JSON.parse(JSON.stringify(todo))
        updatedTodo.completed = true
        setTodo (todo=updatedTodo)
    }

    console.log(props)
    if(!props.loggedInUser){
        return <Redirect to="/sign-in"/>
    }
    return (
        <div>
            <Form onSubmit={()=>props.onEdit(todo)}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Todo Name</Form.Label>
                    <Form.Control name='name' type="text" onChange={handleNameChange} value={todo.name} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='description' type="text" onChange={handleDescriptionChange} value={todo.description} />
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                <Button onClick={handleCompleted} >Completed</Button>
                </Form.Group>
                

                <Button style={BtnStyle} variant="primary" type="submit">
                Edit
                </Button>
            </Form>
        </div>
    )
}
