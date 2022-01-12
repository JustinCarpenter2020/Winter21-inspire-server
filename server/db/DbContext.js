import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { TodoSchema } from '../models/Todo'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Todos = mongoose.model('Todo', TodoSchema)
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
