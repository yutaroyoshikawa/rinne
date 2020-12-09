<template>
  <transition
    :enter-class="$style.fadeEnter"
    :leave-to-class="$style.fadeLeaveTo"
    :enter-active-class="$style.fadeEnterActive"
    :leave-active-class="$style.fadeLeaveActive"
  >
    <div v-if="$props.in" :class="$style.wrap">
      <div :class="$style.cancelWrap">
        <CancelButton @click="onCancel" />
      </div>
      <div :class="$style.circulate">
        <div :class="$style.circle">
          <div
            :class="[
              $style.wave,
              { [$style.activeWave]: isLoading || isRecording },
              {
                [$style.inactiveWave]: !isLoading && !isRecording,
              },
            ]"
          ></div>
          <div
            :class="[
              $style.wave,
              $style.two,
              { [$style.activeWave]: isLoading || isRecording },
              {
                [$style.inactiveWave]: !isLoading && !isRecording,
              },
            ]"
          ></div>
          <div
            :class="[
              $style.wave,
              $style.three,
              { [$style.activeWave]: isLoading || isRecording },
              {
                [$style.inactiveWave]: !isLoading && !isRecording,
              },
            ]"
          ></div>
        </div>
      </div>
      <div :class="$style.micWrap">
        <MicButton
          :loading="isLoading"
          @holdstart="onHold"
          @holdend="onHoldend"
        />
        <div :class="$style.resultWrap">
          <p v-if="isShowGuideComment" :class="$style.resultText">
            ホールドしてしゃべる
          </p>
          <p :class="$style.resultText">{{ speechTextResult }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import MicButton from '@/components/atoms/MicButton.vue'
import { REQUEST_TALK_TEXT } from '@/store/ar'
import CancelButton from '@/components/atoms/CancelButton.vue'

type Data = {
  recorder?: any
  speechTextResult?: string
  isLoading: boolean
  isRecording: boolean
}

let chunks: any[] | undefined = []
const AUDIO_SAMPLE_RATE = 44100

export default Vue.extend({
  name: 'SpeakToText',
  components: {
    MicButton,
    CancelButton,
  },
  props: {
    in: {
      type: Boolean,
      default: false,
    },
  },
  data(): Data {
    return {
      recorder: undefined,
      speechTextResult: undefined,
      isLoading: false,
      isRecording: false,
    }
  },
  computed: {
    isShowGuideComment() {
      if (this.isRecording) {
        return false
      }
      if (this.speechTextResult) {
        return false
      }
      if (this.isLoading) {
        return false
      }
      return true
    },
  },
  watch: {
    speechTextResult() {
      this.$store.dispatch(`ar/${REQUEST_TALK_TEXT}`, this.speechTextResult)
    },
  },
  beforeMount() {
    if (typeof window !== 'undefined') {
      chunks = []
      this.initRecorder()
    }
  },
  beforeDestroy() {
    chunks = undefined
  },
  methods: {
    onCancel() {
      this.$router.app.$router.push('/')
    },
    initRecorder() {
      import('audio-recorder-polyfill').then((module) => {
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
          })
          .then((stream) => {
            const AudioRecorder = module.default
            const recorder = new AudioRecorder(stream, {
              audioBitsPerSecond: AUDIO_SAMPLE_RATE,
              mimeType: 'audio/wav',
            })
            recorder.addEventListener('dataavailable', (event: any) => {
              if (event.data.size > 0 && chunks) {
                chunks.push(event.data)
              }
            })
            recorder.addEventListener('stop', async () => {
              // 集音したものから音声データを作成する
              try {
                const base64 = await this.encodeBase64(new Blob(chunks))
                const speechText = await this.getSpeechText(base64)
                this.speechTextResult = speechText
              } catch (error) {
                this.$emit('error', error)
              } finally {
                chunks = []
                this.isLoading = false
              }
            })
            this.recorder = recorder
          })
          .catch((error) => {
            this.$emit('error', error)
          })
      })
    },
    encodeBase64(blobData: Blob): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
            let binary = ''
            const bytes = new Float32Array(buffer)
            const len = bytes.byteLength
            for (let i = 0; i < len; i++) {
              binary += String.fromCharCode(bytes[i])
            }
            return window.btoa(binary)
          }
          const result = reader.result
          if (
            result === null ||
            typeof result === 'string' ||
            result.byteLength === 0
          ) {
            return reject(Error('no input audio data'))
          } else {
            const arrayBufferResult = new Uint8Array(result)
            return resolve(arrayBufferToBase64(arrayBufferResult))
          }
        }
        reader.onerror = (error) => reject(error)
        reader.readAsArrayBuffer(blobData)
      })
    },
    getSpeechText(base64Data: string): Promise<string> {
      return new Promise((resolve, reject) => {
        const requestData = {
          config: {
            encoding: 'LINEAR16',
            sampleRateHertz: AUDIO_SAMPLE_RATE,
            languageCode: 'ja-JP',
            model: 'command_and_search',
            metadata: {
              recordingDeviceType: 'SMARTPHONE',
              originalMimeType: 'audio/wav',
            },
          },
          audio: {
            content: base64Data,
          },
        }
        fetch(
          `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GCP_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(requestData),
          }
        )
          .then((response) => {
            return response.json()
          })
          .then((resultJson) => {
            if (!resultJson.results || resultJson.results.length === 0) {
              return reject(Error('No speech result'))
            }
            return resolve(resultJson.results[0].alternatives[0].transcript)
          })
          .catch((error) => {
            this.$emit('error', error)
            return reject(error)
          })
      })
    },
    onHold() {
      if (this.recorder) {
        this.recorder.start()
        this.speechTextResult = undefined
        this.isRecording = true
      }
    },
    onHoldend() {
      if (this.recorder) {
        this.recorder.stop()
        this.isLoading = true
        this.isRecording = false
      }
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.fadeEnterActive,
.fadeLeaveActive {
  transition: opacity 0.6s;
}

.fadeEnter,
.fadeLeaveTo {
  opacity: 0;
}

.circle {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  transform: translateZ(0);
}

.waveActive {
  top: 65% !important;
  background: linear-gradient(to left top, $success-color, $primary-color);
}

.activeWave {
  top: 70%;
}

.inactiveWave {
  top: 80%;
}

.wave {
  opacity: 0.4;
  position: absolute;
  left: 50%;
  width: 200vw;
  height: 200vw;
  margin-left: -100vw;
  margin-bottom: -155px;
  transform-origin: 50% 48%;
  border-radius: 43%;
  animation: humming 2.5s infinite linear;
  background: linear-gradient(to left top, #23345d, #921664);
  transition: top 0.5s cubic-bezier(0.425, 0.105, 0, 0.645);
}

.three {
  animation: humming 5000ms infinite linear;
}

.two {
  animation: humming 9000ms infinite linear;
  opacity: 1;
}

@keyframes humming {
  from {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(360deg);
  }
}

.wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  z-index: 10;
}

.cancelWrap {
  position: absolute;
  top: 80px;
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 110;
}

.micWrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 25vh;
  max-height: 420px;
  min-height: 150px;
  display: flex;
  margin-bottom: 40px;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.resultWrap {
  position: absolute;
  bottom: 0;
}

.resultText {
  font-size: 28px;
  width: 100%;
  text-align: center;
  color: #fff;
  user-select: none;
}
</style>
