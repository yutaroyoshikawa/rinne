<template>
  <client-only>
    <a-scene
      ref="scene"
      normal
      xrweb
      xrextras-gesture-detector
      xrextras-almost-there
      xrextras-runtime-error
      xrextras-tap-recenter
    >
      <a-assets ref="assets">
        <a-asset-item id="elephant-obj" src="/3dmodel/elephant.obj" />
        <a-asset-item id="elephant-mtl" src="/3dmodel/materials.mtl" />
        <img
          v-for="(imageSrc, index) in imageSrcs"
          :id="`renny${index}`"
          :key="`renny${index}`"
          :src="`/img/${imageSrc}`"
        />
      </a-assets>
      <a-camera
        position="0 4 10"
        raycaster="objects: .cantap"
        cursor="fuse: false; rayOrigin: mouse;"
      >
      </a-camera>

      <a-light type="directional" intensity="0.5" position="1 1 1"></a-light>

      <a-light type="ambient" intensity="0.7"></a-light>

      <a-obj-model
        scale="0.1 0.1 0.1"
        src="#elephant-obj"
        mtl="#elephant-mtl"
      />

      <a-entity>
        <a-entity
          geometry="primitive: plane; width: 2; height: 0.4"
          scale="1 1 1"
          material="shader: html; target: #response; transparent: true; ratio: width; fps: 1.5"
          position="0 3 0"
        />
        <a-image
          v-for="(imageSrc, index) in imageSrcs"
          :key="imageSrc"
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
            to: !talkMode ? `${index - 1} 0 3` : '0.0001 0.0001 0.0001',
            easing: 'easeOutElastic',
            dur: 3000,
            delay: 300 * index,
          }"
          @click="$emit('select-image', index)"
        />
      </a-entity>
    </a-scene>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

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
  'a-gltf-model',
]

type Data = {
  isTapImage: boolean
}

export default Vue.extend({
  name: 'Ar',
  props: {
    in: {
      type: Boolean,
      default: true,
    },
  },
  data(): Data {
    return {
      isTapImage: false,
    }
  },
  computed: {
    ...mapState('photoStore', ['imageSrcs']),
    ...mapState('ar', [
      'isLoadedPresentationAframe',
      'isLoadingTalkResponseText',
      'isPausedAr',
      'talkResponseText',
      'talkMode',
    ]),
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
      handler(value) {
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
    // const talkEl = this.$refs.responseTalk as HTMLDivElement
    // const canvas = await html2canvas(talkEl)
    // canvas.id = 'talkElement'
    // const assetsEl = this.$refs.assets as HTMLElement
    // assetsEl.appendChild(canvas)
  },
  methods: {
    onClickImage(imageIndex: number) {
      this.$emit('select-image', imageIndex)
    },
    initAframe() {
      const AFRAME = window.AFRAME
      if (AFRAME) {
        const onRealityReady: (event: any) => void = (event) => {
          this.$emit('reality-ready', event)
        }
        const onRealityError: (error: any) => void = (error) => {
          this.$emit('reality-error', error)
        }
        AFRAME.registerComponent('normal', {
          init() {
            this.el.sceneEl.addEventListener('realityready', onRealityReady)
            this.el.sceneEl.addEventListener('realityerror', onRealityError)
          },
        })
      }
    },
  },
})
</script>
