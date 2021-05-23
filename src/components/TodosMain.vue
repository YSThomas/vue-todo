<template>
  <TodoStats />
  <div class="todos">
    <form @submit.prevent='$store.commit("addTodo")'>
      <input autocomplete="off" type="text" name="newTodo" v-model="$store.state.new_todo">
      <button type="submit" name="button">Add</button>
    </form>

    <div class="todo-item" v-for="(todo, index) in $store.getters.TODOS" @dblclick='$store.commit("deleteTodo", index)' @click.ctrl="$store.commit('markTaskComplete', index)" >
      <h3>{{index + 1}}: {{ todo.todo }}</h3>
      <small v-if='todo.complete'>v</small>
      <small v-else>x</small>
    </div>
  </div>
</template>

<script>
import TodoStats from './TodoStats.vue'

export default {
  name: 'TodosMain',
  components: {
    TodoStats
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
form{
  padding: 1rem 0;
}
</style>
