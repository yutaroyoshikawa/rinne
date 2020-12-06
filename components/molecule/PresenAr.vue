<template>
  <div>
    <client-only>
      <a-scene
        ref="scene"
        presenar
        xrextras-gesture-detector
        xrextras-almost-there
        xrextras-runtime-error
        renderer="colorManagement: true"
        xrweb="disableWorldTracking: true"
      >
        <a-assets ref="assets">
          <img
            v-for="(imageSrc, index) in imageSrcs"
            :id="`renny${index}`"
            :key="`renny${index}`"
            :src="imageSrc"
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

        <a-entity xrextras-named-image-target="name: renny">
          <template v-if="isFoundXrimage">
            <a-plane width="1" height="1" material="src:#talkElement"></a-plane>
            <a-image
              v-for="(imageSrc, index) in imageSrcs"
              :key="imageSrc"
              class="cantap"
              name="rennyImage"
              :src="`#renny${index}`"
              scale="0.0001 0.0001 0.0001"
              :animation="{
                property: 'scale',
                to: '0.9 0.9 0.9',
                easing: 'easeOutElastic',
                dur: 3000,
                delay: 300 * index - 1,
              }"
              :animation__2="{
                property: 'position',
                to: `${index - 1} 0 0.3`,
                easing: 'easeOutElastic',
                dur: 3000,
                delay: 300 * index,
              }"
              @click.self="onClickImage(index)"
            />
          </template>
        </a-entity>
      </a-scene>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import html2canvas from 'html2canvas'
import { mapState } from 'vuex'

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
  'a-image',
]

type Data = {
  isFoundXrimage: boolean
  isTapImage: boolean
  images: string[]
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
      images: ['renny', 'renny2', 'renny3'],
    }
  },
  computed: {
    ...mapState('photoStore', ['imageSrcs']),
    ...mapState('ar', ['isLoadedPresentationAframe']),
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
      this.$emit('selectImage', imageIndex)
    },
    initAframe() {
      const AFRAME = window.AFRAME
      if (AFRAME) {
        const onXrimagefound: (ctx: any) => void = () => {
          this.isFoundXrimage = true
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
