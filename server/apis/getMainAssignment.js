import db from './../database.js';

export default function getMainAssignment(req, res) {
  db.findOne('mainAssignments', {
    userId: req.user.id
  })
  .then((mainAssignment) => {
    res.type('json');
    if (!mainAssignment) {
      res.status(404);
      res.send({});
    } else {
      res.send(mainAssignment);
    }
  })
  .catch(() => {
    console.log('Could not get main assignment');
  });
}