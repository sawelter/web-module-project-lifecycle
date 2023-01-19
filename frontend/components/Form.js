import React from 'react'

export default class Form extends React.Component {

  updateText = (event) => {
    this.props.handleChange(event);
  }

  submitForm = (event) => {
    this.props.addTask(event);
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input 
          type="text" 
          placeholder="Enter new task" 
          onChange={this.updateText} 
          value={this.props.textInput}
        />
        <button type="submit">Add Task</button>
      </form>
    )
  }
}