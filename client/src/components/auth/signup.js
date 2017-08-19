import React, {Component} from "react";
import {connect} from 'react-redux'
import {Field,reduxForm} from "redux-form";
import * as actions from   '../../actions/index'



class Signup extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)

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

  handleSubmit(values) {

    this.props.signupUser(values)


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
      <form onSubmit={handleSubmit(this.handleSubmit)} className="well">

        <div>
          <label htmlFor="email">Email</label>
          <Field
            name="email"                   // Specify field name
            component={this.renderInput}           // Specify render component above
            type="text"
            className="form-control"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field
            name="password"                   // Specify field name
            component={this.renderInput}           // Reuse same render component
            type="password"
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <Field
            name="passwordConfirm"                   // Specify field name
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
  if (values.passwordConfirm !== values.password ) {
    errors.passwordConfirm = "Enter same password";
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
  form: 'signup',
  validate
}) (connect(mapStateToProps,actions)(Signup))