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

    const validEmail = EmailValidator.validate(this.state.email)

    if (name === 'first_name') {
      if (!value) {
        //never use color alone to indicate an error
        this.setState({ first_nameError: 'Error: First name is required' })
      } else {
        this.setState({ first_nameError: '' })
        delete this.state.first_nameError;
      }
    }
    if (name === 'last_name') {
      if (!value) {
        this.setState({ last_nameError: 'Error: Last name is required' })
      } else {
        this.setState({ last_nameError: '' })
        delete this.state.last_nameError;
      }
    }
    if (name === 'email') {
      if (!value) {
        this.setState({ emailError: 'Error: Email address is required' })
      } else if (!validEmail) {
        this.setState({ emailError: 'Error: You must enter a valid email address' })
      } else {
        this.setState({ emailError: '' })
        delete this.state.emailError;
      }
    }
    if (name === 'password') {
      const validPassword = this.state.password.length >= 8
      if (!value) {
        this.setState({ passwordError: 'Error: Password is required' })
      } else if (!validPassword) {
        this.setState({ passwordError: 'Error: Your password must be at least 8 characters' })
      } else {
        this.setState({ passwordError: '' })
        delete this.state.passwordError;
      }
    }
    if (!this.state.first_nameError && !this.state.last_nameError && !this.state.passwordError && !this.state.emailError) {
      this.setState({ formError: '' })
      delete this.state.formError;
    }
        
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.state.first_nameError || this.state.last_nameError || this.state.passwordError || this.state.emailError) {
      this.setState({ formError: 'Error: Form could not be submitted. Check that all fields have been entered and that your email and password are correct.' })
      //this sets the focus to the main error if the form wasn't submitted - super awesome for accessibility 
      this.errorFocus.current.focus();
    } else {
      this.props.onSubmit(this.state)
        .then(() => this.props.history.push('/users'))
    }
  }

  render () {
    return (
      
      <form noValidate onSubmit={this.handleSubmit}>
        <span aria-live='polite' tabIndex='-1' className='error' ref={this.errorFocus} >{this.state.formError}</span>
        {(this.props.location.pathname === '/signup') &&
          <>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name</label>
            <input
              className='form-control'
              id='firstName'
              onChange={this.handleChange}
              onBlur={this.handleError}
              name='first_name'
              type='text'
              value={this.state.firstName}
              required
            />
            <span className='error' aria-live="polite">{this.state.first_nameError}</span>
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              className='form-control'
              id='lastName'
              onChange={this.handleChange}
              onBlur={this.handleError}
              name='last_name'
              type='text'
              value={this.state.lastName}
              required
            />
            <span className='error' aria-live="polite">{this.state.last_nameError}</span>
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
