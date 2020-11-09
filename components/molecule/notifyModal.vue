<template>
  <div :class="$style.modalMask" @click="$emit('close')">
    <div :class="$style.modalWrapper">
      <div :class="$style.modalContainer">
        <div :class="$style.modalTitle">
          <p>{{ title }}</p>
        </div>
        <div :class="$style.textWrap">
          <slot />
        </div>
        <div :class="$style.buttonCenter">
          <button :class="$style.modalButton" @click="$emit('close')">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
type Data = {
  showNotifyModal: boolean
  title: String
}
export default {
  name: 'NotifyModal',
  data(): Data {
    return {
      showNotifyModal: false,
      title: 'modalTitle',
    }
  },
}
</script>
<style lang="scss" module>
.modalMask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}
.modalWrapper {
  display: table-cell;
  vertical-align: middle;
}
.modalContainer {
  width: 70%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modalTitle {
  width: 100%;
  height: 30px;
  background-color: #929d49;
  display: table;
  text-align: center;
  & > p {
    color: #f3ebd8;
    display: table-cell;
    vertical-align: middle;
    line-height: normal;
  }
}
.textWrap {
  width: 80%;
  margin: 0 auto;
  padding: 30px 0;
  overflow-wrap: break-word;
}
.modalButton {
  width: 100px;
  padding: 10px 0;
  border-radius: 30px;
  margin: 0 auto 20px auto;
  background-color: #f6c521;
  text-align: center;
  color: #fff;
}
.buttonCenter {
  text-align: center;
}
</style>
