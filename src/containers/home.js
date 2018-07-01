import * as React from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import { connect } from "react-redux";
import { TaskModule } from "../models/tasks";
import { createTask } from '../processes/tasks';
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
      .catch(e => toastr.error(e.message));
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
    return tasks.map(task => <li key={ task.id }>{ task.name }</li>);
  }
}

HomeComponent.propTypes = {
  tasks: PropTypes.array,
  createTask: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  return {
    tasks: TaskModule.selector.tasks(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    createTask: createTask.action(dispatch)
  };
};

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);