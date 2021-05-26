<template>
  <TodoStats />
  <div onmouseup="return false" onselectstart="return false" class="todos" @onhashchange='onHashChange()'>
    <form @submit.prevent='addTodo()'>
      <small style="color: red; font-weight: bold; opacity: 30%;" v-show="new_todo.length <= 5">Помните: Дело должно содержать 6 и более символов!</small><br>
      <input autocomplete="off" type="text" name="newTodo" v-model="new_todo">
      <button type="submit" name="button">Add</button>
    </form>

    <!-- Тут попробую сделать фильтры -->
    <ul v-show='getTodos.length' class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibility == 'all' }">Все</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibility == 'active' }"
              >Активные</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibility == 'completed' }"
              >Выполненные</a
            >
          </li>
        </ul>

    <div class="todos-section">
      <div class="no-todos" v-if="!getTodos.length">
        <span>Дел нет.</span>
      </div>

      <div v-else-if="visibility === 'active' " class="todo-item" v-for="(todo, index) in getTodosActive">
        <span :class='{completed: todo.complete}' :key='todo._id' @dblclick='deleteTodo(todo._id)' @click.ctrl="taskComplete(todo._id)">{{ todo.todo }}</span>
      </div>

      <div v-else-if="visibility === 'completed' " class="todo-item" v-for="(todo, index) in getTodosCompleted">
        <span :class='{completed: todo.complete}' :key='todo._id' @dblclick='deleteTodo(todo._id)' @click.ctrl="taskComplete(todo._id)">{{ todo.todo }}</span>
      </div>

      <div v-else class="todo-item" v-for="(todo, index) in getTodos">
        <span :class='{completed: todo.complete}' :key='todo._id' @dblclick='deleteTodo(todo._id)' @click.ctrl="taskComplete(todo._id)">{{ todo.todo }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import TodoStats from './TodoStats.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodosMain',
  components: {
    TodoStats
  },
  data: function () {
    return {
      new_todo: '',
      visibility: window.location.hash.replace(/#\/?/, "") || 'all'
    }
  },
  computed:{
    ...mapGetters(['getTodos', 'getTodosCompleted', 'getTodosActive']),
  },
  methods:{
    ...mapActions(['addNewTodo', 'deleteTodo', 'taskComplete']),

    addTodo(){
      this.addNewTodo(this.new_todo)
      if(this.new_todo.length > 5){
        this.new_todo = ''
      }
    }
  },
  created: function(){
    window.addEventListener('hashchange', ()=>{
      this.visibility = window.location.hash.replace(/#\/?/, "")
    })
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
  color: #42b983;
  background-color: #abffd9;
  transition: all 0.5s ease-out;
}

.completed::before{
  content: '👌';
  color: black;
  opacity: 30%;
  background-color: #42b983;
}

.selected{
  font-weight: bold;
}
</style>
