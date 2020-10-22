import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <DisplayProjects />
    </div>
  );
}

const DisplayProjects = () => {
  const storedProjects = JSON.parse(localStorage.getItem('myProjectsInLocalStorage') || '[]')
  const [myProject, setMyProject] = React.useState(storedProjects)
  React.useEffect(() => {
    localStorage.setItem('myProjectsInLocalStorage', JSON.stringify(myProject));
  }, [myProject])

  const [selectedProject, setSelectedProject] = React.useState()

  const handleProjects = (title) => {
    setSelectedProject(title)
  }

  const deleteProject = (title) => {
    const filteredArray = [...myProject].filter(item => item.title !== title)
    setMyProject(filteredArray)
  }

  const AddProject = () => {
    const initialProjectState = { title: '' }
    const [newProject, setNewProject] = React.useState(initialProjectState)

    const handleSubmit = () => {
      console.log(newProject)
      setMyProject([...myProject, newProject])
      setNewProject(initialProjectState)
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
      <div className="addProject">
        <AddProject />
      </div>
      <div className="projects">
        {myProject.map(({ title }, index) => (
          <div key={title} onClick={() => handleProjects(title)}>
            <h2>{title} <button onClick={() => deleteProject(title)}>X</button> </h2>
          </div>
        ))}
        <DisplayTodos onDisplay={selectedProject}/>
      </div>
    </div>
  )
}

//for deleting todos when project is deleted, 
//pass the deleted project down to DIsplayTodos and use that to delete todos from array

const DisplayTodos = (props) => {
  const storedTodos = JSON.parse(localStorage.getItem('myTodosInLocalStorage') || '[]')
  const [myTodo, setMyTodo] = React.useState(storedTodos);
  React.useEffect(() => {
    localStorage.setItem('myTodosInLocalStorage', JSON.stringify(myTodo));
  }, [myTodo])

  const handleToggle = (title) => {
    console.log("handleToggle")
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
    console.log("deleteTodo: " + title)
    const filteredArray = [...myTodo].filter(item => item.title !== title);
    console.log(filteredArray)
    setMyTodo(filteredArray)
  }

  const selectedProject = props.onDisplay
  const filterForProject = () => {
    const filteredTodos = [...myTodo].filter(item => item.project === selectedProject)
    return filteredTodos;
  }

  const AddTodo = () => {
    const initialTodoState = { title: '', description: '', dueDate: '', priority: '', project: '', complete: false }
    const [newTodo, setNewTodo] = React.useState(initialTodoState);

    const handleSubmit = () => {
      setMyTodo([...myTodo, newTodo])
      setNewTodo(initialTodoState)
    }

    return (
      <div className="newTodo">
        <label>
          <input className="inputTodo" type="text" placeholder="title" onChange={(event) => setNewTodo({ ...newTodo, title: event.target.value })} />
          <br></br>
          <input className="inputTodo" type="text" placeholder="description" onChange={(event) => setNewTodo({ ...newTodo, description: event.target.value })} />
          <br></br>
          <input className="inputTodo" type="date" placeholder="dueDate" onChange={(event) => setNewTodo({ ...newTodo, dueDate: event.target.value })} />
          <br></br>
          <input className="inputTodo" type="text" placeholder="project" onChange={(event) => setNewTodo({ ...newTodo, project: event.target.value })} />
          <br></br>
          <select placeholder="priority" onChange={(event) => setNewTodo({ ...newTodo, priority: event.target.value })}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select> &nbsp;
          <input type="submit" onClick={() => handleSubmit()} />
        </label>
      </div>
    )
  }

  return (
    <div>
      <AddTodo />
      <div className="todos">
        {filterForProject().map(({ title, description, dueDate, priority, project, complete }, index) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{description} {dueDate}</p>
            <input type='checkbox' checked={complete} onChange={() => handleToggle(title)} />
            <button className="delete" onClick={() => deleteTodo(title)}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;