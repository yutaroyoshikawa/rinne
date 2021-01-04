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
      <Loading :in="closeSplash && !isLoadedAframe" />
      <template v-if="closeSplash && isLoadedAframe">
        <SpeakToText
          :in="talkMode && isEnter"
          @error="onError"
          @cancel="onCancelSpeak"
        />
        <portal to="other">
          <div :class="$style.talkWrap">
            <TalkButton :in="!talkMode && isEnter" @click="onToggleTalkMode" />
          </div>
          <div :class="$style.menuWrap">
            <IndexMenu :in="!talkMode && isEnter" />
          </div>
        </portal>
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
import NotifyModal from '@/components/molecule/notifyModal.vue'
import { mapState } from 'vuex'

type Data = {
  isReadyReality: boolean
  errorMessage?: any
  isOpenErrorModal: boolean
  isShowSpeakToText: boolean
}

let timer: ReturnType<typeof setTimeout>

export default Vue.extend({
  name: 'Top',
  components: {
    Loading,
    IndexMenu,
    TalkButton,
    SpeakToText: () => import('@/components/templates/SpeakToText.vue'),
    NotifyModal,
  },
  data(): Data {
    return {
      isReadyReality: false,
      errorMessage: undefined,
      isOpenErrorModal: false,
      isShowSpeakToText: false,
    }
  },
  computed: {
    ...mapState('ar', ['isLoadedAframe', 'talkMode']),
    ...mapState(['closeSplash']),
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
    },
  },
  created() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, undefined)
    const talkmodeQuery = this.$route.query.talkmode
    if (talkmodeQuery && talkmodeQuery === '1') {
      this.$store.commit(`ar/${ENABLE_TALK_MODE}`)
      this.isShowSpeakToText = true
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
  beforeDestroy() {
    if (timer) {
      clearTimeout(timer)
    }
  },
  methods: {
    onToggleTalkMode() {
      timer = setTimeout(
        () => (this.isShowSpeakToText = !this.isShowSpeakToText),
        600
      )
    },
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
      this.onToggleTalkMode()
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
@import '@/assets/scss/variables.scss';

.talkWrap {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 25px;
  z-index: $top-menu-zindex;
}

.menuWrap {
  width: 100%;
  position: fixed;
  bottom: 25px;
  z-index: $top-menu-zindex;
}
</style>
