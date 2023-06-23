<template>
  <section class="employees">
    <b-button v-b-modal.employees-modal class="employees__add-button"
      >+ сотрудник</b-button
    >
    <b-modal
      header-bg-variant="dark"
      header-text-variant="light"
      title="Добавление сотрудника"
      id="employees-modal"
      size="xl"
      hide-footer
      centered
    >
      <EmployeesForm />
    </b-modal>

    <EmployeesTable v-if="store.state.employees.length > 0" />
    <h2 class="employees__title" v-else>
      Добавьте хотя бы одного сотрудника, чтобы увидеть таблицу
    </h2>
  </section>
</template>

<script lang="ts" setup>
import EmployeesForm from "@/components/EmployeesForm.vue";
import EmployeesTable from "@/components/EmployeesTable.vue";
import store from "@/store";
import { onMounted, watch } from "vue";

watch(
  () => store.state.employees,
  (newEmp) => {
    localStorage.setItem("employees", JSON.stringify(newEmp));
  },
  { deep: true },
);

onMounted(() => {
  const prevEmployees = localStorage.getItem("employees");
  if (prevEmployees) {
    store.commit("initEmployees", JSON.parse(prevEmployees));
  }
});
</script>

<style lang="scss" scoped>
.employees {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  align-items: center;

  @include mq(767) {
    padding: 20px 0;
  }

  &__add-button {
    margin-bottom: 20px;
  }

  &__title {
    font-size: 20px;
    color: $color-blue;
    text-align: center;
  }
}
</style>
