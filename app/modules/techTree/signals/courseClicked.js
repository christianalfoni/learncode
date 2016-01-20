import hasSelectedCourse from '../actions/hasSelectedCourse';
import setSelectedCourse from '../actions/setSelectedCourse';
import linkCourses from '../actions/linkCourses';
import createDependencySlotTree from '../actions/createDependencySlotTree';
import showSnackbar from 'common/factories/actions/showSnackbar';
import updateTier from '../actions/updateTier';

export default [
  hasSelectedCourse, {
    true: [
      linkCourses,
      [
        updateTier, {
          success: [createDependencySlotTree],
          error: [showSnackbar('Oppdatering av tier feilet!')]
        }
      ]
    ],
    false: [setSelectedCourse]
  }
];
