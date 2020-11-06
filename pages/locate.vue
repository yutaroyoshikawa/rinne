<template>
  <div>
    <div ref="map"></div>
    <!-- <p>token→{{ token }}</p> -->
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
      console.log(mapboxAccessToken)
      if (mapboxAccessToken) {
        mapboxgl.accessToken = mapboxAccessToken
      }
      if (mapRef) {
        this.map = new mapboxgl.Map({
          container: mapRef,
          style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
          center: [143.767125, 38.681236], // starting position [lng, lat]
          zoom: 5, // starting zoom
        })
      }
    },
  },
})
</script>

<style lang="scss" module>
#map {
  width: 100%;
  height: 100px;
}
</style>
