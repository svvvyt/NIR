<template>
  <div v-if="users.length > 0">
    <h1>User list</h1>
    <transition-group name="user-list">
      <user-list-item v-for="user in users" :user="user" :key="user.id" @remove="$emit('remove', user)" />
    </transition-group>
  </div>
  <h3 v-else>User list is empty!</h3>
</template>

<script>
import UserListItem from './UserListItem.vue';

export default {
  components: {
    UserListItem
  },
  props: {
    users: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}

.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.4s ease;
}

.user-list-enter-from,
.user-list-enter-to {
  opacity: 0;
  transform: translateX(130px);
}

.user-list-move {
  transition: transform 0.4s ease;
}
</style>