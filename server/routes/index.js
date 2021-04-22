
const jwt = require('jsonwebtoken');
const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const projectsController = require('../controllers').projects;
const UserProject = require('../models').UserProject;

const accessTokenSecret = '12345678';


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

const authenticateProject = (req, res, next) => {
  const pid = req.params.projectId;
  if (pid) {
    UserProject.findOne({
      where: {
        userId: req.user.id,
        projectId: pid,
      }
    }).then(userProj => {
      if (userProj) {
        req.proj = {
          id: pid,
          role: userProj.role,
        }
        next();
      } else {
        return res.sendStatus(401);
      }
    })
  }
}


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  // app.post('/api/user', todosController.create);

  // app.post('/api/project/:projectId/todos', todosController.create);

  app.post('/api/users', usersController.create);
  app.post('/api/users/login', usersController.login);


  app.post('/api/projects', authenticateJWT, projectsController.create);
  app.post('/api/projects/:projectId/invite', authenticateJWT, authenticateProject, projectsController.invite);

  
  app.post('/api/projects/:projectId/todos', authenticateJWT, authenticateProject, todosController.create);
  app.get('/api/projects/:projectId/todos', authenticateJWT, authenticateProject, todosController.list);
  app.get('/api/projects/:projectId/todos/:todoId', authenticateJWT, authenticateProject, todosController.retrieve);
  app.put('/api/projects/:projectId/todos/:todoId', authenticateJWT, authenticateProject, todosController.update);
  app.delete('/api/projects/:projectId/todos/:todoId', authenticateJWT, authenticateProject, todosController.destroy);
/*
  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete(
    '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  );

  */
  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));

};