<template>
  <div class="stats">
    <div class="all-time-stats">
      <span>{{$store.getters.ALL_TIME_TODOS_COUNT}}</span>
    </div>
    <div v-show='$store.state.todos.length'>
      {{$store.getters.TODOS_LEFT}}
      <br>
      <small>Ctrl + Клик - отметить задачу как выполненную. Двойной клик - удалить</small>
    </div>
    <div class="options">
      <button type="button" name="btnDeleteCompleted" @click="$store.commit('deleteCompleted')">Удалить все выполненные</button>
      <button type="button" name="btnDeleteAll" @click="$store.commit('deleteAll')">Удалить все задачи</button>
    </div>
  </div>

</template>

<script>


export default {
  name: 'TodoStats',
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
