import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {


  render() {
    console.log("TodoList Component. To render: ", this.props.tasks)
    return (
      <div>
        {this.props.tasks.map(task => {
          return (
            <Todo 
              task={task} 
              key={task.id} 
              toggleComplete={this.props.toggleComplete}
            />
          )}
        )}
      </div>
    )
  }
}
