import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import icons from 'common/icons.css';

const containerMarginLeft = -337; // from CSS
const containerWidth = 685 + containerMarginLeft; // from CSS
const rightMargin = 30;
const leftMargin = 10;
const arrowMarginLeft = 327;

@Cerebral({
  openedCourse: ['techTree', 'openedCourse'],
  user: ['user']
})
class OpenedTechTreeCourse extends React.Component {
  constructor() {
    super();
  }
  getLeftPosition(originalPosition) {
    if (originalPosition + containerMarginLeft - leftMargin <= leftMargin) {
      return leftMargin - containerMarginLeft;
    }

    if (originalPosition + containerWidth + rightMargin >= document.body.offsetWidth) {
      return originalPosition - (originalPosition + containerWidth + rightMargin - document.body.offsetWidth);
    }

    return originalPosition;
  }
  getLeftArrowPosition(originalWrapperPosition) {
    if (originalWrapperPosition - this.getLeftPosition(originalWrapperPosition) < 0) {
      return arrowMarginLeft + originalWrapperPosition - this.getLeftPosition(originalWrapperPosition);
    }

    if (originalWrapperPosition - this.getLeftPosition(originalWrapperPosition) > 0) {
      return arrowMarginLeft + originalWrapperPosition - this.getLeftPosition(originalWrapperPosition);
    }

    return arrowMarginLeft;
  }
  getProgressPercent() {
    const course = this.props.openedCourse.course;

    if (!this.props.user.assignmentsSolved[course.id]) {
      return 0;
    }
    const finishedTasks = this.props.user.assignmentsSolved[course.id].length;
    const totalTasks = course.assignmentPoints.length + 1;

    return Math.round((finishedTasks / totalTasks) * 100);
  }
  openCourse() {
    this.props.signals.course.opened({
      courseId: this.props.openedCourse.course.id.toString(),
      sceneIndex: '0'
    });
  }
  renderButton() {
    if (this.props.openedCourse.courseIsStarted) {
      return (
        <button className={styles.button} onClick={() => this.openCourse()}>
          <span className={`${icons.play} ${styles.buttonIcon}`}></span>
          Fortsett
        </button>
      );
    }

    if (this.props.openedCourse.courseIsActive) {
      return (
        <button className={styles.button} onClick={() => this.openCourse()}>
          <span className={`${icons.play} ${styles.buttonIcon}`}></span>
          Start
        </button>
      );
    }

    if (this.props.openedCourse.courseIsCompleted) {
      return (
        <button className={styles.buttonCompleted} onClick={() => this.openCourse()}>
          <span className={`${icons.play} ${styles.buttonIcon}`}></span>
          Start på nytt
        </button>
      );
    }

    return null;
  }
  renderIcon() {
    const course = this.props.openedCourse;

    if (!course.courseIsCompleted && !course.courseIsActive && !course.courseIsStarted) {
      return (
        <div className={styles.iconDisabled}>
          <span className={icons.lock}></span>
        </div>
      );
    }

    if (course.course.type === 'course') {
      return (
        <div className={styles.icon}>
          <span className={icons.school}></span>
        </div>
      );
    }

    return (
      <div className={styles.icon}>
        <span className={icons.light}></span>
      </div>
    );
  }
  render() {
    if (!this.props.openedCourse) {
      return null;
    }
    const leftArrowPosition = this.getLeftArrowPosition(this.props.openedCourse.position.left);

    return (
      <div
        ref="wrapper"
        style={{left: this.getLeftPosition(this.props.openedCourse.position.left), top: this.props.openedCourse.position.top}}
        className={styles.wrapper}>
        <div
          style={{left: leftArrowPosition}}
          className={styles.arrow}>
        </div>
        <div
          style={{left: leftArrowPosition - 2}}
          className={styles.arrowBorder}>
        </div>
        {this.renderIcon()}
        <div className={styles.textWrapper}>
          <div className={styles.title}>{this.props.openedCourse.course.name}</div>
          <div className={styles.description}>{this.props.openedCourse.course.description}</div>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressed} style={{width: this.getProgressPercent()}}></div>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.detail}>
            <div className={styles.value}>{this.getProgressPercent()}%</div>
            <div className={styles.label}>Fullført</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.value}>10 min</div>
            <div className={styles.label}>Estimert kurstid</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.value}>{this.props.openedCourse.course.skillLevel}</div>
            <div className={styles.label}>Ferdighetsnivå</div>
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default OpenedTechTreeCourse;
