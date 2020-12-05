<template>
  <div>
    <Loading v-if="isLoadingMap" />
    <ScaleCircleTransition :in="!isLoadingMap">
      <div ref="map" :class="$style.map"></div>
    </ScaleCircleTransition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import Loading from '@/components/organisms/loading.vue'
import ScaleCircleTransition from '@/components/atoms/transitions/ScaleCircleTransition.vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

type Data = {
  map?: mapboxgl.Map
  isLoadingMap: boolean
}

export default Vue.extend({
  components: {
    Loading,
    ScaleCircleTransition,
  },
  data(): Data {
    return {
      map: undefined,
      isLoadingMap: true,
    }
  },
  watch: {
    isLoadingMap() {
      if (!this.isLoadingMap) {
        setTimeout(() => {
          const map = this.map
          if (map) {
            map.resize()
          }
        }, 50)
      }
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
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const data = position.coords
            const lat = data.latitude
            const lng = data.longitude
            this.createMap(lat, lng)
          },
          () => {
            this.createDefaultMap()
          }
        )
      } else {
        this.createDefaultMap()
      }
    },
    createDefaultMap() {
      const lat = 35.691664
      const lng = 139.696948
      this.createMap(lat, lng)
    },
    createMap(lat: number, lng: number) {
      const mapRef = this.$refs.map as HTMLDivElement | undefined
      const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN
      if (mapboxAccessToken) {
        mapboxgl.accessToken = mapboxAccessToken
      }
      if (mapRef) {
        const map = new mapboxgl.Map({
          container: mapRef,
          style: 'mapbox://styles/chi24601/ckh5sf0y600l419pdxff45jj8',
          center: [lng, lat],
          zoom: 18,
        })

        const el = document.createElement('div')
        el.className = 'marker'

        map.on('data', (event) => {
          if (event.tile) {
            if (event.tile.state === 'loaded') {
              this.isLoadingMap = false
            }
          }
        })

        new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)
        this.map = map
      }
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';
.map {
  width: 100vw;
  height: calc(100vh - #{$header-height});
}
</style>
