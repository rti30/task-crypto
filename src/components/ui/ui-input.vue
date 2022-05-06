<template>
  <div
    class="item-input"
    :class="[{'active': isFocus||isValue}]"
  >
    <div class="item-input__wrapper">
      <input
        @input.passive="$emit(`isInput`,$event.target.value.trim())"
        class="item-input__input"
        :class="inputClass"
        type="text"
        @focus="isFocus=true"
        @blur="isFocus=false"
        :value="isValue"
        ref="isInput"
      >
      <label
        class="item-input__label"
        @click="focusInput()"
      >{{labelValue}}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiInput",
  props: ["inputClass", "isValue", "labelClass", "labelValue"],
  data() {
    return {
      isFocus: false,
    };
  },
  methods: {
    focusInput() {
      this.$refs.isInput.focus();
    },
  },
};
</script>

<style lang="sass">
</style>
