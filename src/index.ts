import express from 'express'

const app = express();
const port = 3000;

const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const db = {
  courses: [
    {id: 1, title: 'front-end'},
    {id: 2, title: 'back-end'},
    {id: 3, title: 'automation qa'},
    {id: 4, title: 'devops'}
  ]
}

app.get('/courses', (req: any, res: any) => {
  let foundCourses = db.courses;

  if (req.query.title) {
    foundCourses = foundCourses
    .filter(course => course.title.indexOf(req.query.title as string) > -1);
  }

  res.json(foundCourses);
})

app.get('/courses/:id', (req: any, res: any) => {
  const foundCourse = db.courses.find(course => course.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.json(foundCourse);
})

app.post('/courses', (req: any, res: any) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const createdCourse = {
    id: +(new Date()),
    title: req.body.title
  }

  db.courses.push(createdCourse);
  res
  .status(HTTP_STATUSES.CREATED_201)
  .json(createdCourse);
})

app.delete('/courses/:id', (req: any, res: any) => {
  db.courses = db.courses.filter(course => course.id !== +req.params.id);

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.put('/courses/:id', (req: any, res: any) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const foundCourse = db.courses.find(course => course.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  foundCourse.title = req.body.title;

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})