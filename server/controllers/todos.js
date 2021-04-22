const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return Todo
      .create(
        {
          ownerId: req.user.id,
          projectId: req.proj.id,
          ...Todo.permittedFields(req.body)
        },
      )
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    const query = {
      projectId: req.proj.id,
    };
    if (req.query.ownerId) {
      query.ownerId = req.query.ownerId;
    }
    if (req.query.requesterId) {
      query.requesterId = req.query.requesterId;
    }
    return Todo
      .findAll({
        where: query,
        order: [
          ['priority', 'ASC'],
        ],
        offset: req.params.page ? (req.params.page * 25) : 0,
        limit: 25,
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
          .update(Todo.permittedFields(req.body))
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
};