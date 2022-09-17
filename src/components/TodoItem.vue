<template>
  <div>{{ todo.text }}</div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      id: Number,
      text: String
    }
  }
};
</script>

<style scoped>

</style>