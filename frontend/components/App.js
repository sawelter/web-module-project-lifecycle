import React from 'react'
import axios from 'axios'
import Form from './Form.js'
import TodoList from './TodoList.js'

const URL = 'http://localhost:9000/api/todos'

const getTasks = () => {
  return axios.get(URL)
    .then(res => res)
    .catch(err => console.error(err))
}

export default class App extends React.Component {

  /////// CONSTRUCTOR /////////
  constructor() {
    // console.log("constructor")
    super();
    this.state = {
      tasks: [],
    }
  }

  /////// TOGGLE COMPLETE /////////
  toggleComplete = (taskId) => {
    // console.log("toggleComplete called")
    // change "completed" in state (user-side)
    this.setState({
      ...this.state,
      tasks: this.state.tasks.map((task) => {
        if(taskId === task.id) {
          return {...task, completed: !task.completed}
        }
        return task;
      })
    })
    // patch "completed" in API (server-side)
    axios.patch(`${URL}/${id}`)
      .then({
      })
      .catch(err => console.log(err));
  }

  /////// ADD TASK /////////
  // When a new task is typed in and then "Add Task" is clicked, the new task is first added to state (user side) and then it is posted to the api (server side)
  addTask = (e, task) => {
    // console.log("addTask called");
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      name: task,
      completed: false
    }

    // Adds task user-side.
    this.setState({
      ...this.state,
      tasks: [...this.state.tasks, newTask]
    })

  // Adds task server-side.
    axios.post(URL, newTask)
    .then(function (response) {
      console.log(response);
    })
    .catch(err => console.error(err));
  }


  /////// CLEAR COMPLETED /////////
  // When the "Clear" button is clicked, the tasks that are completed (completed === true) are toggled off so they are no longer shown.
  clearCompleted = () => {
    // console.log("clearCompleted called");
    this.setState({
      ...this.state,
      tasks: this.state.tasks.filter((task) => {
        return task.completed === false;
      })
    })
  }

/////// COMPONENT DID MOUNT /////////
  // Runs once after the initial mounting of the todo list; reads tasks from the task list API and puts those tasks in the state.
  componentDidMount() {
    // console.log("componentDidMount");
    getTasks()
      .then(res => {
        this.setState({...this.state, tasks: res.data.data})
      })
      .catch(err => console.error(err));
  }

  /////// RENDER /////////
  // renders the grocery list, an input to enter a new task, and a button to clear completed tasks.
  render() {
    // console.log("render");
    return (
      <div>
        <TodoList 
          tasks={this.state.tasks} 
          toggleComplete={this.toggleComplete}
        />

        <Form addTask={this.addTask}/>

        <button id="clear-button" onClick={this.clearCompleted}>Clear Completed</button>
      </div>
    )
  }
}
