import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    const { assignment = {} } = this.props
    const { title = '', project_description = '', project_link = ''} = assignment
    this.state = { title, project_description, project_link}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { assignment } = this.props

    if (assignment && assignment._id) {
      const body = Object.assign({}, this.state, { _id: assignment._id })
      this.props.onSubmit(body)
    } else {
      this.props.onSubmit(this.state)
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
      <div className='form-group'>
          <label htmlFor='title'>Assignment Title</label>
          <input
            className='form-control'
            id='title'
            onChange={this.handleChange}
            name='title'
            type='text'
            value={this.state.title} />
        </div>        
        <div className='form-group'>
          <label htmlFor='project_description'>Project Description</label>
          <textarea
            className='form-control'
            id='project_description'
            onChange={this.handleChange}
            name='project_description'
            type='text'
            value={this.state.project_description} />
        </div>
        <div className='form-group'>
          <label htmlFor='project_link'>Project Link</label>
          <input
            className='form-control'
            id='project_link'
            onChange={this.handleChange}
            name='project_link'
            type='text'
            value={this.state.project_link} />
        </div>        
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}
