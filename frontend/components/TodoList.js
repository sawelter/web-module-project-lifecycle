import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {

  handleClick = (event, taskId) => {
    event.preventDefault();
    this.props.toggleComplete(event, taskId)
  }



  render() {

    return (
      <div>
        {this.props.tasks.map((task) => {
          return <Todo 
            key={task.id}
            handleClick={this.handleClick}
            task={task}
          />
        })}
      </div>
    )

  }
}