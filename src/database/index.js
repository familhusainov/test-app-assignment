import { Database } from '@vuex-orm/core'
import Assignment  from '@/models/Assignment'
import Tag  from '@/models/Tag'

const database = new Database()

database.register(Assignment)
database.register(Tag)

export default database
