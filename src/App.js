import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Route, Switch, withRouter} from 'react-router-dom';
import {API_URL} from './config.js';
import 'bootstrap/dist/css/bootstrap.css';
import NavB from './components/NavB';
import TodoList from './components/TodoList.js';
import AddForm from './components/AddForm';
import TodoDetails from './components/TodoDetails.js';
import EditForm from './components/EditForm';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';



function App(props) {

  let [todos,setTodos]=useState([])
  let [loggedInUser,setUser]=useState( null)

  useEffect(()=>{
    axios.get(`${API_URL}/todos`)
      .then((res)=>{
        setTodos(todos=res.data)
      })
      if(!loggedInUser){
      axios.get(`${API_URL}/user`,{withCredentials: true})
      .then((res)=>{
        setUser(loggedInUser=res.data)
      })}
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault()
    const {name,description,image} = e.currentTarget
    let uploadData = new FormData()
    uploadData.append('imageUrl', image.files[0])

    const handleCreate =(response)=>{
      axios.post(`${API_URL}/create`, {
        name: name.value,
        description: description.value,
        completed: false,
        image: response.data.image
      },{withCredentials: true})
        .then((res)=>{
          let newTodo = res.data
          let todosClone= JSON.parse(JSON.stringify(todos))
          todosClone.unshift(newTodo)
          setTodos (todos=todosClone)
          props.history.push("/")
        }) 
    }

    if(image.files[0] !== undefined){  
    axios.post(`${API_URL}/upload`, uploadData)
      .then((response)=>{
       handleCreate(response)
      })
    }
    else{
      axios.post(`${API_URL}/create`, {
        name: name.value,
        description: description.value,
        completed: false,
      },{withCredentials: true})
        .then((res)=>{
          let newTodo = res.data
          let todosClone= JSON.parse(JSON.stringify(todos))
          todosClone.unshift(newTodo)
          setTodos (todos=todosClone)
          props.history.push("/")
        }) 
    }
  }

  const handleDelete =(id)=>{
    axios.delete(`${API_URL}/todos/${id}`, {withCredentials: true})
    .then(()=>{
      let filterTodos = todos.filter((todo)=>{
        return todo._id !== id
      })
      setTodos(todos=filterTodos)
    })
    props.history.push("/")
  }

  const handleEdit=(updatedTodo)=>{
    axios.patch(`${API_URL}/todos/${updatedTodo._id}`,{
      name: updatedTodo.name,
      description: updatedTodo.description,
      completed: updatedTodo.completed
    },{withCredentials:true})
    .then(()=>{
      let clonedTodos = todos.map((todo)=>{
        if(todo._id === updatedTodo._id){
          todo = updatedTodo
        }
        return todo
      })
      setTodos(todos=clonedTodos)
    })
    props.history.push("/")
  }

  const handleLogOut =(e) =>{
    axios.post(`${API_URL}/logout`,{}, {withCredentials: true})
    .then(()=>{
      setUser (loggedInUser=null)
      props.history.push("/")
    })
  }

  const handleSignIn =(e) =>{
    e.preventDefault();
    const{email,password}=e.currentTarget;
    axios.post(`${API_URL}/signin`,{
      email: email.value,
      password: password.value}, {withCredentials: true})
    .then((res)=>{
      console.log(res)
      setUser(loggedInUser=res.data)
      props.history.push("/")
    })
  }

  const handleSignUp =(e) =>{
    e.preventDefault();
    const{username,email,password}=e.currentTarget;
    axios.post(`${API_URL}/signup`,{
      username: username.value,
      email: email.value,
      password: password.value}, {withCredentials: true})
    .then((res)=>{
      console.log(res)
      setUser(loggedInUser=res.data)
      props.history.push("/")
    })
  }

  return (
    <div>
      <NavB loggedInUser={loggedInUser} onLogOut={handleLogOut}/>
      <Switch>
        <Route exact path="/" render={()=>{ 
          return <TodoList todos={todos}/>
        }}/>
        <Route path="/create-todo" render={(routeProps)=>{
          return <AddForm loggedInUser={loggedInUser} onSubmit={handleSubmit} {...routeProps} />
        }}/>
        <Route exact path="/todo/:id" render={(routeProps)=>{
          return <TodoDetails loggedInUser={loggedInUser} todos={todos} onDelete={handleDelete} {...routeProps}/>
        }}/>
         <Route path="/todo/:id/edit" render={(routeProps)=>{
          return <EditForm loggedInUser={loggedInUser} onEdit={handleEdit} {...routeProps}/>
        }}/>
          <Route path="/sign-in" render={(routeProps)=>{
          return <SignIn onSignIn={handleSignIn} {...routeProps}/>
        }}/>
          <Route path="/sign-up" render={(routeProps)=>{
          return <SignUp onSignUp={handleSignUp} {...routeProps}/>
        }}/>
    
      </Switch>
    </div>
  )
}

export default withRouter(App)