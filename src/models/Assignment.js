import {
  Model
} from '@vuex-orm/core'
import Tag from './Tag'
import {
  uuid
} from 'vue-uuid';
export default class Assignment extends Model {
  static entity = 'assignments'

  static fields() {
    return {
      id: this.uid(() => uuid.v4()),
      name: this.string(''),
      done: this.boolean(false),
      tags: this.hasMany(Tag, 'assignment_id')
    }
  }
}