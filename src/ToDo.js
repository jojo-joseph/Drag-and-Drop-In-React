import React, { Component } from 'react';
import './ToDo.css';

export default class ToDo extends Component {
  state = {
    tasks: [
      {
        id: '1',
        taskName: 'Charts Page',
        type: 'Done',
        bgcolor: 'red'
      },
      {
        id: '2',
        taskName: 'Live Streaming Page',
        type: 'Done',
        bgcolor: 'green'
      },
      {
        id: '3',
        taskName: 'Parking Map Page',
        type: 'Done',
        bgcolor: 'blue'
      },
      {
        id: '4',
        taskName: 'Reports Page',
        type: 'InProgress',
        bgcolor: 'yellow'
      },
      {
        id: '5',
        taskName: 'ToDo Page',
        type: 'InProgress',
        bgcolor: 'pink'
      },
      {
        id: '6',
        taskName: 'Overnight Parking Page',
        type: 'ToDo',
        bgcolor: 'grey'
      },
      {
        id: '7',
        taskName: 'Complaints Page',
        type: 'ToDo',
        bgcolor: 'brown'
      }
    ]
  };

  onDragStart = (event, taskName) => {
    event.dataTransfer.setData('taskName', taskName);
  };

  onDragOver = event => {
    event.preventDefault();
  };

  onDrop = (event, categroy) => {
    let taskName = event.dataTransfer.getData('taskName');
    let tasks = this.state.tasks.filter(task => {
      if (task.taskName == taskName) {
        task.type = categroy;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks
    });
  };

  render() {
    var tasks = {
      ToDo: [],
      InProgress: [],
      Done: []
    };

    this.state.tasks.forEach(task => {
      tasks[task.type].push(
        <div
          key={task.id}
          onDragStart={event => this.onDragStart(event, task.taskName)}
          draggable
          className="draggable"
          style={{ backgroundColor: task.bgcolor }}
        >
          {task.taskName}
        </div>
      );
    });

    return (
      <div className="drag-container">
        <h2 className="head"> Drag & Drop</h2>
        <div
          className="toDo"
          onDragOver={event => this.onDragOver(event)}
          onDrop={event => {
            this.onDrop(event, 'ToDo');
          }}
        >
          <span className="group-header">To Do</span>
          {tasks.ToDo}
        </div>
        <div
          className="inProgress"
          onDragOver={event => this.onDragOver(event)}
          onDrop={event => {
            this.onDrop(event, 'InProgress');
          }}
        >
          <span className="group-header">In Progress</span>
          {tasks.InProgress}
        </div>
        <div
          className="done"
          onDragOver={event => this.onDragOver(event)}
          onDrop={event => this.onDrop(event, 'Done')}
        >
          <span className="group-header">Done</span>
          {tasks.Done}
        </div>
      </div>
    );
  }
}
