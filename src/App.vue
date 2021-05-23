<template>
  <h1>{{main_title}}</h1>
  <TodosMain />
</template>

<script>
import TodosMain from './components/TodosMain.vue'

export default {
  name: 'App',
  components: {
    TodosMain
  },
  data(){
    return{
      main_title: 'Todos App'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1rem;
}
</style>
