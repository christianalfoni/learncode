import React from 'react';
import styles from './AssignmentsBar.css';
import icons from 'common/icons.css';

function AssignmentsBar(props) {
  const renderAssignment = (assignment, index) => {
    const isCompleted = props.completedAssignments.indexOf(index) >= 0;

    return (
      <li
        key={index}
        className={index === props.currentAssignmentIndex ? styles.activeAssignmentWrapper : isCompleted ? styles.completedAssignmentWrapper : styles.assignmentWrapper}
        onClick={() => props.onAssignmentClick({index: index})}>
        <div className={isCompleted ? icons.assignmentCompleted : icons.assignment}/>
      </li>
    );
  };

  return (
    <ul className={styles.wrapper}>
      {props.assignments.map(renderAssignment)}
      {
        props.isAdminMode ?
          <li key="add" className={styles.assignmentWrapper} onClick={() => props.onNewAssignmentClick()}>
            <div className={icons.addAssignment}/>
          </li>
        :
          null
      }
    </ul>
  );
}

export default AssignmentsBar;
