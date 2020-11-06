<template>
  <div :class="$style.wrap">
    <div ref="map" :class="$style.map"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import mapboxgl from 'mapbox-gl'

export default Vue.extend({
  data() {
    return {
      map: {},
    }
  },
  mounted() {
    this.createMap()
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'いばしょ')
  },
  methods: {
    createMap() {
      const mapRef = this.$refs.map as HTMLDivElement | undefined
      const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN
      if (mapboxAccessToken) {
        mapboxgl.accessToken = mapboxAccessToken
      }
      if (mapRef) {
        this.map = new mapboxgl.Map({
          container: mapRef,
          style: 'mapbox://styles/chi24601/ckh5sf0y600l419pdxff45jj8',
          center: [139.745451, 35.658577],
          zoom: 15,
        })
      }
    },
  },
})
</script>

<style lang="scss" module>
.map {
  width: 100vw;
  height: 100vh;
}
</style>
