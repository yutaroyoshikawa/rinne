<template>
  <transition
    :enter-class="$style.enter"
    :enter-to-class="$style.enterTo"
    :leave-class="$style.leave"
    :leave-to-class="$style.leaveTo"
    :enter-active-class="$style.enterActive"
    :leave-active-class="$style.leaveActive"
  >
    <div v-if="show" :class="$style.splash">
      <div>
        <div :class="$style.logoWrap">
          <div :class="$style.scaleWrap">
            <Logo
              :repeat-animation="false"
              :show-logo-type="true"
              :logo-type-delay="1300"
            />
          </div>
        </div>
        <div v-if="isTop">
          <p :class="$style.message">
            <nobr>
              サービスの利用にモーションセンサーの<wbr />アクセス許可が必要です。
            </nobr>
          </p>
          <div :class="$style.buttonWrap">
            <SplashStartButton
              :loading="!isLoadAssets || !isLoadedAframe"
              @click="onClickAllowPermission"
            />
          </div>
        </div>
        <div v-if="isTalkMode">
          <p :class="$style.message">
            <nobr>
              サービスの利用にマイクとモーションセンサーの<wbr />アクセス許可が必要です。
            </nobr>
          </p>
          <div :class="$style.buttonWrap">
            <SplashStartButton
              :loading="!isLoadAssets || !isLoadedAframe"
              @click="onClickAllowPermission"
            />
          </div>
        </div>
        <div v-if="isMap">
          <p :class="$style.message">
            <nobr>
              サービスの利用に位置情報の<wbr />アクセス許可が必要です。
            </nobr>
          </p>
          <div :class="$style.buttonWrap">
            <SplashStartButton
              :loading="!isLoadAssets || !isLoadedMap"
              @click="onClickAllowPermission"
            />
          </div>
        </div>
        <div v-if="isDefault" :class="$style.buttonWrap">
          <SplashStartButton
            :loading="!isLoadAssets"
            @click="onClickAllowPermission"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { CLOSE_SPLASH } from '@/store/index'
import Logo from '@/components/atoms/Logo.vue'
import SplashStartButton from '@/components/atoms/SplashStartButton.vue'

type Data = {
  show: boolean
  isLoadAssets: boolean
}

export default Vue.extend({
  name: 'Splash',
  components: {
    Logo,
    SplashStartButton,
  },
  data(): Data {
    return {
      show: true,
      isLoadAssets: false,
    }
  },
  computed: {
    ...mapState('ar', ['isLoadedAframe']),
    ...mapState('map', ['isLoadedMap']),
    isTop(): boolean {
      const isIndex = this.$route.path === '/'
      const query = this.$route.query
      const isTalkMode = !!query.talkMode && query.talkMode === '1'

      return isIndex && !isTalkMode
    },
    isTalkMode(): boolean {
      const isIndex = this.$route.path === '/'
      const query = this.$route.query
      const isTalkMode = !!query.talkMode && query.talkMode === '1'

      return isIndex && isTalkMode
    },
    isMap(): boolean {
      return this.$route.path === '/locate'
    },
    isDefault(): boolean {
      return !this.isTop && !this.isTalkMode && !this.isMap
    },
  },
  mounted() {
    window.onload = () => {
      this.isLoadAssets = true
    }
  },
  methods: {
    onClickAllowPermission() {
      this.show = false
      this.$store.commit(CLOSE_SPLASH)
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.splash {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $base-color;
  z-index: $splash-zindex;
  display: flex;
  justify-content: center;
  align-items: center;

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
    bottom: 0;
    left: 0;
  }
}

.logoWrap {
  width: 50vw;
  max-width: 150px;
  margin: 0 auto;
}

.scaleWrap {
  animation-name: scaleIn;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.89, -0.11, 0.07, 1.4);
  animation-fill-mode: forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.message {
  font-size: 13px;
  text-align: center;
  display: inline-block;
  padding: 30px 50px 0;
  opacity: 0.6;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.buttonWrap {
  width: 100%;
  display: flex;
  justify-content: center;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  opacity: 0;
  margin-top: 30px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.enter {
  opacity: 0;
}

.enterTo {
  opacity: 1;
}

.leave {
  opacity: 1;
}

.leaveTo {
  opacity: 0;
}

.enterActive {
  transition: opacity 600ms ease;
}

.leaveActive {
  transition: opacity 600ms ease;
}
</style>
