import React from 'react';
import './App.css';
const axios = require('axios');


function App() {
  return (
    <div className="App">
      <h1>Quinn's Todo List</h1>
      <DisplayProjects />
    </div>
  );
}

const DisplayProjects = () => {
  const initialProjects = [{
    title: ''
  }]
  const [myProject, setMyProject] = React.useState(initialProjects)
  
  
  React.useEffect(() => {
  axios.get('http://localhost:5000/api/projects/all')
    .then(function (response) {
      // console.log(response)
      const newVar = []
      for (let i = 0; i < response.data.length; i++) {
        newVar.push({title: response.data[i].title})
      }
      setMyProject(newVar)
    })
    .catch(function (error) {
      console.error(error)
    })
  }, []);

  const [selectedProject, setSelectedProject] = React.useState()

  const handleProjects = (title) => {
    setSelectedProject(title)
  }

  const deleteProject = (projectTitle) => {
    console.log(projectTitle)
    
    axios.post('http://localhost:5000/api/projects/delete', { title: projectTitle})
    .then(function (response) {
      console.log("response below:")
      console.log(response)
      const newVar = []
      for (let i = 0; i < response.data.length; i++) {
        newVar.push({title: response.data[i].title})
      }
      setMyProject(newVar)
    })
    .catch(function (error) {
      console.error(error)
    })
  }

  const AddProject = () => {
    const initialProjectState = { title: '' }
    const [newProject, setNewProject] = React.useState(initialProjectState)

    const handleSubmit = () => {
      setMyProject([...myProject, newProject])
      setNewProject(initialProjectState)

      axios.post('http://localhost:5000/api/projects/', newProject)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.error(error)
      })
    }

    return (
      <div className="newProject">
        <input type="text" placeholder="New Project" onChange={(event) => setNewProject({ ...newProject, title: event.target.value })} />
        <input type="submit" onClick={() => handleSubmit()} />
      </div>
    )
  }

  return (
    <div>
        <AddProject />
      <div>
        {myProject.map(({ title }, index) => (
          <div className = "displayProjects" key={title} onClick={() => handleProjects(title)}>
            <h2>{title} <button className="delete" onClick={() => deleteProject(title)}>X</button> </h2>
          </div>
        ))}
      </div>
      <DisplayTodos onDisplay={selectedProject} onProjectChoice={myProject} />
    </div>
  )
}

const DisplayTodos = (props) => {
  const storedTodos = JSON.parse(localStorage.getItem('myTodosInLocalStorage') || '[]')
  const initialTodoState = { title: '', description: '', dueDate: '', project: '', complete: false }
  const [myTodo, setMyTodo] = React.useState(storedTodos);

  // axios.get('http://localhost:5000/api/todos/all')
  //   .then(function (response) {
  //     // console.log(response)
  //     const newVar = []
  //     for (let i = 0; i < response.data.length; i++) {
  //       newVar.push({title: response.data[i].title})
  //     }
  //     setMyTodo(newVar)
  //   })
  //   .catch(function (error) {
  //     console.error(error)
  //   })



  React.useEffect(() => {
    localStorage.setItem('myTodosInLocalStorage', JSON.stringify(myTodo));
  }, [myTodo])

  const handleToggle = (title) => {
    let spreadTodos = [...myTodo]
    let currentTodo = {}

    for (let i = 0; i < spreadTodos.length; i++) {
      if (spreadTodos[i].title === title) {
        currentTodo = spreadTodos[i]
        currentTodo.complete = !currentTodo.complete
        spreadTodos[i] = currentTodo
        setMyTodo(spreadTodos)
      }
    }
  }

  const deleteTodo = (title) => {
    const filteredArray = [...myTodo].filter(item => item.title !== title);
    setMyTodo(filteredArray)
  }

  const selectedProject = props.onDisplay
  const filterForProject = () => {
    const filteredTodos = [...myTodo].filter(item => item.project === selectedProject)
    return filteredTodos;
  }

  const AddTodo = () => {
    const initialTodoState = { title: '', description: '', dueDate: '', project: '', complete: false }
    const [newTodo, setNewTodo] = React.useState(initialTodoState);

    const handleSubmit = () => {
      setMyTodo([...myTodo, newTodo])
      setNewTodo(initialTodoState)

      // axios.post('http://localhost:5000/api/todos/', newTodo)
      // .then(function (response) {
      //   console.log(response)
      // })
      // .catch(function (error) {
      //   console.error(error)
      // })
    }

    const projectChoose = props.onProjectChoice

    return (
      <div className="newTodo">
        <label>
          <p>Add New Todo</p>
          <input className="inputTodo" type="text" placeholder="title" onChange={(event) => setNewTodo({ ...newTodo, title: event.target.value })} />
          <br></br>
          <input className="inputTodo" type="text" placeholder="description" onChange={(event) => setNewTodo({ ...newTodo, description: event.target.value })} />
          <br></br>
          <input className="inputTodo" type="date" placeholder="dueDate" onChange={(event) => setNewTodo({ ...newTodo, dueDate: event.target.value })} />
          <br></br>
          <select onChange={(event) => setNewTodo({ ...newTodo, project: event.target.value })}>
            <option>Select Project</option>
            {projectChoose.map(({ title }, index) => (           
                <option key={index}>{title}</option>
            ))}
          </select>
          <br />
          <input type="submit" onClick={() => handleSubmit()} />
        </label>
      </div>
    )
  }

  return (
    <div>
      <AddTodo />
      <div>
        {filterForProject().map(({ title, description, dueDate, complete }, index) => (
          <div className="todos" key={title}>
            <h3>{title}</h3>
            <p>{description} <br /> {dueDate}</p>
            <input type='checkbox' checked={complete} onChange={() => handleToggle(title)} />
            <button className="delete" onClick={() => deleteTodo(title)}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;