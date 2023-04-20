import {
  Model
} from '@vuex-orm/core'
import Assignment from './Assignment'
import {
  uuid
} from 'vue-uuid';
export default class Tag extends Model {
  static entity = 'tags'
  static primaryKey = 'id'
  static fields() {
    return {
      id: this.uid(() => uuid.v4()),
      assignment_id: this.string(null).nullable(),
      name: this.string(''),

      assignee: this.belongsTo(Assignment, 'assignment_id')
    }
  }
}