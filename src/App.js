import React, { Component } from 'react';
import './App.css';
import { HomeContainer } from "./containers/home";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { TaskModule } from "./models/tasks";
import { makePromise } from "./redux-middlewares/make-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import 'toastr/build/toastr.min.css';
import { Process } from "./utilities/process";
import { ModuleActions } from "./utilities/module-action";

const reducers = combineReducers({
  [TaskModule.name]: TaskModule.reducers
});


const store = createStore(reducers, composeWithDevTools(applyMiddleware(Process.register, makePromise)));

ModuleActions.registerDispatch(store.dispatch);

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
