import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Quinn's Todo List</h1>
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
  const [myTodo, setMyTodo] = React.useState(storedTodos);
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