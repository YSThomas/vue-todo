import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    all_time_todos: JSON.parse(localStorage.getItem('all_time_todos')) || 0,
    todos: JSON.parse(localStorage.getItem('storage-vuex')) || [],
    visibility: ''
  },
  mutations: { // ADD_SOMETHING, REMOVE_SOMETHING, SET_SOMETHING
    SET_VISIBILITY(state, hash) {
      state.visibility = hash
    },
    REMOVE_COMPLETED_TODOS(state, array) {
      state.todos = array
    },
    SET_STORAGE(state) { // сохранение изменений в локальное хранилище
      localStorage.setItem('all_time_todos', JSON.stringify(state.all_time_todos));
      localStorage.setItem('storage-vuex', JSON.stringify(state.todos));
    },
    REMOVE_ALL_TODOS(state) { // удаление всех записей
      state.todos = []
    },
    ADD_TODO(state, task) { //добавление новой записи
      task = task.trim()
      if (task.length <= 5) {
        return
      }
      state.all_time_todos += 1
      state.todos.push({
        _id: state.all_time_todos,
        todo: task,
        complete: false
      })
    },
    REMOVE_TODO(state, id) { // удаление одной записи
      let index = state.todos.findIndex(todo => todo._id === id)
      state.todos.splice(index, 1)
    },
    SET_TASK_COMPLETED(state, id) { // пометить задачу как завершенную/не завершенную
      let index = state.todos.findIndex(todo => todo._id === id)
      state.todos[index].complete = !state.todos[index].complete
    }
  },
  modules: {},
  actions: {
    setVisibility({
      commit
    }) {
      commit('SET_VISIBILITY', window.location.hash.replace(/#\/?/, "") || 'all')
    },
    addNewTodo({
      commit
    }, task) {
      commit('ADD_TODO', task)

      commit('SET_STORAGE')
    },
    deleteTodo({ //удаление тудушки
      commit
    }, id) {
      commit('REMOVE_TODO', id)

      commit('SET_STORAGE')
    },
    deleteAllTodos({
      commit
    }) {
      commit('REMOVE_ALL_TODOS')

      commit('SET_STORAGE')
    },
    taskComplete({
      commit
    }, id) {
      commit('SET_TASK_COMPLETED', id)

      commit('SET_STORAGE')
    },
    deleteAllCompleted({
      commit,
      state
    }) {
      let array = state.todos.filter(el => !el.complete)
      commit('REMOVE_COMPLETED_TODOS', array)

      commit('SET_STORAGE')
    }
  },
  getters: { // getSomething, isSomething
    getVisibility(state) {
      return state.visibility
    },
    getTodos(state) {
      return state.todos
    },
    getTodosCompleted(state) {
      return state.todos.filter(el => el.complete)
    },
    getTodosActive(state) {
      return state.todos.filter(el => !el.complete)
    },
    getAllTimeTodosCount(state) {
      return state.all_time_todos === 0 ? 'Добавьте cвое первое дело.' : `Было записей всего: ${state.all_time_todos}`
    },
    todosLeft(state) {
      return state.todos === 0 ? 'Либо дела все сделаны, либо не назначены! Добавьте новое дело.' : `Дел осталось: ${state.todos.length}`
    }
  }
})