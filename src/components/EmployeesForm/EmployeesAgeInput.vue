<template>
  <b-form-group id="age-group" label="Возраст" label-for="age">
    <b-form-input
      id="age"
      v-model="age"
      type="number"
      min="18"
      max="100"
      placeholder="Введите возраст"
      required
    />
  </b-form-group>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ value: string | null }>();
const emit = defineEmits(["input"]);

const age = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("input", value);
  },
});
</script>
