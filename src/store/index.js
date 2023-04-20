import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from '@/database'
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
})

export default store