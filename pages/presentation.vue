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
        <img id="renny" src="/img/logo.jpg" />
      </a-assets>
      <a-camera
        position="0 4 10"
        raycaster="objects: .cantap"
        cursor="fuse: false; rayOrigin: mouse;"
      >
      </a-camera>

      <a-light type="directional" intensity="0.5" position="1 1 1"></a-light>

      <a-light type="ambient" intensity="0.7"></a-light>

      <a-entity xrextras-named-image-target="name=renny">
        <a-box material="color: #00EDAF;" shadow> </a-box>
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
      if (XR8.isPaused()) {
        XR8.resume()
      }
    }
  },
  mounted() {
    const XR8 = window.XR8
    if (XR8) {
      if (!XR8.isPaused()) {
        XR8.pouse()
      }
    }
  },
  head() {
    return {
      script: [
        {
          src: `https://apps.8thwall.com/xrweb?appKey=fUrl6WdhBUffUtk8YD5m6ABkVqzJYFjJXV1WSG3npsGoVBiTvo0hIAX824SS5qs3KU45gF`,
        },
        {
          src: 'https://cdn.8thwall.com/web/aframe/8frame-0.9.2.min.js',
        },
      ],
    }
  },
})
</script>
