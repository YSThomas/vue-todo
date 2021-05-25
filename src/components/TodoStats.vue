<template>
  <div class="stats">
    <div class="all-time-stats">
      <span>{{getAllTimeTodosCount}}</span>
    </div>
    <div v-show='getTodos.length'>
      {{todosLeft}}
      <br>
      <small>Ctrl + Клик - отметить задачу как выполненную. Двойной клик - удалить</small>
    </div>
    <div class="options">
      <button type="button" name="btnDeleteCompleted" @click="deleteAllCompleted()">Удалить все выполненные</button>
      <button type="button" name="btnDeleteAll" @click="deleteAllTodos()">Удалить все задачи</button>
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodoStats',
  computed:{
    ...mapState(['todos', 'all_time_todos']),
    ...mapGetters(['todosLeft', 'getTodos', 'getAllTimeTodosCount']),
  },
  methods:{
    ...mapActions(['deleteAllTodos', 'deleteAllCompleted']),
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

small{
  color: #42b983;
  font-weight: bolder;
}

div.stats div.options{

}
</style>
