<template>
  <div>
    <form @submit.prevent>
      <h1>Create user</h1>
      <my-input v-focus v-model="user.name" type="text" placeholder="Name" />
      <my-input v-model="user.username" type="text" placeholder="Username" />
      <my-button @click="createUser" style="align-self: flex-end; margin-top: 15px;">Create</my-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        username: ''
      }
    }
  },
  methods: {
    createUser() {
      this.user.id = Date.now()
      this.$emit('create', this.user)
      this.user = {
        name: '',
        username: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>