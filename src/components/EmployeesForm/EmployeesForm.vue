<template>
  <div>
    <b-form @submit.prevent="onSubmit" class="form">
      <EmpoyeesFullNameInput v-model="form.fullName" />
      <EmployeesAgeInput v-model="form.age" />
      <b-form-group id="location-group" label="Местоположение">
        <b-button v-b-modal.employees-form-location variant="info">
          Выбрать
        </b-button>
      </b-form-group>
      <EmployeesEmployerInput v-model="form.employer" />

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
import { reactive, getCurrentInstance } from "vue";
import { v4 as uuidv4 } from "uuid";
import store from "@/store";
import { TLocation } from "@/interfaces";
import YandexMap from "@/components/YandexMap.vue";
import EmpoyeesFullNameInput from "@/components/EmployeesForm/EmpoyeesFullNameInput.vue";
import EmployeesAgeInput from "./EmployeesAgeInput.vue";
import EmployeesEmployerInput from "./EmployeesEmployerInput.vue";

interface Form {
  fullName: string;
  age: null | string;
  employer: null | string;
  location: TLocation;
}

const root = getCurrentInstance();
const form = reactive<Form>({
  fullName: "",
  age: null,
  employer: null,
  location: [37.588144, 55.733842],
});

const resetForm = () => {
  form.fullName = "";
  form.age = null;
  form.employer = null;
};

const updateLocation = (newLocation: TLocation) => {
  form.location = newLocation;
};

const onSubmit = function () {
  store.commit("addEmployee", {
    fullName: form.fullName,
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
