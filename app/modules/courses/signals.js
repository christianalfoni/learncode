import coursesOpened from './signals/coursesOpened.js';
import newCourseClicked from './signals/newCourseClicked.js';
import appClicked from './signals/appClicked.js';
import newCourseSubmitted from './signals/newCourseSubmitted.js';
import newCourseNameUpdated from './signals/newCourseNameUpdated.js';

export default function(controller) {
  controller.signal('courses.coursesOpened', coursesOpened);
  controller.signal('courses.newCourseClicked', newCourseClicked);
  controller.signal('courses.appClicked', appClicked);
  controller.signal('courses.newCourseSubmitted', newCourseSubmitted);
  controller.signal('courses.newCourseNameUpdated', newCourseNameUpdated);
}