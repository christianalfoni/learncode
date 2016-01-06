import set from 'common/factories/actions/set.js';
import closeAllPopovers from '../actions/closeAllPopovers';

export default [
  closeAllPopovers,
  set(['courses', 'showNewCourse'], true)
];
