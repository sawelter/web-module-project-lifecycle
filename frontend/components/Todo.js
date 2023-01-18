import React from 'react'

export default class Todo extends React.Component {

  handleToggle = (e) => {
    e.preventDefault();
    this.props.toggleComplete(this.props.task.id);
  }

  render() {
    return (
      <div onClick={this.handleToggle} className={`${this.props.task.completed === true} ? "completed" : ""`}>
        {this.props.task.name}{this.props.task.completed === true ? " ✔" : ""}
      </div>
    )
  }
}
