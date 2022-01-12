import { dbContext } from '../db/DbContext'
import { BadRequest, UnAuthorized } from '../utils/Errors'
class TodosService {
  async getAll(query = {}) {
    const todos = await dbContext.Todos.find(query).populate('creator', 'name picture')
    return todos
  }

  async createTodo(newTodo) {
    const todo = await dbContext.Todos.create(newTodo)
    if (!todo) {
      throw new BadRequest('Could not create Todo')
    }
    return todo
  }

  async editTodo(todo) {
    const editedTodo = await dbContext.Todos.findOneAndUpdate({ creatorId: todo.creatorId, _id: todo.id }, todo, { new: true })
    if (!editedTodo) {
      throw new BadRequest('Could not edit todo')
    }
    return editedTodo
  }

  async deleteTodo(id, userId) {
    const todo = await dbContext.Todos.findOneAndDelete({ creatorId: userId, _id: id })
    if (!todo) {
      throw new UnAuthorized('Unable to delort todo')
    }
  }
}

export const todosService = new TodosService()
