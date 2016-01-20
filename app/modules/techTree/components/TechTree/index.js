import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import selectedTier from '../../computed/selectedTier';

let Toolbar = null;
let CoursesOverview = null;
let styles = null;
let icons = null;
let Tiers = null;

@Cerebral({
  selectedTier: selectedTier,
  selectedCourse: ['techTree', 'selectedCourse'],
  courseDependencyMap: ['techTree', 'courseDependencyMap'],
  user: ['user']
})
class TechTree extends React.Component {
  constructor() {
    super();
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    require.ensure([], (require) => {
      Toolbar = require('common/components/Toolbar');
      Tiers = require('../Tiers');
      CoursesOverview =  require('../CoursesOverview');
      styles = require('./styles.css');
      icons = require('common/icons.css');
      this.setState({
        canRender: true
      });
    });
  }
  renderLevels() {
    const renderedLevels = [];
    const levels = this.props.courseDependencyMap;

    levels.forEach((level, levelIndex) => {
      const levelBoxes = [];

      for (let x = 0; x < level.length; x++) {
        const course = level[x];
        const courseIndex = x;

        if (course && (course.topLine || course.bottomLine)) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{borderTop: course ? '1px solid #5a7497' : ''}}
              className={styles.box}>
            </div>
          );
        } else if (level.sideLine) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{borderTop: typeof course === 'number' ? '1px solid #5a7497' : ''}}
              className={styles.line}>
            </div>
          );
        } else if (level.centerLine) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{
                borderLeft: typeof course === 'number' ? '1px solid #5a7497' : 'transparent'
              }}
              className={styles.centerLine}>
            </div>
          );
        } else {
          if (course) {
            if (course.course.type === 'course') {
              x = x + 7;
              levelBoxes.push(
                <div
                  key={courseIndex}
                  className={styles.largeBox}>
                  {this.renderCourse(course.course, courseIndex)}
                </div>
              );
            } else {
              levelBoxes.push(
                <div
                  key={courseIndex}
                  className={styles.smallBox}>
                  {this.renderTask(course.course, courseIndex)}
                </div>
              );
              x = x + 3;
            }
          } else {
            levelBoxes.push(
              <div
                key={courseIndex}
                style={{backgroundColor: course  ? course.course.color : 'transparent'}}
                className={styles.box}>
                {course ? course.course.title : ''}
              </div>
            );
          }
        }
      }

      if (level.sideLine) {
        renderedLevels.push(
          <div key={levelIndex} className={styles.linesLevel}>{levelBoxes}</div>
        );
      } else if (level.centerLine) {
        renderedLevels.push(
          <div key={levelIndex} className={styles.centerLineLevel}>{levelBoxes}</div>
        );
      } else {
        renderedLevels.push(
          <div key={levelIndex} className={styles.boxLevel}>{levelBoxes}</div>
        );
      }
    });

    return renderedLevels;
  }
  canRemoveCourse(course) {
    if (!this.props.user.isAdmin) {
      return false;
    }

    const courseListObject = this.props.selectedTier.courseDependencyList.find((dependencyCourse) => {
      return dependencyCourse.course.id === course.id;
    });

    if (courseListObject && courseListObject.requiredBy.length > 0) {
      return false;
    }

    return true;
  }
  renderCourse(course, key) {
    return (
      <div
        key={key}
        className={course.disabled ? styles.courseDisabled : styles.large}
        style={this.props.selectedCourse && this.props.selectedCourse.id === course.id ? {border: '3px solid #4CAF50'} : {}}
        onClick={(e) => this.onCourseClicked(e, course)}>
        <div className={styles.courseBadge}>
          <span className={icons.thumbUp}></span>
        </div>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            {course.title}
            <span className={styles.subTitle}> {course.finishedPercent ? '(' + course.finishedPercent + ')' : ''}</span>
          </div>
        </div>
        {
          this.canRemoveCourse(course) ?
            <div
            onClick={(e) => {
              e.stopPropagation();
              this.props.signals.techTree.unlinkCourseClicked({course: course});
            }}
              className={styles.removeCourse}>
              X
            </div>
          :
            null
        }
      </div>
    );
  }
  renderTask(task, key) {
    return (
      <div
        key={key}
        className={task.disabled ? styles.taskDisabled : styles.small}
        style={this.props.selectedCourse && this.props.selectedCourse.id === task.id ? {border: '3px solid #4CAF50'} : {}}
        onClick={(e) => this.onCourseClicked(e, task)}>
        <div className={styles.taskBadge}>
          <span className={icons.scene}></span>
        </div>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            {task.title}
            <span className={styles.subTitle}> {task.finishedPercent ? '(' + task.finishedPercent + ')' : ''}</span>
          </div>
        </div>
        {
          this.canRemoveCourse(task) ?
            <div
              onClick={(e) => {
                e.stopPropagation();
                this.props.signals.techTree.unlinkCourseClicked({course: task});
              }}
              className={styles.removeCourse}>
              X
            </div>
          :
            null
        }
      </div>
    );
  }
  onCourseClicked(e, course) {
    e.stopPropagation();
    this.props.signals.techTree.courseClicked({course: course});
  }
  render() {
    if (this.state.canRender) {
      return (
        <div className={styles.wrapper} onClick={() => this.props.signals.techTree.wrapperClicked()}>
          <Toolbar/>
          <Tiers/>
          <div className={styles.techTreeWrapper}>
            {this.renderLevels()}
          </div>
          <CoursesOverview/>
        </div>
      );
    }

    return null;
  }
}

export default TechTree;
