<template>
  <div :class="[$style.wrap, { [$style.pausedAr]: isPausedAr }]">
    <ActionModal
      :show-action-modal="isOpenDetailsModal"
      modal-title="くわしく"
      @close="onCloseDetailsModal"
      @action="onDeleteImage(selectedImageIndex)"
    >
      <p :class="$style.comment">
        {{ selectedPersonalityComment(imageSrcs[selectedImageIndex]) }}
      </p>
      <img
        :class="$style.detailsImage"
        :src="`/img/${imageSrcs[selectedImageIndex]}`"
        alt="選択した写真"
      />
      <p>この写真を削除しますか？</p>
    </ActionModal>

    <OpacityTransition
      :in="$props.in && !!arMode"
      :enable-page-transition="false"
    >
      <div :class="$style.arWrap">
        <PresenAr
          v-if="arMode === 'presen'"
          :in="$props.in"
          @reality-ready="onRealityReady"
          @reality-error="onRealityError"
          @select-image="onSelectImage"
        />
        <Ar
          v-else-if="arMode === 'nomal'"
          :in="$props.in"
          @reality-ready="onRealityReady"
          @reality-error="onRealityError"
          @select-image="onSelectImage"
        />
        <template v-else>
          <!-- -->
        </template>
      </div>
    </OpacityTransition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { REMOVE_IMAGE } from '@/store/photoStore'
import { LOADEDND_AFRAME, PAUSE_AR, PLAY_AR } from '@/store/ar'
import ActionModal from '@/components/molecule/actionModal.vue'
import personality from '@/assets/personality.json'
import OpacityTransition from '@/components/atoms/transitions/OpacityTransition.vue'

type Data = {
  isOpenDetailsModal: boolean
  selectedImageIndex?: number
}

export default Vue.extend({
  name: 'ArAlbum',
  components: {
    ActionModal,
    Ar: () => import('@/components/molecule/Ar.vue'),
    PresenAr: () => import('@/components/molecule/PresenAr.vue'),
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
    ...mapState('ar', ['arMode', 'isPausedAr']),
    ...mapState('photoStore', ['imageSrcs']),
  },
  mounted() {
    document.addEventListener('visibilitychange', this.disableMediadevices)
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.disableMediadevices)
  },
  methods: {
    disableMediadevices(): void {
      const visibility = document.visibilityState
      if (visibility === 'hidden') {
        if (!this.isPausedAr) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              stream.getVideoTracks().forEach((track) => {
                if (track.enabled) {
                  track.stop()
                }
              })
            })
          this.$store.commit(`ar/${PAUSE_AR}`)
        }
      } else if (visibility === 'visible') {
        if (this.isPausedAr) {
          this.$store.commit(`ar/${PLAY_AR}`)
        }
      }
    },
    onCloseDetailsModal() {
      this.isOpenDetailsModal = false
    },
    onDeleteImage(imageIndex: number) {
      this.$store.commit(`photoStore/${REMOVE_IMAGE}`, imageIndex)
      this.isOpenDetailsModal = false
    },
    onSelectImage(imageIndex: number) {
      this.selectedImageIndex = imageIndex
      this.isOpenDetailsModal = true
    },
    onRealityReady() {
      this.$store.commit(`ar/${LOADEDND_AFRAME}`)
    },
    onRealityError() {
      this.$store.commit(`ar/${LOADEDND_AFRAME}`)
    },
    selectedPersonalityComment(fileName: string): string {
      const selected = personality.find((item) => item.fileName === fileName)
      if (selected) {
        return selected.comment
      }
      return ''
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.wrap {
  transition: filter 0.2s ease;
}

.pausedAr {
  filter: blur(4px);
}

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
  &::before {
    content: '';
    width: 100%;
    height: 80px;
    background: linear-gradient(
      0turn,
      rgba($dark-base-color, 0) 0%,
      rgba($dark-base-color, 0.1) 30%,
      rgba($dark-base-color, 0.2) 50%,
      rgba($dark-base-color, 0.4) 70%,
      $dark-base-color 100%
    );
    position: fixed;
    z-index: 40;
    top: 0;
    left: 0;
  }

  &::after {
    content: '';
    width: 100%;
    height: 80px;
    background: linear-gradient(
      0.5turn,
      rgba($dark-base-color, 0) 0%,
      rgba($dark-base-color, 0.1) 30%,
      rgba($dark-base-color, 0.2) 50%,
      rgba($dark-base-color, 0.4) 70%,
      $dark-base-color 100%
    );
    position: fixed;
    z-index: 40;
    bottom: 0;
    left: 0;
  }
}

.modalWrap {
  position: relative;
  z-index: $modal-zindex;
}

.comment {
  padding: 20px 0;
  text-align: center;
  color: $dark-base-color;
}
</style>
