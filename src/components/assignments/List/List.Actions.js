import React from 'react'
import { Link } from 'react-router-dom'

export default ({ currentUserId, destroyAssignment, assignment, user }) => (
  <div className='card-footer text-muted d-flex justify-content-around'>
    {
      currentUserId === user._id
      && (
        <>
          <Link className='btn btn-link' to={`/users/${user._id}/assignments/${assignment._id}/edit`}>Edit Assignment</Link>
          <button
            className='btn btn-link text-danger'
            onClick={() => destroyAssignment(assignment)}>
            Delete Assignment
          </button>
        </>
      )
    }
  </div>
)
