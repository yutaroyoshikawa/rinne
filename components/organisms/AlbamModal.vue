<template>
  <div>
    <NotifyModal
      :show-notify-modal="$props.in && !isShowRemoveModal"
      modal-title="くわしく"
      @close="$emit('close')"
      @action="$emit('close')"
    >
      <div :class="$style.albamDateWrap">
        <p :class="$style.albamDate">
          {{ selectedPersonality ? selectedPersonality.date : '' }}
        </p>
      </div>
      <p :class="$style.modalMessage">
        {{ selectedPersonality ? selectedPersonality.comment : '' }}
      </p>
      <div :class="$style.imageWrap">
        <PhotoListImage :src="$props.src" />
      </div>
      <div :class="$style.removeButtonWrap">
        <button :class="$style.removeButton" @click="onOpenRemoveModal">
          この写真を削除
        </button>
      </div>
    </NotifyModal>
    <ActionModal
      :show-action-modal="isShowRemoveModal && $props.in"
      modal-title="削除"
      @close="onCloseNotifyModal"
      @action="onRemoveImage"
    >
      <div :class="$style.imageWrap">
        <PhotoListImage :src="$props.src" />
      </div>
      <p :class="$style.modalMessage">こちらの写真を削除しますか？</p>
    </ActionModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionModal from '@/components/molecule/actionModal.vue'
import PhotoListImage from '@/components/atoms/PhotoListImage.vue'
import personality from '@/assets/personality.json'
import { ImageData } from '@/extentions/personality'

type Data = {
  isShowRemoveModal: boolean
  isRemoveImage: boolean
}

export default Vue.extend({
  name: 'AlbamModal',
  components: {
    ActionModal,
    PhotoListImage,
    NotifyModal: () => import('@/components/molecule/notifyModal.vue'),
  },
  props: {
    in: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: '',
    },
  },
  data(): Data {
    return {
      isShowRemoveModal: false,
      isRemoveImage: false,
    }
  },
  computed: {
    selectedPersonality(): ImageData | undefined {
      const selected = personality.find(
        (item) => item.fileName === this.$props.src
      )
      if (selected) {
        return selected
      }
      return undefined
    },
  },
  methods: {
    onCloseNotifyModal() {
      this.isShowRemoveModal = false
    },
    onRemoveImage() {
      this.isShowRemoveModal = false
      this.isRemoveImage = true
      this.$emit('close')
      this.$emit('remove-image')
    },
    onOpenRemoveModal() {
      this.isShowRemoveModal = true
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.modalMessage {
  font-size: 12px;
  text-align: center;
}
.albamDateWrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.albamDate {
  display: inline-block;
  color: $primary-color;
  font-size: 12px;
}
.removeButtonWrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
.removeButton {
  width: 100%;
  height: 28px;
  font-size: 13px;
  color: #fff;
  background-color: $error-color;
  border-radius: 5px;
  text-align: center;
}
.imageWrap {
  width: 140px;
  height: 140px;
  margin: 10px auto;
}
</style>
