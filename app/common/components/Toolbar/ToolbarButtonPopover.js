import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import ToolbarButton from './ToolbarButton.js';
import styles from './ToolbarButtonPopover.css';

@Cerebral()
class ToolbarButtonPopover extends React.Component {
  onArrowBoxClick(e) {
    e.stopPropagation();
    this.props.signals.course.buttonPopoverClicked({
      mousePositionX: e.clientX,
      mousePositionY: e.clientY
    });
  }
  renderBox() {
    return (
      <div className={styles.arrowBox} onClick={(e) => this.onArrowBoxClick(e)}>
        <div className={styles.contentBox}>
          {this.props.children}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <ToolbarButton icon={this.props.icon} title={this.props.title} onClick={this.props.onClick} tooltip={this.props.tooltip}/>
        {this.props.show ? this.renderBox() : null}
      </div>
    );
  }
}

export default ToolbarButtonPopover;
