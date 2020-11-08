<template>
  <transition name="modal">
    <div :class="$style.modalMask" @click="$emit('close')">
      <div :class="$style.modalWrapper">
        <div :class="$style.modalContainer">
          <p>modal sample</p>
          <button :class="$style.modalButton" @click="$emit('close')">
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
export default {
  name: 'Modal',
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
  transition: opacity 0.3s ease;
}
.modalWrapper {
  display: table-cell;
  vertical-align: middle;
}
.modalContainer {
  width: 70%;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modalButton {
  width: 200px;
  padding: 10px 0;
  border-radius: 30px;
  margin: 20px auto 10px auto;
  background-color: #f6c521;
  text-align: center;
  color: #fff;
}
</style>
