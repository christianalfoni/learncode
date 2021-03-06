import uuid from 'node-uuid';
import db from './../database.js';

const defaultIndex = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
  </head>
  <body>

  </body>
</html>`;

export default function createCourse(req, res) {
  const course = {
    id: uuid.v4(),
    created: Date.now(),
    name: req.body.course.name,
    authorId: req.cookies.kodeboksen,
    type: req.body.course.type,
    description: req.body.course.description,
    skillLevel: req.body.course.skillLevel,
    scenes: [{
      name: req.body.course.sceneName,
      currentFileIndex: 0,
      files: [{
        name: 'index.html',
        code: defaultIndex
      }],
      assignments: [{
        description: '',
        code: ''
      }]
    }]
  };

  db.insert('courses', course)
    .then(() => {
      res.type('json');
      res.send({
        id: course.id
      });
    })
    .catch((e) => {
      console.log('Could not create course', e);
    });
}
