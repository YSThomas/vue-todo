<template>
  <TodoStats />
  <div class="todos">
    <form @submit.prevent='$store.commit("addTodo")'>
      <small style="color: red; font-weight: bold; opacity: 30%;" v-show="$store.state.new_todo.length <= 5">Помните: Дело должно содержать 6 и более символов!</small><br>
      <input autocomplete="off" type="text" name="newTodo" v-model="$store.state.new_todo">
      <button type="submit" name="button">Add</button>
    </form>

    <div class="todos-section">
      <div class="no-todos" v-if="!$store.state.todos.length">
        <span>Дел нет.</span>
      </div>
      <div v-else class="todo-item" v-for="(todo, index) in $store.getters.TODOS">
        <span :class='{completed: todo.complete}' @dblclick='$store.commit("deleteTodo", index)' @click.ctrl="$store.commit('markTaskComplete', index)">{{ todo.todo }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TodoStats from './TodoStats.vue'
import { mapState } from 'vuex'

export default {
  name: 'TodosMain',
  components: {
    TodoStats
  },
  computed:{
    ...mapState(['todos']),
    ...mapState(['all_time_todos'])
  },
  watch:{
    all_time_todos:{
      handler: function(all_time_todos){
        all_time_todos = localStorage.setItem('all_time_todos', JSON.stringify(all_time_todos));
      },
      deep: true
    },
    todos:{
      handler: function(todos) {
        todos = localStorage.setItem('storage-vuex', JSON.stringify(todos));
      },
      deep: true
    }
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
