import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.errorFocus = React.createRef();

    const { assignment = {} } = this.props;
    const {
      assignment_title = "",
      project_description = "",
      project_link = ""
    } = assignment;
    this.state = { assignment_title, project_description, project_link };

    this.handleChange = this.handleChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleError({ target: { name, value } }) {
    if (!value) {
      if (name === 'assignment_title') {
        this.setState({ titleRequiredError: "Error: Assignment title is required" });
      } else if (name ==='project_description') { 
        this.setState({ descriptionRequiredError: "Error: Project description is required" });
      } else if (name ==='project_link')
        this.setState({ linkRequiredError: "Error: Project link is required" });
    } else {
      this.setState({ titleRequiredError: "", descriptionRequiredError: "", linkRequiredError: "" });
      delete this.state.titleRequiredError;
      delete this.state.descriptionRequiredError;
      delete this.state.linkRequiredError;
      delete this.state.formError;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { assignment } = this.props;
    if (this.state.titleRequiredError || this.state.descriptionRequiredError || this.state.linkRequiredError) { 
      this.setState({ formError: 'Error: Form could not be submitted. Check that all fields have been entered.' })
      this.errorFocus.current.focus();
    } else if (assignment && assignment._id) {
      const body = Object.assign({}, this.state, { _id: assignment._id });
      this.props.onSubmit(body);
    } else {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span aria-live='polite' tabIndex='-1' className='error' ref={this.errorFocus}>{this.state.formError}{this.props.failure}</span>
        <div className="form-group">
          <label htmlFor="assignment_title">Assignment Title</label>
          <input
            className="form-control"
            id="assignment_title"
            onChange={this.handleChange}
            onBlur={this.handleError}
            name="assignment_title"
            type="text"
            value={this.state.title}
          />
        </div>
        <span className='error' aria-live="polite">{this.state.titleRequiredError}</span>
        <div className="form-group">
          <label htmlFor="project_description">Project Description</label>
          <textarea
            className="form-control"
            id="project_description"
            onChange={this.handleChange}
            onBlur={this.handleError}
            name="project_description"
            type="text"
            value={this.state.project_description}
          />
        </div>
        <span className='error' aria-live="polite">{this.state.descriptionRequiredError}</span>
        <div className="form-group">
          <label htmlFor="project_link">Project Link</label>
          <input
            className="form-control"
            id="project_link"
            onChange={this.handleChange}
            onBlur={this.handleError}
            name="project_link"
            type="text"
            value={this.state.project_link}
          />
        </div>
        <span className='error' aria-live="polite">{this.state.linkRequiredError}</span>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
