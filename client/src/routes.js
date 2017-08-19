// no longer using this file

import React from 'react';
import { Route } from 'react-router-dom';

import App from './components/App';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';


export default (
  <Route exact path="/" component={App}>
    <Route path="/" component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
  </Route>
);