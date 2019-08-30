import React from 'react'

export default ({ users, isAdmin }) => {
  const studentsList = users.map(user => {
    let averageScore = 0;
    if (user.average) averageScore = user.average
    if (!user.admin) {
      return (
        <li className="list-group-item" key={user._id}>
          {user.first_name} {user.last_name}: {user.email}
          <span className="average-grade"> {isAdmin ? averageScore + "/100" : ""}</span>
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
