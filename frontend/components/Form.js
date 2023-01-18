import React from 'react'

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      task: '',
    }
  }

  submitForm = (e) => {
    e.preventDefault;
    this.props.addTask(e, this.state.task);
    this.setState({
      ...this.state,
      task: ""
    })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      task: e.target.value,
    })
  }


  render() {
    return (
      <form onSubmit={this.submitForm} >
        <input 
          type="text"
          placeholder="Enter task here"
          onChange={this.handleChange}
          value={this.state.task}
        />
        <button id="add-task-button">Add Task</button>
      </form>
    )
  }
}
