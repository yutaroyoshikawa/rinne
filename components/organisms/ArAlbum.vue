<template>
  <div>
    <div :class="$style.responseTalkWrap">
      <ResponseTalk />
    </div>
    <client-only>
      <a-scene
        presenar
        xrextras-gesture-detector
        xrextras-almost-there
        xrextras-runtime-error
        renderer="colorManagement: true"
        xrweb="disableWorldTracking: true"
      >
        <a-assets>
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
                to: `${index - 1} ${isTapImage ? 0.3 : 0} 0.3`,
                easing: 'easeOutElastic',
                dur: 3000,
                delay: 300 * index,
              }"
              @click="onClickImage(index)"
            />
          </template>
        </a-entity>
      </a-scene>
    </client-only>
    <ActionModal
      :show-action-modal="isOpenDetailsModal"
      modal-title="くわしく"
      @close="onCloseDetailsModal"
      @action="onDeleteImage(selectedImageIndex)"
    >
      <img
        :class="$style.detailsImage"
        :src="imageSrcs[selectedImageIndex]"
        alt="選択した写真"
      />
      <p>この写真を削除しますか？</p>
    </ActionModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { LOADEDND_PRESENTATION_AFRAME } from '@/store/ar'
import { REMOVE_IMAGE } from '@/store/photoStore'
import ActionModal from '@/components/molecule/actionModal.vue'
import ResponseTalk from '@/components/atoms/ResponseTalk.vue'

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
  isOpenDetailsModal: boolean
  selectedImageIndex?: number
}

export default Vue.extend({
  name: 'ArAlbum',
  components: {
    ActionModal,
    ResponseTalk,
  },
  data(): Data {
    return {
      isFoundXrimage: false,
      isTapImage: false,
      images: ['renny', 'renny2', 'renny3'],
      isOpenDetailsModal: false,
      selectedImageIndex: undefined,
    }
  },
  computed: {
    ...mapState('photoStore', ['imageSrcs']),
    ...mapState('ar', ['isLoadedPresentationAframe']),
  },
  mounted() {
    setTimeout(() => {
      this.$emit('reality-ready')
    }, 3000)
    if (!this.isLoadedPresentationAframe) {
      this.initAframe()
      this.$store.commit(`ar/${LOADEDND_PRESENTATION_AFRAME}`)
    }
  },
  methods: {
    onClickImage(imageIndex: number) {
      this.selectedImageIndex = imageIndex
      this.isOpenDetailsModal = true
      this.isTapImage = true
    },
    onCloseDetailsModal() {
      this.isOpenDetailsModal = false
    },
    onDeleteImage(imageIndex: number) {
      this.$store.commit(`photoStore/${REMOVE_IMAGE}`, imageIndex)
      this.isOpenDetailsModal = true
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

<style lang="scss" module>
.detailsImage {
  width: 100%;
}

.responseTalkWrap {
  position: fixed;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 50;
}
</style>
