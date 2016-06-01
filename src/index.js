import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import requireAuth from './components/require_authentication';
import App from './components/app';
import reducers from './reducers';
import Home from './components/home';
import Resources from './components/resources';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// history object tells react-router how it should work with the current url in the browser
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="resources" component={requireAuth(Resources)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));



// Higher Order Component (HOC) is a react component that adds some additional functionality or behavior
// to an existing component that you've already written or plan to write in the future
// Great way to extract functionality of multiple components
// Also centralizing reusable logic


// connect is a hoc that communicates with Provider, at the top of our application.
// the Provider wraps the redux store (which is the redux library that holds our 
// global object application state)
// Provider watches over the redux store very directly. When redux store makes any changes,
// it'll communicate to the Provider
// If there are changes, then it will update its child components (which are the smart
// components, aka containers)