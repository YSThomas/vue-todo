import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    new_todo: '',
    todos: [{ // массив тудушек
        todo: 'Тутшка какая-то',
        complete: false
      },
      {
        todo: 'Тудушка какая-то 2',
        complete: false
      },
      {
        todo: 'Тудушка какая-то 3',
        complete: true
      },
    ]
  },
  mutations: {
    change_new_todo(state) {
      return state.new_todo
    },
    addTodo(state) {
      if (state.new_todo === '') {
        return
      }
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