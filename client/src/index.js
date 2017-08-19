import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {AUTH_USER} from './actions/types'

// react-router-dom replaces react-router in package.json dependencies.
// react-router 4.0.0 is a dependency of react-router-dom
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import reducers from './reducers';

// no longer using routes file
// import routes from './routes';

import promise from 'redux-promise';
import reduxThunk from 'redux-thunk'



import App from './components/App';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import Signin from './components/auth/signin'
import Signout from './components/auth/signout'
import Signup from './components/auth/signup'
import NoMatch from './components/404'
import RequireAuth from './components/auth/require_auth'
const store = createStore(
  reducers,
  applyMiddleware(reduxThunk,promise)
)

const token = localStorage.getItem('token')
//if we have a token, consider the user to be signed in
if(token){
  store.dispatch({
    type: AUTH_USER
  })
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signout" component={Signout} />
          <Route  path="/signup" component={Signup} />
          <Route  exact  path="/" component={PostsIndex} />
          <Route path="/posts/new" component={RequireAuth(PostsNew)} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route component={NoMatch} />
        </Switch>
      </App>
    </Router>
  </Provider>
  , document.getElementById('root'));