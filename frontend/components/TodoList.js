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
                    task={task} 
                    handleClick={this.handleClick}
                  /> 
        })}
      </div>
      
      
    )
  }
}