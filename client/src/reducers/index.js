import { combineReducers } from 'redux'
import PostsReducer from './reducer_posts'
import {reducer as formReducer } from 'redux-form'

import authReducer from './auth_reducer'


const rootReducer = combineReducers({
  posts: PostsReducer,
  form : formReducer,
  auth : authReducer
})
export default rootReducer