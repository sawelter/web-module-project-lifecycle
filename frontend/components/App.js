import React from 'react'
import axios from 'axios'

import TodoList from './TodoList'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

  // eventually - make it so that it doesn't fetch the ENTIRE API again. For now just GET the entire API
// Step 4: Hide/show complete

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      textInput: "",
      displayCompleted: true,
    }
  }

  // fetches all tasks from an API and then sets the state.tasks as the data
  fetchAllTasks = () => {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state,
          tasks: res.data.data
        })
      })
      .catch(err => console.error(err))
  }

  // Toggles a single task's "completed" attribute as true or false
  toggleComplete = (e, taskId) => {
    axios.patch(`${URL}/${taskId}`)
      .then()
      .catch(err => console.error(err));
    this.fetchAllTasks();
  }

  // handles the changes of the input box
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      ...this.state,
      textInput: value
    })
  }

  // adds a task from the input box to the API and the page
  addTask = (event) => {
    event.preventDefault();
    axios.post(URL, {name: this.state.textInput})
      .then(res => console.log(res))
      .catch(err => console.error(err));
    this.fetchAllTasks();
    this.setState({textInput: ""})
  }

  // hides or shows the completed tasks on the list
  toggleCompletedTasks = () => {
    this.setState({displayCompleted: !this.state.displayCompleted})
    if(this.state.displayCompleted) {
      this.setState(
        {
          ...this.state,
          displayCompleted: !this.state.displayCompleted,
          tasks: this.state.tasks.filter(task => {
            return !task.completed;
          })
        }
      )
    }
    else {
      this.fetchAllTasks();
    }
  }


  componentDidMount() {
    this.fetchAllTasks();
  }


  render() {
    return(
      <div>
        <TodoList 
          tasks={this.state.tasks}
          displayCompleted={this.state.displayCompleted}
        />

        <Form 
          addTask={this.addTask}
          handleChange={this.handleChange}
          textInput={this.state.textInput}
        />

        <button onClick={this.toggleCompletedTasks}>
          {this.state.displayCompleted ? "Hide" : "Show" } Completed
        </button>
        
      </div>
    )
  }
}