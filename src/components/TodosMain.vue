<template>
  <TodoStats />
  <div class="todos">
    <form @submit.prevent='$store.commit("addTodo")'>
      <input autocomplete="off" type="text" name="newTodo" v-model="$store.state.new_todo">
      <button type="submit" name="button">Add</button>
    </form>

    <div class="todos-section">
      <div class="no-todos" v-if="!$store.state.todos.length">
        <span>Дел нет.</span>
      </div>
      <div v-else class="todo-item" v-for="(todo, index) in $store.getters.TODOS">
        <span :class='{completed: todo.complete}' @dblclick='$store.commit("deleteTodo", index)' @click.ctrl="$store.commit('markTaskComplete', index)">{{ todo.todo }}</span>
        <br>
        <small v-if='todo.complete'>V</small>
        <small v-else>X</small>
      </div>
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

div.todo-item span{
  cursor: pointer;
  font-weight: bold;
}

div.todo-item{
  height: 5rem;
  width: auto;
}

.no-todos{
  font-weight: bold;
  color: #eeeee;
  opacity: 30%;
  user-select: none;
}

.completed{
  text-decoration: line-through;
  color: #42b983;
  transition: all 0.5s ease-out;
}

.completed::before{
  content: 'Выполнено';
  color: black;
  opacity: 30%;
  width: 5px;
  height: 5px;
  background-color: #42b983;
}
</style>
