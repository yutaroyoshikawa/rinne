<template>
  <div>
    <AlbamModal
      v-if="selectedAlbamPosition"
      :in="isOpenDetailsModal"
      :src="
        albamPositions[
          `${selectedAlbamPosition[0]},${selectedAlbamPosition[1]}`
        ].value
      "
      @close="onCloseDetailsModal"
      @remove-image="() => onDeleteImage(selectedAlbamPosition)"
    />
    <ResponseTalk v-show="$props.in" id-name="response" />
    <div :class="[$style.wrap, { [$style.pausedAr]: isPausedAr }]">
      <OpacityTransition
        :in="$props.in && !!arMode"
        :enable-page-transition="false"
      >
        <div :class="$style.arWrap" />
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
      </OpacityTransition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import {
  LOADEDND_AFRAME,
  PAUSE_AR,
  PLAY_AR,
  REQUEST_REMOVE_ALBAM_IMAGE,
} from '@/store/ar'
import ResponseTalk from '@/components/atoms/ResponseTalk.vue'
import OpacityTransition from '@/components/atoms/transitions/OpacityTransition.vue'

type Data = {
  isOpenDetailsModal: boolean
  selectedAlbamPosition?: [number, number]
}

export default Vue.extend({
  name: 'ArAlbum',
  components: {
    AlbamModal: () => import('@/components/organisms/AlbamModal.vue'),
    Ar: () => import('@/components/molecule/Ar.vue'),
    PresenAr: () => import('@/components/molecule/PresenAr.vue'),
    OpacityTransition,
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
      isOpenDetailsModal: false,
      selectedAlbamPosition: undefined,
    }
  },
  computed: {
    ...mapState('ar', ['arMode', 'isPausedAr']),
    ...mapState('photoStore', ['albamPositions']),
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
    onDeleteImage(albamPosition: [number, number]) {
      this.$store.dispatch(`ar/${REQUEST_REMOVE_ALBAM_IMAGE}`, albamPosition)
      this.isOpenDetailsModal = false
    },
    onSelectImage(albamPosition: [number, number]) {
      this.selectedAlbamPosition = albamPosition
      this.isOpenDetailsModal = true
    },
    onRealityReady() {
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
    z-index: $top-menu-zindex - 1;
    top: 0;
    left: 0;
    pointer-events: none;
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
    z-index: $top-menu-zindex - 1;
    bottom: 0;
    left: 0;
    pointer-events: none;
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
