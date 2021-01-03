<template>
  <div>
    <NotifyModal
      :show-notify-modal="$props.in"
      modal-title="くわしく"
      @close="$emit('close')"
      @action="$emit('close')"
    >
      <p :class="$style.modalMessage">{{ selectedPersonalityComment }}</p>
      <PhotoListImage :src="$props.src" />
      <div :class="$style.removeButtonWrap">
        <button @click="onOpenRemoveModal">この写真を削除</button>
      </div>
    </NotifyModal>
    <ActionModal
      :show-action-modal="isShowRemoveModal && $props.in"
      modal-title="削除"
      @close="onCloseNotifyModal"
      @action="onRemoveImage"
    >
      <PhotoListImage :src="$props.src" />
      <p :class="$style.modalMessage">こちらの写真を削除しますか？</p>
    </ActionModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionModal from '@/components/molecule/actionModal.vue'
import PhotoListImage from '@/components/atoms/PhotoListImage.vue'
import personality from '@/assets/personality.json'

type Data = {
  isShowRemoveModal: boolean
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
    }
  },
  computed: {
    selectedPersonalityComment(): string {
      const selected = personality.find(
        (item) => item.fileName === this.$props.src
      )
      if (selected) {
        return selected.comment
      }
      return ''
    },
  },
  methods: {
    onCloseNotifyModal() {
      this.isShowRemoveModal = false
    },
    onRemoveImage() {
      this.isShowRemoveModal = false
      this.$emit('remove-image')
    },
    onOpenRemoveModal() {
      this.isShowRemoveModal = true
    },
  },
})
</script>

<style module lang="scss">
.modalMessage {
  font-size: 12px;
  text-align: center;
}
.removeButtonWrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
</style>
