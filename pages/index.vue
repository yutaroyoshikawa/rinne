<template>
  <div>
    <NotifyModal
      modal-title="エラー"
      :show-notify-modal="isOpenErrorModal"
      @close="onCloseErrorModal"
      @action="onCloseErrorModal"
    >
      <p>{{ errorMessage }}</p>
    </NotifyModal>

    <template>
      <template v-if="!isLoadedAframe">
        <Loading />
      </template>
      <template v-else>
        <div :class="$style.talkWrap">
          <TalkButton :in="!isTalkMode && isEnter" />
        </div>
        <SpeakToText
          :in="isTalkMode && isEnter"
          @error="onError"
          @cancel="onCancelSpeak"
        />
        <div :class="$style.menuWrap">
          <IndexMenu :in="!isTalkMode && isEnter" />
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import {
  ENABLE_PRESEN_MODE,
  ENABLE_NOMAL_MODE,
  ENABLE_TALK_MODE,
  DISABLE_TALK_MODE,
} from '@/store/ar'
import { PageTransitionState } from '@/extentions/pageTransitionState'
import Loading from '@/components/organisms/loading.vue'
import IndexMenu from '@/components/molecule/IndexMenu.vue'
import TalkButton from '@/components/atoms/TalkButton.vue'
import SpeakToText from '@/components/templates/SpeakToText.vue'
import NotifyModal from '@/components/molecule/notifyModal.vue'
import { mapState } from 'vuex'

type Data = {
  isReadyReality: boolean
  isTalkMode: boolean
  errorMessage?: any
  isOpenErrorModal: boolean
}

export default Vue.extend({
  name: 'Top',
  components: {
    Loading,
    IndexMenu,
    TalkButton,
    SpeakToText,
    NotifyModal,
  },
  data(): Data {
    return {
      isReadyReality: false,
      isTalkMode: false,
      errorMessage: undefined,
      isOpenErrorModal: false,
    }
  },
  computed: {
    ...mapState('ar', ['isLoadedAframe']),
    isEnter(): boolean {
      return (
        this.$store.state.pageTransitionState === PageTransitionState.ENTERED ||
        this.$store.state.pageTransitionState === PageTransitionState.ENTERING
      )
    },
  },
  watch: {
    '$route.params'() {
      const talkmodeQuery = this.$route.query.talkmode
      if (!!talkmodeQuery && talkmodeQuery === '1') {
        this.$store.commit(`ar/${ENABLE_TALK_MODE}`)
      } else {
        this.$store.commit(`ar/${DISABLE_TALK_MODE}`)
      }
      this.isTalkMode = !!talkmodeQuery && talkmodeQuery === '1'
    },
  },
  created() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, undefined)
    const talkmodeQuery = this.$route.query.talkmode
    if (talkmodeQuery && talkmodeQuery === '1') {
      this.isTalkMode = true
    }
  },
  beforeCreate() {
    if (typeof window !== 'undefined') {
      const presenParam = this.$route.query.presen
      if (presenParam || presenParam === '1') {
        this.$store.commit(`ar/${ENABLE_PRESEN_MODE}`)
      } else {
        this.$store.commit(`ar/${ENABLE_NOMAL_MODE}`)
      }
    }
  },
  methods: {
    onRealityReady() {
      this.isReadyReality = true
    },
    onRealityError(error: any) {
      const message = this.getErrorMessage(error)
      this.errorMessage = message
      this.isOpenErrorModal = true
    },
    onCancelSpeak() {
      this.$router.push('/')
    },
    onError(error: Error) {
      const message = this.getErrorMessage(error)
      this.errorMessage = message
      this.isOpenErrorModal = true
    },
    getErrorMessage(error: Error) {
      switch (error.message) {
        case 'no input audio data':
          return '聞き取りに失敗しました。'
        case 'No speech result':
          return '聞き取りに失敗しました。'
        default:
          return '予期せぬエラーが発生しました。'
      }
    },
    onCloseErrorModal() {
      this.isOpenErrorModal = false
    },
  },
})
</script>

<style lang="scss" module>
.talkWrap {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  z-index: 10;
}

.menuWrap {
  width: 100%;
  position: fixed;
  bottom: 50px;
  z-index: 10;
}
</style>
