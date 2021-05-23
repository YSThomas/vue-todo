import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    new_todo: '',
    all_time_todos: 0,
    todos: []
  },
  mutations: {
    change_new_todo(state) {
      return state.new_todo
    },
    deleteCompleted(state) {
      for (let i = state.todos.length - 1; i >= 0; i--)
        if (state.todos[i].complete) {
          state.todos.splice(i, 1)
        }
    },
    deleteAll(state) {
      state.todos = []
    },
    addTodo(state) {
      if (state.new_todo === '') {
        return
      }
      state.all_time_todos += 1
      state.todos.push({
        todo: state.new_todo,
        complete: false
      })
      state.new_todo = ''
    },
    deleteTodo(state, index) {
      state.todos.splice(index, 1)
    },
    markTaskComplete(state, index) {
      state.todos[index].complete = !state.todos[index].complete
    }
  },
  modules: {},
  actions: {},
  getters: {
    TODOS(state) {
      return state.todos
    },
    TODOS_COMPLETED(state) {
      return state.todos.filter(el => el.completed)
    },
    TODOS_ACTIVE(state) {
      return state.todos.filter(el => !el.completed)
    },
    ALL_TIME_TODOS_COUNT(state) {
      let todoSpell = ''
      if (state.all_time_todos === 1) {
        todoSpell = 'дело'
      } else if (state.all_time_todos <= 4) {
        todoSpell = 'дела'
      } else {
        todoSpell = 'дел'
      }
      return state.all_time_todos === 0 ? 'Добавьте cвое первое дело.' : `Всего было записано ${state.all_time_todos} ${todoSpell}`
    },
    TODOS_LEFT(state) {
      let todoSpell = ''
      if (state.todos.length === 1) {
        todoSpell = 'дело'
      } else if (state.todos.length <= 4) {
        todoSpell = 'дела'
      } else {
        todoSpell = 'дел'
      }
      return state.todos === 0 ? 'Либо дела все сделаны, либо не назначены! Добавьте новое дело.' : `Осталось ${state.todos.length} ${todoSpell}`
    }
  }
})