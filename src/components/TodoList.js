import React from 'react';
import{ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function TodoList (props) {
    return (
        <div>
        {
            props.todos.map((todo, i)=>{
                return (
            <div> 
                <ListGroup>
                    <ListGroup.Item><Link key={`todo${i}`} to={`/todo/${todo._id}`} >{todo.name}</Link></ListGroup.Item>
                </ListGroup>
            </div> 
                )
            })
        }
        </div>
    )
}
