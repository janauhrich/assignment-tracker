import React from "react";

import Score from "./List/List.Score"

export default ({ assignmentList, graded }) => {
 let assignmentsToShow = []
  if (graded) {
    assignmentsToShow = assignmentList.filter(assignment => assignment.assignments.score)
  } else { 
    assignmentsToShow = assignmentList.filter(assignment => !assignment.assignments.score)
  }

  const eachAssignment = assignmentsToShow.map(assignment => (
    <div key={assignment._id} className="card">
      <div className="card-body">
        <h3 className="card-title">{assignment.assignments.title}</h3>
        <span className="card-text">{assignment.assignments.project_description} </span>
        <Score assignmentScore={assignment.assignments.score} assignmentBase={assignment.assignments.base} />
      </div>
    </div>
  ));

  return (
    <>
      {eachAssignment}
    </>
  );
};
