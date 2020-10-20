import React from 'react';
import './App.css';


function App() {
  const initialTodos = [
    {
      title: "Groceries",
      description: "chips, eggs, bread, cucumbers",
      dueDate: "2020/22/10",
      priority: 3,
      project: "Errands",
      complete: false
    },
    {
      title: "Carwash",
      description: "get the damn car washed!",
      dueDate: "2020/30/10",
      priority: 1,
      project: "Errands",
      complete: false
    },
    {
      title: "Take cats to the vet",
      description: "make a vet appointment",
      dueDate: "2020/30/12",
      priority: 2,
      project: "Errands",
      complete: false
    },
    {
      title: "Weather App",
      description: "make a weather app for TOP",
      dueDate: "2020/30/11",
      priority: 1,
      project: "Coding Projects",
      complete: false
    }
  ]

  const initialProjects = [
    { title: "Errands" },
    { title: "Coding Projects" }
  ]

  const [myTodo, setMyTodo] = React.useState(initialTodos);
  const [myProjects, setMyProjects] = React.useState(initialProjects)


  function addTodo(newTodo) {
    //console.log(newTodo)
    setMyTodo([newTodo, ...myTodo])
  }

  function toggleTodoComplete(index, title) {
    console.log(index, title)

    const currentTodo = myTodo[index];

    currentTodo.complete = !currentTodo.complete

    const newTodo = [...myTodo]

    newTodo[index] = currentTodo
    setMyTodo(newTodo)

  }

  return (
    <div className="App">
      <AddTodoToList onAddTodo={addTodo} />
      <DisplayProjects onProjects={myProjects} onClickProject={myTodo} onToggle={toggleTodoComplete}/>
    </div>
  );
}


const AddTodoToList = (props) => {
  const initialTodoState = {title: '', description: '', dueDate: '', priority: '', project: '', complete: false}

  const [newTodo, setNewTodo] = React.useState(initialTodoState)
  
  const handleSubmit = () => {
    console.table(newTodo)
    props.onAddTodo(newTodo)
    setNewTodo(initialTodoState)
  }

  return (
    <div className="newTodo">
      <label>
        New Todo <br></br>
          <input type="text" placeholder="title" value={newTodo.title} onChange={(event) => setNewTodo({...newTodo, title: event.target.value})} />
          <br></br>
          <input type="text" placeholder="description" value={newTodo.description} onChange={(event) => setNewTodo({...newTodo, description: event.target.value})} />
          <br></br>
          <input type="text" placeholder="dueDate"  value={newTodo.dueDate} onChange={(event) => setNewTodo({...newTodo, dueDate: event.target.value})} />
          <br></br>
          <input type="text" placeholder="project"  value={newTodo.project} onChange={(event) => setNewTodo({...newTodo, project: event.target.value})} />
          <br></br>
          <select placeholder="priority"  value={newTodo.priority} onChange={(event) => setNewTodo({...newTodo, priority: event.target.value})} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select> &nbsp;
          <input type="submit" onClick={() => handleSubmit()}/>
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

  //maps the values in myProjects (as props.onProjects) to be displayed
  //if a project name is clicked, activates the handleProjects function passing the project title (as title)
  return (
    <div>
      {props.onProjects.map(({ title }, index) => (
        <div key={title} onClick={() => handleProjects(title)}>
          <h2>{title}</h2>
        </div>
      ))}
      {/* gives the values in projectTodos (those selected from the for loop above) to the DisplayTodos function */}
      <DisplayTodos onDisplay={projectTodos} onToggle={props.onToggle}/>
    </div>
  )
}

//takes the todos as props and maps them into a Todo Card
const DisplayTodos = (props) => {
  //console.log(props)

  const handleToggle = (index, title) => {
    props.onToggle(index, title)
  }
  
  return (
    <div>
      {props.onDisplay.map(({ title, description, dueDate, priority, project, complete }, index) => (
        <div key={title}>
          <h3>{title}</h3>
          <p>{description} {dueDate} {priority} {project}</p>
          <input type='checkbox' checked={complete} onChange={() => handleToggle(index, title)}/>
        </div>
      ))}
    </div>
  )
}

export default App;
