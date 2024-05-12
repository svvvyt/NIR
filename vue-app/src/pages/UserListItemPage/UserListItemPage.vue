<template>
  <div>
    <h1>User id = {{ $route.params.id }}</h1>
    <user-list-item :user="user" v-if="!isUserLoading" />
    <my-loader v-else />
  </div>
</template>

<script>
import axios from 'axios';

import UserListItem from '@/components/UserListItem.vue';

export default {
  components: {
    UserListItem
  },
  data() {
    return {
      user: {},
      isUserLoading: false,
    }
  },
  methods: {
    async fetchUser() {
      this.isUserLoading = true;
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${this.$route.params.id}`);
        this.user = res.data;
      } catch (error) {
        console.log(`Error fetching users: ${ err }`);
      } finally {
        this.isUserLoading = false;
      }
    }
  },
  mounted() {
    this.fetchUser();
  }
}
</script>

<style>
  
</style>