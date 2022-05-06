<template>
  <div
    class="select item-input"
    :class="[{'active': isFocus||selected}, mainClass]"
  >
    <div class="item-input__wrapper">
      <label
        tabindex="0"
        :value="currentSelect"
        @focus="isFocus=true"
        @blur="hideOptions"
        class="select__button item-input__input"
      >{{selected?.name.toUpperCase()}}</label>
      <label
        class="item-input__label "
        @click="isFocus=true"
      >{{currentSelect ? labelBefore : label}}</label>
      <ul
        v-if="isFocus"
        class="select__options"
      >
        <li
          class="select__option"
          v-for="option in options"
          :key="option"
          @click="select(option)"
        >
          {{option.name.toUpperCase()}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiSelect",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      default: "Выберете...",
    },
    labelBefore: {
      type: String,
      default: "Выбрано",
    },
    selected: {
      type: Object,
      default() {
        return {};
      },
    },
    mainClass: {
      type: String,
      default: "",
    },
    name: {
      default: "",
    },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  computed: {
    currentSelect() {
      return this.selected ? this.selected : "";
    },
  },
  methods: {
    select(option) {
      this.$emit("select", option);
      this.hideOptions();
    },
    hideOptions() {
      setTimeout(() => {
        this.isFocus = false;
      }, 150);
    },
  },
};
</script>

<style lang="sass">
</style>