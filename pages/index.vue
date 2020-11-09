<template>
  <div :class="$style.container">
    <div :class="$style.links">
      <p :class="$style.contentsTitle">page</p>
      <ScaleTransition>
        <NuxtLink to="presentation" :class="$style.pageLink">プレゼン</NuxtLink>
      </ScaleTransition>
      <NuxtLink to="cleanliness" :class="$style.pageLink">たいちょう</NuxtLink>
      <NuxtLink to="photolist" :class="$style.pageLink">いちらん</NuxtLink>
      <NuxtLink to="profile" :class="$style.pageLink">プロフィール</NuxtLink>
      <NuxtLink to="locate" :class="$style.pageLink">いばしょ</NuxtLink>
      <NuxtLink to="testpage" :class="$style.pageLink">テストページ</NuxtLink>
    </div>
    <hr />
    <p :class="$style.contentsTitle">component</p>
    <div :class="$style.componentWrap">
      <ListButton />
      <CharacterCircle
        :character-name="characterName"
        :class="$style.characterCircle"
      />
      <button :class="$style.componentButton" @click="onClickRecButton">
        {{ recButtonText }}
      </button>
      {{ speechTextResult }}
    </div>
    <Loading />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PageTransitionState } from '@/extentions/pageTransitionState'
import { CHANGE_HEADER_TITLE, SET_IS_OPEN_TAB } from '@/store/index'
import ScaleTransition from '@/components/atoms/transitions/ScaleTransition.vue'
import ListButton from '../components/atoms/listButton.vue'
import CharacterCircle from '../components/atoms/characterCircle.vue'

type Data = {
  characterName: string
  isRecording: boolean
  recorder?: any
  speechTextResult?: string
}

let chunks: any[] | undefined = []
const AUDIO_SAMPLE_RATE = 44100

export default Vue.extend({
  components: {
    ListButton,
    CharacterCircle,
    ScaleTransition,
  },
  data(): Data {
    return {
      characterName: 'せいかく',
      isRecording: false,
      speechTextResult: undefined,
    }
  },
  computed: {
    isExiting() {
      return (
        this.$store.state.pageTransitionState === PageTransitionState.EXITING
      )
    },
    recButtonText(): string {
      return this.isRecording ? '録音中' : 'タップして録音'
    },
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, undefined)
  },
  beforeDestroy() {
    chunks = undefined
  },
  mounted() {
    if (typeof window !== 'undefined') {
      chunks = []
      this.initRecorder()
    }
  },
  methods: {
    openTab() {
      this.$store.commit(SET_IS_OPEN_TAB, true)
    },
    onClickRecButton() {
      if (this.recorder) {
        if (!this.isRecording) {
          this.recorder.start()
        }
        if (this.isRecording) {
          this.recorder.stop()
        }
        this.isRecording = !this.isRecording
      }
    },
    initRecorder() {
      import('audio-recorder-polyfill').then((module) => {
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: false,
          })
          .then((stream) => {
            const AudioRecorder = module.default
            const audioTracks = stream.getAudioTracks()
            console.log(audioTracks[0].label)
            const recorder = new AudioRecorder(stream, {
              audioBitsPerSecond: AUDIO_SAMPLE_RATE,
              mimeType: 'video/webm;codecs=vp9',
            })
            recorder.addEventListener('dataavailable', (event: any) => {
              if (event.data.size > 0 && chunks) {
                chunks.push(event.data)
              }
            })
            recorder.addEventListener('stop', async () => {
              // 集音したものから音声データを作成する
              const base64 = await this.encodeBase64(new Blob(chunks))
              const speechText = await this.getSpeechText(base64)
              this.speechTextResult = speechText
              chunks = []
            })
            this.recorder = recorder
          })
          .catch((error) => {
            alert(error)
            throw error
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
          if (result === null || typeof result === 'string') {
            reject(Error)
          } else {
            const arrayBufferResult = new Uint8Array(result)
            resolve(arrayBufferToBase64(arrayBufferResult))
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
            return response.text()
          })
          .then((text) => {
            const resultJson = JSON.parse(text)
            if (!resultJson.results || resultJson.results.length === 0) {
              reject(Error('No speech result'))
            }
            // eslint-disable-next-line no-console
            console.log(resultJson.results[0])
            resolve(resultJson.results[0].alternatives[0].transcript)
          })
          .catch((error) => {
            alert(error)
            reject(error)
          })
      })
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.container {
  margin: 0 auto;
  min-height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  text-align: center;
}
.contentsTitle {
  font-size: 1.5em;
  color: $dark-base-color;
  margin-bottom: 20px;
}
.links {
  display: flex;
  flex-direction: column;
}
.pageLink {
  width: 200px;
  padding: 10px 0;
  border-radius: 30px;
  margin: 0 auto 10px auto;
  background-color: $secondary-color;
  color: #fff;
}
hr {
  margin: 50px 0;
}
.componentWrap {
  display: flex;
  flex-direction: column;
}
.characterCircle {
  margin: 0 auto;
}
.scaleEnterActive {
  transition: transform 0.6s cubic-bezier(0.89, -0.11, 0.07, 1.4);
}
.scaleLeaveActive {
  transition: transform 0.6s cubic-bezier(0.77, -0.595, 0.6, 1.025);
}
.scaleEnter,
.scaleLeaveTo {
  transform: scale(0);
}
</style>
