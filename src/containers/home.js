import React from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import { connect } from "react-redux";
import { TaskModule } from "../models/tasks";
import { createTask, toggleTask } from '../processes/tasks';
import toastr from 'toastr';

class HomeComponent extends React.Component {
  state = {
    taskName: ''
  };

  changeNewTaskName = (event) => {
    this.setState({ taskName: event.target.value });
  };

  createTask = () => {
    this.props.createTask(this.state.taskName)
      .then(() => this.setState({ taskName: '' }))
      .catch(e => {
        console.error(e);
        toastr.error(e.message)
      });
  };

  toggleTask = event => {
    this.props.toggleTask(event.target.value).catch(e => toastr.error(e.message));
  };

  render() {
    return <div>
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <div className="App-intro">
        <input type="text" onChange={ this.changeNewTaskName } value={ this.state.taskName }/>
        <button onClick={ this.createTask }>Create</button>
        <ul>{ this.renderTasks() }</ul>
      </div>
    </div>;
  }

  renderTasks() {
    const { tasks } = this.props;
    return tasks.map(task => <li key={ task.id }>
      <input type="checkbox" checked={ task.done } value={ task.id } onChange={ this.toggleTask }/>
      <span>{ task.name }</span>
    </li>);
  }
}

HomeComponent.propTypes = {
  tasks: PropTypes.array,
  createTask: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    tasks: TaskModule.selector.tasks(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: createTask(dispatch),
    toggleTask: toggleTask(dispatch)
  };
};

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);