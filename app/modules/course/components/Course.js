import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './Toolbar.js';
import DurationSlider from './DurationSlider.js';
import Module from './Module.js';
import ModuleToolbar from './ModuleToolbar.js';
import ModuleFileName from './CodeEditor/ModuleFileName.js';
import ModuleAddressbar from './Preview/ModuleAddressbar.js';
import CodeEditor from './CodeEditor.js';
import Preview from './Preview.js';
import PlayButton from './PlayButton.js';
import RecordButton from './RecordButton.js';
import VideoFrame from './VideoFrame.js';
import styles from './Course.css';
import Console from './Console.js';
import AssignmentDescription from './AssignmentDescription.js';
import AssignmentEditor from './AssignmentEditor.js';

@Cerebral({
  isLoading: ['course', 'isLoading'],
  currentFileName: ['course', 'selectedFile', 'name'],
  showPreview: ['course', 'showPreview'],
  showConsole: ['course', 'showConsole'],
  showEditAssignment: ['course', 'showEditAssignment']
})
class Recording extends React.Component {
  assignmentDescriptionChanged(e) {
    this.props.signals.course.AssignmentDescriptionChanged({
      description: e.target.value
    });
  }
  render() {
    return (
      <div className={styles.wrapper} onClick={() => this.props.signals.course.appClicked()}>
        <div className={this.props.isLoading ? styles.overlayVisible : styles.overlay}></div>
        <Toolbar/>
        <DurationSlider/>
        <div className={this.props.showEditAssignment ? styles.threeColumns : styles.twoColumns}>
          <Module show={this.props.showEditAssignment}>
            <ModuleToolbar title="ASSIGNMENT DESCRIPTION"/>
            <AssignmentDescription onChange={(e) => this.assignmentDescriptionChanged(e)}/>
            <ModuleToolbar title="ASSIGNMENT TEST"/>
            <AssignmentEditor/>
          </Module>
          <Module show={Boolean(true)}>
            <ModuleToolbar title="CODE EDITOR">
              <ModuleFileName fileName={this.props.currentFileName}/>
            </ModuleToolbar>
            <CodeEditor/>
          </Module>
          <Module show={Boolean(true)}>
            <ModuleToolbar title="BROWSER">
              <ModuleAddressbar url="http://sandbox.learncode.com:3000"/>
            </ModuleToolbar>
            <Preview show={this.props.showPreview}/>
            <Console show={this.props.showConsole}/>
          </Module>
        </div>
        <PlayButton/>
        <RecordButton/>
        <VideoFrame/>
      </div>
    );
  }
}

export default Recording;
