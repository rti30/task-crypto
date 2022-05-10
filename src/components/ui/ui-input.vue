<template>
  <div
    class="item-input"
    :class="[{ active: isFocus || isValue }]"
  >
    <div class="item-input__wrapper">
      <input
        @change="isInput($event.target.value.trim())"
        class="item-input__input"
        :class="inputClass"
        type="text"
        @focus="isFocus = true"
        @blur="isFocus = false"
        :value="isValue"
        ref="isNode"
      />
      <label
        class="item-input__label"
        @click="focusInput()"
      >{{ labelValue }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiInput",
  props: ["inputClass", "isValue", "labelClass", "labelValue", "mode"],
  data() {
    return {
      isFocus: false,
    };
  },
  methods: {
    focusInput() {
      this.$refs.isNode.focus();
    },
    isInput(value) {
      if (this.mode === "double") {
        const require = /[^\d/.]/g;
        value = Number(
          value
            .replace(require, "")
            .split(".")
            .reduce((acc, el, i) => (acc += i == 1 ? "." + el : el), "")
        );
        value = value ? value : 0;
        console.log(value);
        this.$emit(`isInput`, value);
      } else {
        this.$emit(`isInput`, value);
      }
    },
  },
};
</script>

<style lang="sass">
</style>
