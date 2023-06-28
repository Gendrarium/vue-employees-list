<template>
  <OptionInput
    className="form__relative-container"
    label="ФИО"
    :onBlur="handleBlurInput"
    :onFocus="handleFocusNameInput"
    v-model="fullName"
    id="full-name"
    debounce="250"
    placeholder="Введите ФИО"
    :dataOptions="fullNameStrings"
    :onDataClick="handleClickOption"
    :isDataOpen="isDataPickerOpen"
    :dataId="dataPickerId"
  />
</template>

<script setup lang="ts">
import OptionInput from "@/components/OptionInput.vue";
import { IFullNameVariable } from "@/interfaces";
import { getNameVariants } from "@/utils/api";
import { computed, ref } from "vue";

const props = defineProps<{ value: string }>();
const emit = defineEmits(["input"]);

const isDataPickerOpen = ref<boolean>(false);
const fullNameVariables = ref<IFullNameVariable[]>([]);
const fullNameStrings = computed<string[]>(() =>
  fullNameVariables.value.map((i) => i.value),
);
const fullName = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("input", value);
    handleChangeFullName(value);
  },
});

const dataPickerId = "data-picker";

const handleClickOption = (option: string) => {
  fullName.value = option;
  isDataPickerOpen.value = false;
};

const handleBlurInput = (e: FocusEvent) => {
  if (!e.relatedTarget) return;
  if (e.relatedTarget.closest(`#${dataPickerId}`)) return;
  isDataPickerOpen.value = false;
};

const handleFocusNameInput = () => {
  if (fullNameStrings.value.length > 0) {
    isDataPickerOpen.value = true;
  }
};

const handleChangeFullName = (newFullName: string) => {
  const firstValue = fullNameVariables.value[0];
  if (firstValue && fullName.value === firstValue.value) return;

  getNameVariants(newFullName).then((res) => {
    if (!res) {
      console.log("Ошибка загрузки данных dadata");
      return;
    }

    fullNameVariables.value = res.suggestions;
    if (res.suggestions.length > 0) {
      isDataPickerOpen.value = true;
    } else {
      isDataPickerOpen.value = false;
    }
  });
};
</script>
