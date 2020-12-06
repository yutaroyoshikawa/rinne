import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckCircle,
  faPlus,
  faComment,
  faMicrophone,
  faChevronLeft,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

const icons = [
  faCheckCircle,
  faPlus,
  faComment,
  faMicrophone,
  faChevronLeft,
  faTimes,
]

// 利用するアイコンをlibraryに追加
icons.forEach((icon) => library.add(icon))

// グローバルコンポーネントに登録
Vue.component('fa', FontAwesomeIcon)
