import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Header extends Component {
  renderLists() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link to="/signout" className="nav-link">Sign Out </Link>
        </li>
      )

    } else {
      return [
        <li className="nav-item" key={1}>
          <Link to="/signin" className="nav-link" >Sign In </Link>
        </li>,
      <li className="nav-item" key={2}>
        <Link to="/signup" className="nav-link" >Sign Up </Link>
      </li>
      ]
    }

  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <Link to="/" className="navbar-brand"> Redux Blog </Link>
          <ul className="nav navbar-nav navbar-right">
            {this.renderLists()}
          </ul>
        </div>
      </nav>
    )
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}
export default connect(mapStateToProps)(Header)