<template>
  <b-form-group id="employer-group" label="Руководитель" label-for="employer">
    <b-form-select
      id="employer"
      v-model="employer"
      :options="store.getters.employeeOptions"
    />
  </b-form-group>
</template>

<script setup lang="ts">
import store from "@/store";
import { computed } from "vue";

const props = defineProps<{ value: string | null }>();
const emit = defineEmits(["input"]);

const employer = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("input", value);
  },
});
</script>
