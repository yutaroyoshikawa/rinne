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
import 'mapbox-gl/dist/mapbox-gl.css'

type Data = {
  map?: mapboxgl.Map
  lat: number
  lng: number
  dollMarker: {
    type: string
    features: {
      type: string
      geometry: {
        type: string
        coordinates: [number, number]
      }
      properties: {
        title: string
        description: string
      }
    }[]
  }
}

export default Vue.extend({
  data(): Data {
    return {
      map: undefined,
      lng: 139.65031059999998,
      lat: 35.6761919,
      dollMarker: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [139.6605246, 35.579322999999995],
            },
            properties: {
              title: 'Mapbox',
              description: 'Washington, D.C.',
            },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [139.65031059999998, 35.6761919],
            },
            properties: {
              title: 'Mapbox',
              description: 'San Francisco, California',
            },
          },
        ],
      },
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
        const map = new mapboxgl.Map({
          container: mapRef,
          style: 'mapbox://styles/chi24601/ckh5sf0y600l419pdxff45jj8',
          center: [this.lng, this.lat],
          zoom: 13,
        })
        // add markers to map
        this.dollMarker.features.forEach(function (marker) {
          // create a HTML element for each feature
          const el = document.createElement('div')
          el.className = 'marker'

          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map)
        })
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
