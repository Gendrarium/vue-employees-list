<template>
  <b-form-group
    :id="id + '-group'"
    :label="label"
    :label-for="id"
    :class="className"
  >
    <b-form-input
      :id="id"
      v-model="value"
      :placeholder="placeholder"
      :debounce="debounce"
      autocomplete="off"
      @blur="onBlur"
      @focus="onFocus"
      required
    />
    <DataPicker
      :options="dataOptions"
      :handle-click="onDataClick"
      :is-open="isDataOpen"
      :id="dataId"
    />
  </b-form-group>
</template>

<script setup lang="ts">
import { computed } from "vue";
import DataPicker from "@/components/DataPicker.vue";

const props = defineProps<{
  id: string;
  value: string;
  label: string;
  className: string;
  onBlur: (e: FocusEvent) => void;
  onFocus: () => void;
  debounce: string | number;
  placeholder: string;
  dataOptions: string[];
  onDataClick: (o: string) => void;
  isDataOpen: boolean;
  dataId: string;
}>();

const emit = defineEmits(["input"]);

const value = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("input", value);
  },
});
</script>
