import React from 'react'

export default ({ users, isAdmin }) => {
  const studentsList = users.map(user => {
    if (!user.admin) {
      return (
        <li className="list-group-item" key={user._id}>
          {user.first_name} {user.last_name}: {user.email}
        </li>
      )
    } else {
      return "";
    }

  });

  return (
    <>
      <h1>All Students</h1>
      <ul className="list-group">
        { studentsList }
      </ul>
    </>
  )
}
