import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NoMatch extends Component{
  render(){
    return(
      <div className="well text-center">
        <h1>404</h1>
        <em>Oops, no matching page routes</em>
        <Link to="/"> Go to Home </Link>
      </div>
    )
  }
}
export default NoMatch