<template>
  <ul class="data-picker" :class="isOpen ? 'data-picker_visible' : ''" :id="id">
    <li class="data-picker__item" v-for="(option, id) in options" :key="id">
      <button
        class="data-picker__button"
        @click="handleClick(option)"
        type="button"
      >
        {{ option }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{
  options: string[];
  handleClick: (o: string) => void;
  isOpen: boolean;
  id: string;
}>();
</script>

<style scoped lang="scss">
.data-picker {
  display: none;
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  background-color: $color-white;
  border: 1px solid gray;
  border-radius: 3px;
  z-index: 1900;

  &_visible {
    display: block;
  }

  &__button {
    cursor: pointer;
    padding: 10px;
    width: 100%;
    text-align: left;
    color: $color-text;

    &:hover {
      background-color: rgba($color: $color-blue, $alpha: 0.5);
      color: $color-white;
    }
  }
}
</style>
