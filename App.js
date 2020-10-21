import React from 'react';
import './App.css';


function App() {
  const storedTodos = JSON.parse(localStorage.getItem('myTodosInLocalStorage') || '[]')
  const storedProjects = JSON.parse(localStorage.getItem('myProjectsInLocalStorage') || '[]')

  const [myTodo, setMyTodo] = React.useState(storedTodos);
  const [myProjects, setMyProjects] = React.useState(storedProjects)

  React.useEffect(() => {
    localStorage.setItem('myTodosInLocalStorage', JSON.stringify(myTodo));
  }, [myTodo])

  React.useEffect(() => {
    localStorage.setItem('myProjectsInLocalStorage', JSON.stringify(myProjects));
  }, [myProjects])


  function addTodo(newTodo) {
    setMyTodo([newTodo, ...myTodo])
  }

  function toggleTodoComplete(title) {
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

  function deleteTodo(title, project) {
    let spreadTodos = [...myTodo]
    console.log(title, project)
    const filteredArray = spreadTodos.filter(item => item.title !== title);
    setMyTodo(filteredArray)
  }

  function deleteProject(title) {
    let spreadProjects = [...myProjects]
    let spreadTodos = [...myTodo]

    const filteredArray = spreadProjects.filter(item => item.title !== title);
    setMyProjects(filteredArray)

    const filteredTodos = spreadTodos.filter(killTodo => killTodo.project !== title);
    console.log(filteredTodos)
    setMyTodo(filteredTodos)
  }

  function addProject(newProject) {
    console.log(newProject)
    setMyProjects([newProject, ...myProjects])
  }

  return (
    <div className="App">
      <AddProject onAddProject={addProject} />
      <AddTodoToList onAddTodo={addTodo} />
      <DisplayProjects onProjects={myProjects} onClickProject={myTodo} onToggle={toggleTodoComplete} onDelete={deleteTodo} onProjectDelete={deleteProject}/>
    </div>
  );
}

const AddProject = (props) => {
  const initialProjectState = { title: '' }

  const [newProject, setNewProject] = React.useState(initialProjectState)

  const handleSubmit = () => {
    console.log(newProject)
    props.onAddProject(newProject)
    setNewProject(initialProjectState)
  }

  return (
    <div>
      <label>
        <input type="text" placeholder="new project name" value={newProject.project} onChange={(event) => setNewProject({ ...newProject, title: event.target.value })} />
        <input type="submit" onClick={() => handleSubmit()} />
      </label>
    </div>
  )
}


const AddTodoToList = (props) => {
  const initialTodoState = { title: '', description: '', dueDate: '', priority: '', project: '', complete: false }

  const [newTodo, setNewTodo] = React.useState(initialTodoState)

  const handleSubmit = () => {
    props.onAddTodo(newTodo)
    setNewTodo(initialTodoState)
  }


  return (
    <div className="newTodo">
      <label>
        New Todo <br></br>
        <input type="text" placeholder="title" value={newTodo.title} onChange={(event) => setNewTodo({ ...newTodo, title: event.target.value })} />
        <br></br>
        <input type="text" placeholder="description" value={newTodo.description} onChange={(event) => setNewTodo({ ...newTodo, description: event.target.value })} />
        <br></br>
        <input type="date" placeholder="dueDate" value={newTodo.dueDate} onChange={(event) => setNewTodo({ ...newTodo, dueDate: event.target.value })} />
        <br></br>
        <input type="text" placeholder="project" value={newTodo.project} onChange={(event) => setNewTodo({ ...newTodo, project: event.target.value })} />
        <br></br>
        <select placeholder="priority" value={newTodo.priority} onChange={(event) => setNewTodo({ ...newTodo, priority: event.target.value })} >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select> &nbsp;
          <input type="submit" onClick={() => handleSubmit()} />
      </label>
    </div>
  )
}


//line 51 passes [myProjects] and [myTodo] as props to the DisplayProjects component
const DisplayProjects = (props) => {
  
  const [projectTodos, setProjectTodos] = React.useState([]);

  

  const handleProjects = (title) => {
    setProjectTodos([]);

    //maps the objects in myTodo (as props.onClickProject) to return array of projects for each todo
    const mapTodoProject = props.onClickProject.map(mapTodoToProject => (mapTodoToProject.project))

    const todoHolder = []

    //iterates through the myTodo array (as props.onClickProject), and if the project title matches the todo title,
    //it pushes that todo into the todoHolder array.
    for (let i = 0; i <= props.onClickProject.length; i++) {
      if (mapTodoProject[i] === title) {
        todoHolder.push(props.onClickProject[i]);
      }
    }
    setProjectTodos(todoHolder)
  }

  const handleDelete = (title) => {
    props.onProjectDelete(title)
  }

  //maps the values in myProjects (as props.onProjects) to be displayed
  //if a project name is clicked, activates the handleProjects function passing the project title (as title)
  return (
    <div>
      {props.onProjects.map(({ title }, index) => (
        <div key={title} onClick={() => handleProjects(title)}>
          <h2>{title}</h2>
          <button onClick={() => handleDelete(title)}>X</button>
        </div>
      ))}
      {/* gives the values in projectTodos (those selected from the for loop above) to the DisplayTodos function */}
      <DisplayTodos onDisplay={projectTodos} onToggle={props.onToggle} onDelete={props.onDelete} />
    </div>
  )
}

//takes the todos as props and maps them into a Todo Card
const DisplayTodos = (props) => {
  //console.log(props)

  const handleToggle = (title) => {
    props.onToggle(title)
  }

  const deleteTodo = (title, project) => {
    props.onDelete(title, project)
  }

  return (
    <div>
      {props.onDisplay.map(({ title, description, dueDate, priority, project, complete }, index) => (
        <div key={title}>
          <h3>{title}</h3>
          <p>{description} {dueDate}</p>
          <input type='checkbox' checked={complete} onChange={() => handleToggle(title)} />
          <button className="delete" onClick={() => deleteTodo(title, project)}>X</button>
        </div>
      ))}
    </div>
  )
}

export default App;
