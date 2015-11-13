import authenticate from 'common/factories/chains/authenticate';

import courseOpened from './signals/courseOpened';
import courseAppClicked from './signals/appClicked';
import openFolderClicked from './signals/openFolderClicked';
import addFileClicked from './signals/addFileClicked';
import addFileInputBlurred from './signals/addFileInputBlurred';
import codeChanged from './signals/codeChanged';
import showPreviewClicked from './signals/showPreviewClicked';
import showConsoleClicked from './signals/showConsoleClicked';
import folderFileClicked from './signals/folderFileClicked';
import addFileAborted from './signals/addFileAborted';
import editAssignmentClicked from './signals/editAssignmentClicked';
import assignmentCodeChanged from './signals/assignmentCodeChanged';
import assignmentDescriptionChanged from './signals/assignmentDescriptionChanged';
import addFileSubmitted from './signals/addFileSubmitted';
import openAssignmentClicked from './signals/openAssignmentClicked';
import recordClicked from './signals/recordClicked';
import stopClicked from './signals/stopClicked';
import playClicked from './signals/playClicked';
import saveSceneClicked from './signals/saveSceneClicked';
import configureScenesClicked from './signals/configureScenesClicked';
import addSceneSubmitted from './signals/addSceneSubmitted';
import sceneNameClicked from './signals/sceneNameClicked';
import listSceneNameClicked from './signals/listSceneNameClicked';
import uploadClicked from './signals/uploadClicked';
import uploadFinished from './signals/uploadFinished';
import uploadFailed from './signals/uploadFailed';
import removeFileClicked from './signals/removeFileClicked';
import newSceneNameChanged from './signals/newSceneNameChanged';
import sandboxTested from './signals/sandboxTested';
import runAssignmentClicked from './signals/runAssignmentClicked';
import addFileNameUpdated from './signals/addFileNameUpdated';
import pauseClicked from './signals/pauseClicked';
import mediaLoaded from './signals/mediaLoaded';
import videoStartedBuffering from './signals/videoStartedBuffering';
import videoFailed from './signals/videoFailed';
import codeCursorChanged from './signals/codeCursorChanged';
import seeked from './signals/seeked';
import buttonPopoverClicked from './signals/buttonPopoverClicked';
import sandboxClicked from './signals/sandboxClicked';

export default function(controller) {
  controller.signal('course.courseOpened', authenticate(courseOpened));
  controller.signal('course.appClicked', courseAppClicked);
  controller.signal('course.openFolderClicked', openFolderClicked);
  controller.signal('course.addFileClicked', addFileClicked);
  controller.signal('course.addFileInputBlurred', addFileInputBlurred);
  controller.signal('course.codeChanged', codeChanged);
  controller.signal('course.showPreviewClicked', showPreviewClicked);
  controller.signal('course.showConsoleClicked', showConsoleClicked);
  controller.signal('course.folderFileClicked', folderFileClicked);
  controller.signal('course.addFileAborted', addFileAborted);
  controller.signal('course.editAssignmentClicked', editAssignmentClicked);
  controller.signal('course.assignmentCodeChanged', assignmentCodeChanged);
  controller.signal('course.assignmentDescriptionChanged', assignmentDescriptionChanged);
  controller.signal('course.addFileSubmitted', addFileSubmitted);
  controller.signal('course.openAssignmentClicked', openAssignmentClicked);
  controller.signal('course.addFileSubmitted', addFileSubmitted);
  controller.signal('course.openAssignmentClicked', openAssignmentClicked);
  controller.signal('course.recordClicked', recordClicked);
  controller.signal('course.playClicked', playClicked);
  controller.signal('course.stopClicked', stopClicked);
  controller.signal('course.saveShortcutPressed', saveSceneClicked);
  controller.signal('course.saveSceneClicked', saveSceneClicked);
  controller.signal('course.configureScenesClicked', configureScenesClicked);
  controller.signal('course.addSceneSubmitted', addSceneSubmitted);
  controller.signal('course.sceneNameClicked', sceneNameClicked);
  controller.signal('course.listSceneNameClicked', listSceneNameClicked);
  controller.signal('course.uploadClicked', uploadClicked);
  controller.signal('course.uploadFinished', uploadFinished);
  controller.signal('course.uploadFailed', uploadFailed);
  controller.signal('course.removeFileClicked', removeFileClicked);
  controller.signal('course.newSceneNameChanged', newSceneNameChanged);
  controller.signal('course.sandboxTested', sandboxTested);
  controller.signal('course.runAssignmentClicked', runAssignmentClicked);
  controller.signal('course.addFileNameUpdated', addFileNameUpdated);
  controller.signal('course.pauseClicked', pauseClicked);
  controller.signal('course.mediaLoaded', mediaLoaded);
  controller.signal('course.videoStartedBuffering', videoStartedBuffering);
  controller.signal('course.videoFailed', videoFailed);
  controller.signal('course.codeCursorChanged', codeCursorChanged);
  controller.signal('course.seeked', seeked);
  controller.signal('course.buttonPopoverClicked', buttonPopoverClicked);
  controller.signal('course.sandboxClicked', sandboxClicked);
}
