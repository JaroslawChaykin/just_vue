<template>
  <TodoForm msg="Hello component"  />
  <TodoItem
    v-for="todo in todos"
    v-bind:key="todo.id"
    v-bind:todo="todo"
  />
</template>

<script>
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem';

export default {
  data() {
    return {
      todos: [
        {id: 0, text: 'Изучить JavaScript'},
        {id: 1, text: 'Изучить Vue'},
        {id: 2, text: 'Создать что-нибудь классное'}
      ]
    };
  },
  methods: {

  },
  components: {
    TodoForm,
    TodoItem
  }
};
</script>

<style>
input {
  margin-bottom: 20px;
}

span {
  cursor: pointer;
}
</style>
