import React, {Component} from "react";
import {connect} from 'react-redux'
import {Field,reduxForm} from "redux-form";
import {signinUser} from   '../../actions/index'
import { withRouter } from 'react-router-dom';


class Signin extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.authenticated === true){
      this.props.history.push("/");
    }

  }

  renderInput(field) {
    return (
      <div className={`form-group ${field.meta.touched && field.meta.invalid ? 'has-error' : ''}`}>
        <input {...field.input} type={field.type} className={field.className}/>
        {field.meta.touched &&
        field.meta.error &&
        <div className="help-block">
          {field.meta.touched ? field.meta.error : ''}
        </div>}
      </div>
    );

  }

  handleFormSubmit(values) {

    this.props.signinUser(values)


  }

  renderAlert() {
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }

  }


  render() {
    const {handleSubmit} = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)} className="well">

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field
            name="email"                   // Specify field name
            component={this.renderInput}           // Specify render component above
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field
            name="password"                   // Specify field name
            component={this.renderInput}           // Reuse same render component
            type="password"
            className="form-control"
          />
        </div>
        {this.renderAlert()}

        <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
      </form>
    )
  }
}
function validate(values) {

  const errors = {};

  // Validate the inputs from 'values'
  if (!values.email) {
    errors.email = "Enter an email";
  }
  if (!values.password) {
    errors.password = "Enter password";
  }


  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  }
}

export default reduxForm({
  form: 'signin',
  validate
}) (withRouter(connect(mapStateToProps, { signinUser }) (Signin)))