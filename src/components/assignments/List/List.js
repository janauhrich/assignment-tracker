import React from "react";

import Actions from "./List.Actions";
import Score from "./List.Score"

export default ({ currentUserId, destroyAssignment, user, deletedAssignment }) => {

  const assignments = user.assignments.map(assignment => (
    <div key={assignment._id} className="card">
      <div className="card-body">
        <h3 className="card-title">{assignment.title}</h3>
        <span className="card-text">{assignment.project_description}</span>
        <Score assignmentScore={assignment.score} assignmentBase={assignment.base} />

      </div>
      <Actions
        currentUserId={currentUserId}
        destroyAssignment={destroyAssignment} 
        assignment={assignment}
        user={user}
      />
    </div>
  ));

  return (
    <>
      <h2 className="mb-4">{user.first_name}'s Assignments</h2>
      <div className="updateAnnouncer alert" aria-live="polite" role="alert" >{deletedAssignment}</div>
      {assignments}
    </>
  );
};
