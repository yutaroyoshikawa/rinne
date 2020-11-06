<template>
  <div :class="$style.wrap">
    <p>lng:{{ lng }}/lat:{{ lat }}</p>
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
      lat: 35.689607,
      lng: 139.700571,
    }
  },
  mounted() {
    this.isAllowedToGeolocation()
    this.createMap()
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'いばしょ')
  },
  methods: {
    isAllowedToGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const data = position.coords
          this.lat = data.latitude
          this.lng = data.longitude
          // alert(`lat${this.lat}/lng${this.lng}`)
        })
      }
    },
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
          center: [this.lng, this.lat],
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
