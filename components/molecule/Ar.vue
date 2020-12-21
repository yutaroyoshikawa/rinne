<template>
  <div style="height: 100%">
    <ResponseTalk id-name="response" />
    <client-only>
      <a-scene
        ref="scene"
        nomal
        xrweb
        xrextras-gesture-detector
        xrextras-almost-there
        xrextras-runtime-error
        xrextras-tap-recenter
      >
        <a-assets ref="assets">
          <a-asset-item id="elephant-obj" src="/elephant.obj" />
          <a-asset-item id="elephant-mtl" src="/materials.mtl" />
          <!-- <img
            v-for="(imageSrc, index) in imageSrcs"
            :id="`renny${index}`"
            :key="`renny${index}`"
            :src="imageSrc"
          /> -->
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
          scale="0.01 0.01 0.01"
          src="#elephant-obj"
          mtl="#elephant-mtl"
        />

        <!-- <a-entity
          geometry="primitive: box"
          material="shader: html; target: #response"
        ></a-entity> -->

        <!-- <a-entity
          id="ground"
          class="cantap"
          geometry="primitive: box"
          material="color: #ffffff; transparent: true; opacity: 0.0"
          scale="1000 2 1000"
          position="0 -1 0"
        /> -->

        <!-- <a-entity
          gltf-model="#teddyBearModel"
          scale="3 3 3"
          position="0 0 0"
        ></a-entity> -->

        <!-- <a-entity>
          <template> -->
        <!-- <a-plane width="1" height="1" material="src:#talkElement"></a-plane> -->
        <!-- <a-image
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
              @click="onClickImage(index)"
            />
          </template>
        </a-entity> -->
      </a-scene>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import ResponseTalk from '@/components/atoms/ResponseTalk.vue'

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
  isFoundXrimage: boolean
  images: string[]
}

export default Vue.extend({
  name: 'Ar',
  components: {
    ResponseTalk,
  },
  props: {
    in: {
      type: Boolean,
      default: true,
    },
  },
  data(): Data {
    return {
      isFoundXrimage: false,
      images: ['renny', 'renny2', 'renny3'],
    }
  },
  computed: {
    ...mapState('photoStore', ['imageSrcs']),
    ...mapState('ar', ['isLoadedPresentationAframe', 'isPausedAr']),
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
        const onXrimagefound: (ctx: any) => void = () => {
          this.isFoundXrimage = true
        }
        const onXrimagelost: (ctx: any) => void = () => {
          // this.isFoundXrimage = false
        }
        const onRealityReady: (event: any) => void = (event) => {
          this.$emit('reality-ready', event)
        }
        const onRealityError: (error: any) => void = (error) => {
          this.$emit('reality-error', error)
        }
        AFRAME.registerComponent('nomal', {
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
