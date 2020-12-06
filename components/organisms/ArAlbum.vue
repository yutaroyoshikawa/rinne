<template>
  <div>
    <div ref="responseTalk" :class="$style.responseTalkWrap">
      <ResponseTalk />
    </div>
    <div>
      <OpacityTransition :in="$props.in" :enable-page-transition="false">
        <template v-if="arMode === 'presen'">
          <PresenAr
            :in="$props.in"
            @reality-ready="onRealityReady"
            @reality-error="onRealityError"
            @select-image="onSelectImage"
          />
        </template>
        <template v-else-if="arMode === 'nomal'">
          <Ar
            :in="$props.in"
            @reality-ready="onRealityReady"
            @reality-error="onRealityError"
            @select-image="onSelectImage"
          />
        </template>
        <template v-else>
          <div></div>
        </template>
      </OpacityTransition>
    </div>

    <div :class="$style.modalWrap">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { REMOVE_IMAGE } from '@/store/photoStore'
import { LOADEDND_AFRAME } from '@/store/ar'
import ActionModal from '@/components/molecule/actionModal.vue'
import ResponseTalk from '@/components/atoms/ResponseTalk.vue'
import Ar from '@/components/molecule/Ar.vue'
import PresenAr from '@/components/molecule/PresenAr.vue'
import OpacityTransition from '@/components/atoms/transitions/OpacityTransition.vue'

type Data = {
  isOpenDetailsModal: boolean
  selectedImageIndex?: number
}

export default Vue.extend({
  name: 'ArAlbum',
  components: {
    ActionModal,
    ResponseTalk,
    Ar,
    PresenAr,
    OpacityTransition,
  },
  props: {
    in: {
      type: Boolean,
      default: true,
    },
  },
  data(): Data {
    return {
      isOpenDetailsModal: false,
      selectedImageIndex: undefined,
    }
  },
  computed: {
    ...mapState('ar', ['arMode']),
    ...mapState('photoStore', ['imageSrcs']),
  },
  methods: {
    onCloseDetailsModal() {
      this.isOpenDetailsModal = false
    },
    onDeleteImage(imageIndex: number) {
      this.$store.commit(`photoStore/${REMOVE_IMAGE}`, imageIndex)
      this.isOpenDetailsModal = false
    },
    onSelectImage(imageIndex: number) {
      alert('selected')
      this.selectedImageIndex = imageIndex
      this.isOpenDetailsModal = true
    },
    onRealityReady() {
      alert('loaded')
      this.$store.commit(`ar/${LOADEDND_AFRAME}`)
    },
    onRealityError() {
      this.$store.commit(`ar/${LOADEDND_AFRAME}`)
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.detailsImage {
  width: 100%;
}

.responseTalkWrap {
  position: fixed;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 41;
}

.arWrap {
  position: relative;
  z-index: 40;
}

.modalWrap {
  position: relative;
  z-index: $modal-zindex;
}
</style>
