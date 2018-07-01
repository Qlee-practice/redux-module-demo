import React, { Component } from 'react';
import './App.css';
import { HomeContainer } from "./containers/home";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { TaskModule } from "./models/tasks";
import { makePromise } from "./redux-middlewares/make-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineProcess } from "./redux-middlewares/combine-process";
import { createTask } from "./processes/tasks";
import 'toastr/build/toastr.min.css';

const reducers = combineReducers({
  [TaskModule.name]: TaskModule.reducers
});

const processes = combineProcess(createTask);

const store = createStore(reducers, composeWithDevTools(applyMiddleware(processes, makePromise)));

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="App">
          <HomeContainer/>
        </div>
      </Provider>
    );
  }
}

export default App;
