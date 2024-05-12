<template>
  <div class="user">
    <div>
      <div>id: {{ user.id }}</div>
      <div>Name: {{ user.name }}</div>
      <div>Username: {{ user.username }}</div>
    </div>
    <div class="user__btns">
      <my-button @click="$router.push(`/users/${user.id}`)">Go to user</my-button>
      <my-button @click="$emit('remove', user)">Delete user</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.user {
  margin: 15px;
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user__btns {
  display: flex;
}
</style>