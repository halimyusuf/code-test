import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <ConnectedAppComponents/> */}
        <div className="App">
          <div id="route-container">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
