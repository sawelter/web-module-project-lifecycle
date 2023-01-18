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

  constructor() {
    // console.log("constructor")
    super();
    this.state = {
      tasks: [],
    }
  }

  toggleComplete = (taskId) => {
    // console.log("toggleComplete called")
    this.setState({
      ...this.state,
      tasks: this.state.tasks.map((task) => {
        if(taskId === task.id) {
          return {...task, completed: !task.completed}
        }
        return task;
      })
    })
  }

  componentDidMount() {
    // console.log("componentDidMount");
    getTasks()
      .then(res => {
        this.setState({...this.state, tasks: res.data.data})
      })
      .catch(err => console.error(err));
    
    console.log(this.state.tasks);
  }

  addTask = (e, task) => {
    // console.log("addTask called");
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      name: task,
      completed: false
    }
    this.setState({
      ...this.state,
      tasks: [...this.state.tasks, newTask]
    })
    
  // adds task to the server API as well.
    axios.post(URL, newTask)
    .then(function (response) {
      console.log(response);
    })
    .catch(err => console.error(err));
  }

  clearCompleted = () => {
    // console.log("clearCompleted called");
    this.setState({
      ...this.state,
      tasks: this.state.tasks.filter((task) => {
        return task.completed === false;
      })
    })
  }


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
