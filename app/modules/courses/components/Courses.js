import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Courses.css';

@Cerebral({
  courses: ['courses', 'courses']
})
class Courses extends React.Component {
  constructor() {
    super();
  }
  courseClicked(course) {
    this.props.signals.course.courseOpened({
      courseId: course.id.toString(),
      sceneIndex: '0'
    });
  }
  renderCourses() {
    return this.props.courses.map((course, index) => {
      return (
        <div
          className={styles.courseWrapper}
          key={index}
          onClick={() => this.courseClicked(course)}>
          <span className={styles.courseName}>{course.name}</span>
          <span className={styles.scenes}>Scener: {course.scenes.length}</span>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Kurs</h1>
        <div className={styles.coursesWrapper}>
          {this.renderCourses()}
        </div>
      </div>
    );
  }
}

export default Courses;
