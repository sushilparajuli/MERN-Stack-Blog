import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deletePost, fetchPost} from "../actions/index";
import swal from "sweetalert2";

class PostsShow extends Component {
  componentDidMount() {
    const {id} = this.props.match.params
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.match.params.id, () => {
      const self = this;
      swal({
        title: 'Deleted',
        text: "You have deleted the post",
        type: 'warning',
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: false,
        timer: 2000
      }).then(
        function () {
        },
        // handling the promise rejection
        function (dismiss, props) {
          if (dismiss === 'timer') {
            self.props.history.push("/");
          }
        }
      )

    })
  }
  renderDeleteButton(){
    if (this.props.authenticated) {
      return(
        <button
          className="btn btn-danger pull-right"
          onClick={this.onDeleteClick.bind(this)}
        > Delete
        </button>
      )
    }
  }

  render() {
    const {post} = this.props
    if (!post) {
      return <div>Loading....</div>
    }
    return (

      <div>
        <div className="clearfix form-group"> </div>
        <div className="form-group">
          <Link className="btn btn-primary" to="/"> Back to Index </Link>
          {this.renderDeleteButton()}

        </div>
        <hr/>
        <div className="panel panel-default panel-lg">
          <div className="panel-heading">
            <h3 className="panel-title">{post.title}</h3>
          </div>
          <div className="panel-body">
            <h6>Categories: <span className="label label-primary"> {post.categories}</span></h6>
            <p>{post.content}</p>
          </div>

        </div>


      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post,
    authenticated: state.auth.authenticated
  }

}
export  default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow)