<template>
  <a>
    <button :class="$style.profilebutton">おともだち</button>
  </a>
</template>
<script lang="ts">
export default {
  name: 'ProfileButton',
  data() {
    return {}
  },
}
</script>
<style>
.profilebutton {
  width: 200px; /* 横 */
  height: 40px; /* 高さ */
  border: none;
  border-radius: 30px; /* 丸み */
  background-color: #929d49;
  font-size: 14px;
  color: #f3ebd8;
  text-align: center;
  margin: 0 auto;
  display: block;
}
</style>
