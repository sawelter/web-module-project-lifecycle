import React from 'react'

export default class Todo extends React.Component {

  click = (event, taskId) => {
    this.props.handleClick(event, taskId);
  }

  render() {
    return (
      <div onClick={(e) => this.click(e, this.props.task.id)}>
        {this.props.task.name}{this.props.task.completed === true ? " ✔" : ""}
      </div>
    )
  }
}