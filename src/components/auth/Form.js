import React from 'react'
import { withRouter } from 'react-router'
import * as EmailValidator from 'email-validator';

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.errorFocus = React.createRef();

    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleError({ target: { name, value } }) {
    
    if (name === 'email') { 
      const validEmail = EmailValidator.validate(this.state.email) 
      if (!validEmail) {
        this.setState({ emailError: 'Error: Your email is invalid' })
      } else {
        this.setState({ emailError: '' })
        delete this.state.emailError;
      }
    }
    if (name === 'password') { 
      const validPassword = this.state.password.length >= 8
      if (!validPassword) {
        this.setState({ passwordError: 'Error: Your password must be at least 8 characters' })
      } else {
        this.setState({ passwordError: '' })
        delete this.state.passwordError;
      }
    }    
  }

  handleSubmit (e) {
    e.preventDefault();
    const isThisOk = function () {
      return this.form.current.reportValidity();
    }
    console.log(isThisOk)
    if (this.state.passwordError || this.state.emailError) {
      this.setState({ formError: 'Error: Form cannot be submitted. Check your email & password.' })
      //this sets the focus to the main error if the form wasn't submitted - super awesome for accessibility 
      this.errorFocus.current.focus();
    } else {
      this.props.onSubmit(this.state)
        .then(() => this.props.history.push('/users'))
    }
  }

  render () {
    return (
      
      <form onSubmit={this.handleSubmit}>
        <span tabIndex='-1' className='error' ref={this.errorFocus} >{this.state.formError}</span>
        {(this.props.location.pathname === '/signup') &&
          <>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name</label>
            <input
              className='form-control'
              id='firstName'
              onChange={this.handleChange}
              name='first_name'
              type='text'
              value={this.state.firstName}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              className='form-control'
              id='lastName'
              onChange={this.handleChange}
              name='last_name'
              type='text'
              value={this.state.lastName}
              required
            />
          </div> 
          </>
        }  
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            className='form-control'
            id='email'
            onChange={this.handleChange}
            onBlur={this.handleError}
            name='email'
            type='text'
            value={this.state.email}
            required
          />
          <span className='error' aria-live="polite">{this.state.emailError}</span>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-control'
            id='password'
            onChange={this.handleChange}
            onBlur={this.handleError}
            name='password'
            type='password'
            value={this.state.password}
            required
          />
          <span className='error' aria-live="polite">{this.state.passwordError}</span>
        </div>
      
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default withRouter(Form)
