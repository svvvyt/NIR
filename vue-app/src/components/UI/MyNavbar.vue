<template>
  <div class="navbar">
    <div class="navbar__btns">
      <my-button @click="$router.push('/users')">Users</my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-navbar'
}
</script>

<style scoped>
.navbar {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns{
  margin-right: auto;
}
</style>