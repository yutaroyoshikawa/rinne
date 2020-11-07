<template>
  <div :class="$style.wrap">
    <p v-if="hasGettedGeoLocation">lng:{{ lng }}/lat:{{ lat }}</p>
    <div ref="map" :class="$style.map"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

type Data = {
  map?: mapboxgl.Map
  lat?: number
  lng?: number
}

export default Vue.extend({
  data(): Data {
    return {
      map: undefined,
      lng: undefined,
      lat: undefined,
    }
  },
  computed: {
    hasGettedGeoLocation(): boolean {
      const existLocation =
        typeof this.lat === 'number' && typeof this.lng === 'number'
      if (existLocation) {
        this.createMap()
      }
      return existLocation
    },
  },
  mounted() {
    this.isAllowedToGeolocation()
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
      if (
        mapRef &&
        typeof this.lat === 'number' &&
        typeof this.lng === 'number'
      ) {
        const map = new mapboxgl.Map({
          container: mapRef,
          style: 'mapbox://styles/chi24601/ckh5sf0y600l419pdxff45jj8',
          center: [this.lng, this.lat],
          zoom: 15,
        })

        const el = document.createElement('div')
        el.className = 'marker'

        new mapboxgl.Marker(el).setLngLat([this.lng, this.lat]).addTo(map)
        this.map = map
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
