<template>
  <div>
    <b-form @submit.prevent="onSubmit" class="form">
      <b-form-group
        id="full-name-group"
        label="ФИО"
        label-for="full-name"
        class="form__relative-container"
      >
        <b-form-input
          id="full-name"
          v-model="fullName"
          placeholder="Введите ФИО"
          debounce="250"
          autocomplete="off"
          @blur="handleBlurInput"
          @focus="handleFocusNameInput()"
          required
        ></b-form-input>
        <DataPicker
          :options="fullNameStrings"
          :handle-click="handleClickOption"
          :is-open="isDataPickerOpen"
          :id="dataPickerId"
        />
      </b-form-group>

      <b-form-group id="age-group" label="Возраст" label-for="age">
        <b-form-input
          id="age"
          v-model="form.age"
          type="number"
          min="18"
          max="100"
          placeholder="Введите возраст"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="location-group" label="Местоположение">
        <b-button v-b-modal.employees-form-location variant="info">
          Выбрать
        </b-button>
      </b-form-group>

      <b-form-group
        id="employer-group"
        label="Руководитель"
        label-for="employer"
      >
        <b-form-select
          id="employer"
          v-model="form.employer"
          :options="store.getters.employeeOptions"
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary" class="form__button">
        Сохранить
      </b-button>
    </b-form>

    <b-modal
      header-bg-variant="dark"
      header-text-variant="light"
      title="Местоположение"
      id="employees-form-location"
      size="xl"
      centered
      ok-only
    >
      <YandexMap
        :location="form.location"
        @add-marker="updateLocation"
        :with-change-location="true"
      />
    </b-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, watch, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import store from "@/store";
import { getNameVariants } from "@/utils/api";
import { IFullNameVariable, TLocation } from "@/interfaces";
import DataPicker from "./DataPicker.vue";
import YandexMap from "@/components/YandexMap.vue";

interface Form {
  age: null | string;
  employer: null | string;
  location: TLocation;
}

const dataPickerId = "data-picker";
const root = getCurrentInstance();
const form = reactive<Form>({
  age: null,
  employer: null,
  location: [37.588144, 55.733842],
});
const fullName = ref<string>("");
const fullNameVariables = ref<IFullNameVariable[]>([]);
const fullNameStrings = computed<string[]>(() =>
  fullNameVariables.value.map((i) => i.value),
);
const isDataPickerOpen = ref<boolean>(false);

const resetForm = () => {
  fullName.value = "";
  form.age = null;
  form.employer = null;
};

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

const updateLocation = (newLocation: TLocation) => {
  form.location = newLocation;
};

const onSubmit = function () {
  store.commit("addEmployee", {
    fullName: fullName.value,
    age: form.age,
    employer: form.employer || undefined,
    location: form.location,
    id: uuidv4(),
  });
  resetForm();

  if (root) {
    root.proxy.$bvModal.hide("employees-modal");
  }
};

watch(fullName, (newFullName) => {
  const firstValue = fullNameVariables.value[0];
  if (firstValue && fullName.value === firstValue.value) return;

  getNameVariants(newFullName).then((res) => {
    fullNameVariables.value = res.suggestions;
    if (res.suggestions.length > 0) {
      isDataPickerOpen.value = true;
    } else {
      isDataPickerOpen.value = false;
    }
  });
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  &__relative-container {
    position: relative;
  }

  &__button {
    margin-left: auto;
  }
}
</style>
