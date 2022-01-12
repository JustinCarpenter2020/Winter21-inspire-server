import { Auth0Provider } from '@bcwdev/auth0provider'
import { todosService } from '../services/TodosService'
import BaseController from '../utils/BaseController'

export class TodosController extends BaseController {
  constructor() {
    super('api/todos')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTodo)
      .put('/:id', this.editTodo)
      .delete('/:id', this.deleteTodo)
  }

  async getAll(req, res, next) {
    try {
      res.send(await todosService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createTodo(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await todosService.createTodo(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editTodo(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      res.send(await todosService.editTodo(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteTodo(req, res, next) {
    try {
      await todosService.deleteTodo(req.params.id, req.userInfo.id)
      res.send('Delorted')
    } catch (error) {
      next(error)
    }
  }
}
