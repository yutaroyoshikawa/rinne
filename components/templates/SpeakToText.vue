<template>
  <transition
    :enter-class="$style.enter"
    :leave-to-class="$style.leaveTo"
    :enter-active-class="$style.enterActive"
    :leave-active-class="$style.leaveActive"
    :duration="600"
  >
    <div v-if="$props.in" :class="$style.wrap">
      <div :class="$style.cancelWrap">
        <SpeakCancelButton @click="onCancel" />
      </div>
      <div :class="$style.waveWrap">
        <SpeakWave :active="isLoading || isRecording" :in="true" />
      </div>
      <div :class="$style.micWrap">
        <MicButton
          :loading="isLoading"
          @holdstart="onHold"
          @holdend="onHoldend"
        />
        <div :class="$style.resultWrap">
          <OpacityTransition
            :enable-page-transition="false"
            :in="isShowGuideComment"
            :duration="300"
          >
            <p :class="$style.resultText">ホールドしてしゃべる</p>
          </OpacityTransition>
          <LetterAnim
            :text="speechTextResult"
            :in="isShowResultText"
            :class-name="$style.resultText"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import MicButton from '@/components/atoms/MicButton.vue'
import { REQUEST_TALK_TEXT, PAUSE_AR, PLAY_AR } from '@/store/ar'
import SpeakCancelButton from '@/components/atoms/SpeakCancelButton.vue'
import SpeakWave from '@/components/atoms/SpeakWave.vue'
import LetterAnim from '@/components/atoms/LetterAnim.vue'
import OpacityTransition from '@/components/atoms/transitions/OpacityTransition.vue'

type Data = {
  recorder?: any
  speechTextResult?: string
  isLoading: boolean
  isRecording: boolean
  mediaStream?: MediaStream
}

let chunks: any[] | undefined = []
const AUDIO_SAMPLE_RATE = 44100

export default Vue.extend({
  name: 'SpeakToText',
  components: {
    MicButton,
    SpeakCancelButton,
    SpeakWave,
    LetterAnim,
    OpacityTransition,
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
      mediaStream: undefined,
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
    isShowResultText(): boolean {
      if (this.isRecording) {
        return false
      }
      if (this.isLoading) {
        return false
      }

      return !!this.speechTextResult
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
  mounted() {
    document.addEventListener('visibilitychange', this.disabledMediadevices)
  },
  beforeDestroy() {
    chunks = undefined
    this.$store.dispatch(`ar/${REQUEST_TALK_TEXT}`, '')
    document.removeEventListener('visibilitychange', this.disabledMediadevices)
  },
  methods: {
    disabledMediadevices(): void {
      const visibility = document.visibilityState
      const stream = this.mediaStream
      if (stream) {
        if (visibility === 'hidden') {
          stream.getAudioTracks().forEach((track) => (track.enabled = false))
        } else {
          stream.getAudioTracks().forEach((track) => (track.enabled = true))
        }
      }
    },
    onCancel() {
      const params = new URLSearchParams(location.search.slice(1))
      params.delete('talkmode')
      this.$router.replace(`${location.pathname}?${params}`)
    },
    initRecorder() {
      import('audio-recorder-polyfill').then((module) => {
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
          })
          .then((stream) => {
            this.mediaStream = stream
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
                this.$store.commit(`ar/${PLAY_AR}`)
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
            enableAutomaticPunctuation: true,
            encoding: 'LINEAR16',
            languageCode: 'ja-JP',
            model: 'default',
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
        this.$store.commit(`ar/${PAUSE_AR}`)
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
  height: 23vh;
  max-height: 420px;
  min-height: 150px;
  display: flex;
  margin-bottom: 40px;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.enterActive,
.leaveActive {
  .waveWrap {
    transition: transform 0.6s ease;
  }

  .micWrap {
    transition: opacity 0.6s ease;
  }
}

.enterActive {
  .cancelWrap {
    transition: transform 0.6s cubic-bezier(0.89, -0.11, 0.07, 1.4);
  }
}

.leaveActive {
  .cancelWrap {
    transition: transform 0.6s cubic-bezier(1, -0.46, 0.065, 1.005);
  }
}

.enter,
.leaveTo {
  .cancelWrap {
    transform: scale(0);
  }

  .waveWrap {
    transform: translateY(40%);
  }

  .micWrap {
    opacity: 0;
  }
}

.enterTo,
.leave {
  .cancelWrap {
    transform: scale(1);
  }

  .waveWrap {
    transform: translateY(0);
  }

  .micWrap {
    opacity: 1;
  }
}

.wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  z-index: 10;
}

.resultWrap {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.resultText {
  font-size: 28px;
  width: 100%;
  text-align: center;
  color: #fff;
  user-select: none;
  overflow: hidden;
}
</style>
