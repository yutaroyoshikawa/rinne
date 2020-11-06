<template>
  <client-only>
    <a-scene
      xrextras-gesture-detector
      xrextras-almost-there
      xrextras-loading
      xrextras-runtime-error
      renderer="colorManagement: true"
      xrweb="disableWorldTracking: true"
    >
      <a-assets>
        <img id="renny" src="/img/0.jpg" />
      </a-assets>
      <a-camera
        position="0 4 10"
        raycaster="objects: .cantap"
        cursor="fuse: false; rayOrigin: mouse;"
      >
      </a-camera>

      <a-light type="directional" intensity="0.5" position="1 1 1"></a-light>

      <a-light type="ambient" intensity="0.7"></a-light>

      <a-entity xrextras-named-image-target="name: renny">
        <a-image src="#renny" />
      </a-entity>
    </a-scene>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'

Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-box',
  'a-ring',
  'a-asset-items',
  'a-assets',
  'a-cursor',
  'a-text',
  'a-light',
]

export default Vue.extend({
  name: 'Presentation',
  created() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'AR')
  },
  beforeDestroy() {
    const XR8 = window.XR8
    if (XR8) {
      if (!XR8.isPaused()) {
        XR8.pause()
      }
    }
  },
  mounted() {
    const XR8 = window.XR8
    if (XR8) {
      if (XR8.isPaused()) {
        XR8.resume()
      }
    }
  },
})
</script>
