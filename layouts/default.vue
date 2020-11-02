<template>
  <div>
    <header :class="$style.header">
      <HeaderTitle />
    </header>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'destyle.css'
import HeaderTitle from '../components/atoms/HeaderTitle.vue'

export default Vue.extend({
  name: 'App',
  components: {
    HeaderTitle,
  },
})
</script>

<style lang="scss" module>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
