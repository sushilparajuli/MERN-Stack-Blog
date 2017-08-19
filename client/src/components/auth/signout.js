import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../actions";
import {Link} from 'react-router-dom'

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className="well text-center">
        <h1>Sorry to see you go </h1>
        <p>You can still see the post <Link to="/">here</Link></p>
      </div>
    )
  }
}

export default connect(null, actions)(Signout)