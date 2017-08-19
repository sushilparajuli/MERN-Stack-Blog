import React, { Component } from 'react'
import {connect} from 'react-redux'
//import { bindActionCreators } from 'redux'
import {fetchPosts} from '../actions/index'
import {Link} from 'react-router-dom'

class PostsIndex extends Component{
  componentWillMount(){
    this.props.fetchPosts();
  }
  renderPosts(){
    return this.props.posts.map((post)=>{
      return (
        <li className="list-group-item" key={post._id}>
          <Link to={"posts/" + post._id} >
          <span className="pull-right">{post.categories}</span>
          <strong>{post.title} </strong>
          </Link>
        </li>
      )
    })
  }
  renderPostButton () {
    if (this.props.authenticated) {
      return(
      <Link to="/posts/new" className="btn btn-success"> Add a Post </Link>
      )
    }
  }
  render(){
    return(
      <div>
        <div className="pull-right">
          {this.renderPostButton()}
        </div>
        <h3>Posts</h3>
        <hr/>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}
/*function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchPosts},dispatch)

}*/

function mapStateToProps(state) {
  return {
    posts: state.posts.all,
    authenticated: state.auth.authenticated
  }

}


//We can replace mapDispatchToProps within connect with {fetchPosts}
// We can {fetchPosts:fetchPosts} as {fetchPosts} in es6
export default connect(mapStateToProps,{fetchPosts}) (PostsIndex)