<template>
  <label for="inputText">{{ inputText }}</label>
  <hr>
  <input type="text" v-model="inputText" id="inputText">
</template>

<script>
export default {
  name: 'TodoForm',
  data() {
    return {
      inputText: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
