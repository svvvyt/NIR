<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style>
.btn {
  padding: 10px;
  background: none;
  cursor: pointer;
  color: teal;
  border: 1px solid teal;
}
</style>