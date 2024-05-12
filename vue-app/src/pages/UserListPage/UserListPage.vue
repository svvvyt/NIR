<template>
  <div>
    <h1>User List Page</h1>
    <my-input v-model="searchQuery" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showDialog">Create user</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <user-form @create="createUser" />
    </my-dialog>
    <user-list :users="sortedAndSearchedUsers" @remove="removeUser" v-if="!isUsersLoading"/>
    <my-loader v-else />
    <div v-intersection="lazyLoadUsers" class="observer"></div>
  </div>
</template>

<script>
import axios from 'axios';

import UserForm from "@/components/UserForm.vue";
import UserList from "@/components/UserList.vue";

export default {
  components: {
    UserForm,
    UserList,
  },
  data() {
    return {
      users: [],
      dialogVisible: false,
      isUsersLoading: false,
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'id', text: 'Sort by id' },
        { value: 'name', text: 'Sort by name' },
        { value: 'username', text: 'Sort by username' },
      ],
      searchQuery: '',
    }
  },
  methods: {
    createUser(user) {
      this.users.push(user);
      this.dialogVisible = false;
    },
    removeUser(user) {
      this.users = this.users.filter(u => u.id !== user.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchUsers() {
      try {
        this.isUsersLoading = true;
        const res = await axios.get('https://jsonplaceholder.typicode.com/users', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
        this.users = res.data;
      } catch (err) {
        console.log(`Error fetching users: ${err}`);
      } finally {
        this.isUsersLoading = false;
      }
    },
    async lazyLoadUsers() {
      try {
        this.page += 1;
        const res = await axios.get('https://jsonplaceholder.typicode.com/users', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
        this.users = [...this.users, ...res.data];
      } catch (err) {
        console.log(`Error fetching users: ${err}`);
      }
    }
  },
  mounted() {
    this.fetchUsers();
  },
  computed: {
    sortedUsers() {
      if (this.selectedSort === 'id') {
        return [...this.users].sort((user1, user2) => user1.id - user2.id);
      } else {
        return [...this.users].sort((user1, user2) => {
          return user1[this.selectedSort]?.localeCompare(user2[this.selectedSort]);
        });
      }
    },
    sortedAndSearchedUsers() {
      return this.sortedUsers.filter(user => user.username.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
}
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
}
</style>