import React, {useState,useEffect} from 'react'
import{ListGroup, Button} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../config.js';
import {Link,Redirect} from 'react-router-dom'
import ChatBot from './ChatBot.js';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../App.css";


export default function TodoDetails(props) {

    let [todo,setTodo]=useState()

    
useEffect(()=>{
    let id = props.match.params.id
    axios.get(`${API_URL}/todos/${id}`,{withCredentials: true})
      .then((res)=>{
        setTodo(todo=res.data)
      })
  },[])

  let BtnStyle={
    margin: '10px'
  }

  let WrapperStyle={
    margin: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }

  const promise = loadStripe("pk_test_51HJbtpE4vQDsVVOPjHyCIW6uvTjygcAO4vVY1RC8AszQGwo8Jgw3gWeXvXbHHSor8ZPoucYMb5twLjxKa4Z0e6rB00R1XsNgbV");

  let items=[
    {
      name:'pepo',
      price: 12
    },
    {
      name:'pepote',
      price: 10
    },
    {
      name:'pepota',
      price: 10
    }
  ]

    if(!props.loggedInUser){
      return (<Redirect to="/sign-in"/>)
    }
    return (
        <div>
        { todo ?
        <div> 
            <ChatBot/>
            <Elements stripe={promise}>
                <CheckoutForm items={items}/>
            </Elements>
            <ListGroup>
                <ListGroup.Item>Name: <br/> {todo.name}</ListGroup.Item>
                { todo.image && <ListGroup.Item><img style={{width: '200px', height: '200px'}} src={todo.image}/></ListGroup.Item>}
                <ListGroup.Item>Description : <br/>{todo.description}</ListGroup.Item>
                <ListGroup.Item>Status :{todo.completed? <p>Done</p> : <p>Not Done</p>}</ListGroup.Item>
            </ListGroup>
            <br></br>
            <div style={WrapperStyle}>
            <Link to={`/todo/${todo._id}/edit`}><Button style={BtnStyle}>Edit</Button></Link>
            <Button style={BtnStyle} onClick={()=>props.onDelete(todo._id)}>Delete</Button>
            </div>
        </div> :
        <h1>Loading...</h1>
        }
        </div>
        
    )
}