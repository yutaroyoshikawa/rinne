<template>
  <client-only>
    <a-scene
      ref="scene"
      presenar
      update-html
      xrextras-gesture-detector
      xrextras-almost-there
      xrextras-runtime-error
      xrextras-tap-recenter
      renderer="colorManagement: true"
      xrweb="disableWorldTracking: true"
    >
      <a-assets ref="assets">
        <img
          v-for="(item, index) in renderImages"
          :id="`renny${index}`"
          :key="`renny${index}`"
          :src="`/img/${item.value}`"
        />
      </a-assets>
      <a-camera
        position="0 4 10"
        raycaster="objects: .cantap"
        cursor="fuse: false; rayOrigin: mouse;"
      />

      <a-light type="directional" intensity="0.5" position="1 1 1"></a-light>

      <a-light type="ambient" intensity="0.7"></a-light>

      <template v-if="closeSplash">
        <a-entity
          ref="talkMessage"
          geometry="primitive: plane; width: 2; height: 0.4"
          scale="1 1 1"
          :animation="{
            property: 'scale',
            to: talkMode ? '1 1 1' : '0.0001 0.0001 0.0001',
            easing: 'easeOutElastic',
            dur: 3000,
          }"
          material="shader: html; target: #response; transparent: true; ratio: width; fps: 1.0"
          position="0 5 0"
        />

        <a-entity xrextras-named-image-target="name: rinne-device">
          <template v-if="isFoundXrimage">
            <a-image
              v-for="(item, index) in renderImages"
              :key="`${item.value}${index}`"
              class="cantap"
              name="rennyImage"
              :src="`#renny${index}`"
              scale="0.0001 0.0001 0.0001"
              :animation="{
                property: 'scale',
                to: !talkMode ? '0.9 0.9 0.9' : '0.0001 0.0001 0.0001',
                easing: 'easeOutElastic',
                dur: 3000,
                delay: 300 * index - 1,
              }"
              :animation__2="{
                property: 'position',
                to: !talkMode
                  ? `${item.position[0] - 2} ${item.position[1]} 0.4`
                  : '0.0001 0.0001 0.0001',
                easing: 'easeOutElastic',
                dur: 3000,
                delay: 300 * index,
              }"
              @click="$emit('select-image', item.position)"
            />
          </template>
        </a-entity>
      </template>
    </a-scene>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { PhotoStore } from '@/store/photoStore'

Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-box',
  'a-ring',
  'a-asset-item',
  'a-assets',
  'a-cursor',
  'a-text',
  'a-light',
  'a-image',
  'a-plane',
  'a-obj-model',
]

type Data = {
  isFoundXrimage: boolean
  isTapImage: boolean
}

export default Vue.extend({
  name: 'PresenAr',
  props: {
    in: {
      type: Boolean,
      default: true,
    },
  },
  data(): Data {
    return {
      isFoundXrimage: false,
      isTapImage: false,
    }
  },
  computed: {
    ...mapState('ar', [
      'isLoadedPresentationAframe',
      'isLoadingTalkResponseText',
      'isPausedAr',
      'talkResponseText',
      'talkMode',
    ]),
    ...mapState(['closeSplash']),
    renderImages(): {
      position: [number, number]
      src: string
    }[] {
      const arraied = Object.values(
        (this.$store.state.photoStore as PhotoStore).albamPositions
      )

      return (arraied.filter(
        (item) => typeof item !== 'undefined'
      ) as unknown) as {
        position: [number, number]
        src: string
      }[]
    },
  },
  watch: {
    in: {
      immediate: true,
      handler() {
        const XR8 = window.XR8
        const sceneRef = this.$refs.scene as any
        if (!XR8 || !sceneRef) {
          return
        }
        if (this.$props.in) {
          if (XR8.isPaused()) {
            sceneRef.play()
          }
        } else {
          sceneRef.pause()
        }
      },
    },
    isPausedAr: {
      immediate: false,
      handler(value: boolean) {
        const XR8 = window.XR8
        const sceneRef = this.$refs.scene as any
        if (!XR8 || !sceneRef) {
          return
        }
        if (value) {
          sceneRef.pause()
        } else if (XR8.isPaused()) {
          sceneRef.play()
        }
      },
    },
  },
  mounted() {
    this.initAframe()
  },
  methods: {
    initAframe() {
      const AFRAME = window.AFRAME
      if (AFRAME) {
        const onXrimagefound: (ctx: any) => void = ({ detail }) => {
          this.isFoundXrimage = true
          const talkMessageEl = this.$refs.talkMessage as Element | undefined
          if (talkMessageEl) {
            talkMessageEl.setAttribute(
              'position',
              `${detail.position.x} ${detail.position.y + 6} ${
                detail.position.z
              }`
            )
            talkMessageEl.setAttribute(
              'rotation',
              `${detail.rotation.x} ${detail.rotation.y} ${detail.rotation.z}`
            )
          }
        }
        const onXrimageupdated: (ctx: any) => void = ({ detail }) => {
          const talkMessageEl = this.$refs.talkMessage as Element | undefined
          if (talkMessageEl) {
            talkMessageEl.setAttribute(
              'position',
              `${detail.position.x} ${detail.position.y + 6} ${
                detail.position.z
              }`
            )
            talkMessageEl.setAttribute(
              'rotation',
              `${detail.rotation.x} ${detail.rotation.y} ${detail.rotation.z}`
            )
          }
        }
        const onXrimagelost: (ctx: any) => void = () => {
          this.isFoundXrimage = false
        }
        const onRealityReady: (event: any) => void = (event) => {
          this.$emit('reality-ready', event)
        }
        const onRealityError: (error: any) => void = (error) => {
          this.$emit('reality-error', error)
        }
        AFRAME.registerComponent('presenar', {
          init() {
            this.el.sceneEl.addEventListener('xrimagefound', onXrimagefound)
            this.el.sceneEl.addEventListener('xrimageupdated', onXrimageupdated)
            this.el.sceneEl.addEventListener('xrimagelost', onXrimagelost)
            this.el.sceneEl.addEventListener('realityready', onRealityReady)
            this.el.sceneEl.addEventListener('realityerror', onRealityError)
          },
        })
      }
    },
  },
})
</script>
