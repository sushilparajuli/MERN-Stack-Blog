import axios from "axios";
import swal from 'sweetalert2'

import {AUTH_ERROR, AUTH_USER, UNAUTH_USER} from "./types";
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';


const SERVER_URL = 'http://localhost:3090'


export function fetchPosts() {
  const request = axios.get(`${SERVER_URL}/posts/`)
  return {
    type: FETCH_POSTS,
    payload: request
  }

}
export function createPost(props, cb) {
  const request = axios.post(`${SERVER_URL}/posts`, props)
    .then(res => {
      cb();
      swal({
        title: 'Thanks',
        text: "You have successfully added new post",
        type: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: false,
        timer: 2000
      })
      return res;
    });

  return {
    type: CREATE_POST,
    payload: request
  };
}
export function fetchPost(id) {

  const request = axios.get(`${SERVER_URL}/posts/${id}`,{
    headers: {authorization: localStorage.getItem('token')}
  })

  return {
    type: FETCH_POST,
    payload: request

  }

}
export function deletePost(id, cb) {
  const request = axios.delete(`${SERVER_URL}/posts/${id}`,{
    headers: {authorization: localStorage.getItem('token')}
  })
    .then(res => {
      cb();
      return res;
    });

  return {
    type: DELETE_POST,
    payload: request

  }
}

export function signinUser({email, password}) {
  return function (dispatch) {
    //Submit email/password to the server
    axios.post(`${SERVER_URL}/signin`, {email, password})
      .then(response => {

        // if request is good...
        // Update state to indicate user is authenticated

        dispatch({type: AUTH_USER})
        // save the JWT token
        localStorage.setItem('token', response.data.token)
        swal({
          title: 'Welcome',
          text: "You have successfully logged in",
          type: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          showCloseButton: false,
          timer: 2000
        })



      })
      .catch(() => {
        // if request is bad...
        // Show an error to the user
        dispatch(authError('Bad Login Info'))

      })


  }
}
export function signupUser({email, password}) {
  return function (dispatch) {
    //Submit email/password to the server
    axios.post(`${SERVER_URL}/signup`, {email, password})
      .then(response => {

        // if request is good...
        // Update state to indicate user is authenticated

        dispatch({type: AUTH_USER})
        // save the JWT token
        localStorage.setItem('token', response.data.token)

      })
      .catch(response => {
        console.log(response)
        dispatch(authError('Email in Use'))
      })


  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  swal({
    title: 'Bye',
    text: "Have a nice day",
    type: 'success',
    showCancelButton: false,
    showConfirmButton: false,
    showCloseButton: false,
    timer: 2000
  })
  return {type: UNAUTH_USER}
}

