import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller.js';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';

import App from './App.js';
import homeOpened from './modules/home/signals/homeOpened.js';
import courseOpened from './modules/course/signals/courseOpened.js';
import courseAppClicked from './modules/course/signals/appClicked.js';
import openFolderClicked from './modules/course/signals/openFolderClicked.js';
import addFileClicked from './modules/course/signals/addFileClicked.js';
import addFileInputBlurred from './modules/course/signals/addFileInputBlurred.js';
import codeChanged from './modules/course/signals/codeChanged.js';
import showPreviewClicked from './modules/course/signals/showPreviewClicked.js';
import showConsoleClicked from './modules/course/signals/showConsoleClicked.js';
import listFileClicked from './modules/course/signals/listFileClicked.js';

controller.signal('homeOpened', ...homeOpened);
controller.signal('courseOpened', ...courseOpened);
controller.signal('course.appClicked', ...courseAppClicked);
controller.signal('course.openFolderClicked', ...openFolderClicked);
controller.signal('course.addFileClicked', ...addFileClicked);
controller.signal('course.addFileInputBlurred', ...addFileInputBlurred);
controller.signal('course.codeChanged', ...codeChanged);
controller.signal('course.showPreviewClicked', ...showPreviewClicked);
controller.signal('course.showConsoleClicked', ...showConsoleClicked);
controller.signal('course.listFileClicked', ...listFileClicked);

Router(controller, {
  '/': 'homeOpened',
  '/courses/:courseId/scenes/:sceneIndex': 'courseOpened'
}, {
  onlyHash: true
}).trigger();

ReactDOM.render(
  <Container controller={controller}>
    <App/>
  </Container>,
document.getElementById('root'));
