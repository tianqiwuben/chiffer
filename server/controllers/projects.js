const Project = require('../models').Project;
const User = require('../models').User;
const UserProject = require('../models').UserProject;

module.exports = {
  create(req, res) {
    return Project
      .create({
        name: req.body.name,
      })
      .then(proj => {
        return User.findByPk(req.user.id).then(user => {
          return user.addProject(proj).then((item) => {
            return UserProject.findOne({
              where: {
                userId: req.user.id,
                projectId: proj.id,
              }
            }).then(userProj => {
              return userProj.update({
                role: UserProject.ROLES.OWNER,
              }).then((updated) => {
                res.status(201).send(proj);
              })
            })
          });
        })
      })
      .catch(error => {
        res.status(400).send(error)
      });
  },
  invite(req, res) {
    if (req.proj.role !== UserProject.ROLES.OWNER) {
      return res.status(400).send({message: 'permission denied'});
    }
    if (!req.body.userId) {
      return res.status(400).send({message: 'missing userId'});
    }
    return Project.findByPk(req.proj.id).then(proj => {
      return User.findByPk(req.body.userId).then(user => {
        return user.addProject(proj).then(() => {
          return UserProject.findOne({
            where: {
              userId: user.id,
              projectId: proj.id,
            }
          }).then(userProj => {
            return userProj.update({
              role: UserProject.ROLES.MEMBER,
            }).then(() => {
              res.status(201).send({message: 'Success'});
            })
          })
        });
      })
    });
  },
  /*
  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Todo
      .findByPk(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(todo);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Todo
      .findByPk(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
          })
          .then(() => res.status(200).send(todo))  // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Todo
      .findByPk(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  */
};