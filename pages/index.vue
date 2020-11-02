<template>
  <div :class="$style.container">
    <div>
      <Logo />
      <h1 :class="$style.title">HOME</h1>
      <div :class="$style.links">
        <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer">
          <Button color="green">Documentation</Button>
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>GitHub</Button>
        </a>
        <a href="./cameraRool">camera roll</a>
      </div>
    </div>
    <ListButton />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '../components/atoms/button.vue'
import ListButton from '../components/atoms/listButton.vue'

export default Vue.extend({
  components: {
    Button,
    ListButton,
  },
})
</script>

<style lang="scss" module>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
