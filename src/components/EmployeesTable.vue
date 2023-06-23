<template>
  <div class="grid-table">
    <div class="grid-table__container">
      <div class="grid-table__item" v-for="(field, id) in fields" :key="id">
        <button
          class="grid-table__button"
          @click="onClickSortButton(field.key)"
          v-if="field.sortable"
        >
          <h2 class="grid-table__title">{{ field.label }}</h2>
          <SortItem />
        </button>
        <h2 class="grid-table__title" v-else>{{ field.label }}</h2>
      </div>
    </div>
    <div
      class="grid-table__container"
      v-for="(employee, id) in employees"
      :key="id"
    >
      <div
        class="grid-table__item"
        :style="
          employee.level ? { paddingLeft: 5 * employee.level + 'px' } : {}
        "
      >
        <p class="grid-table__text">
          {{ employee.level }} {{ employee.fullName }}
        </p>
      </div>
      <div class="grid-table__item">
        <p class="grid-table__text">{{ employee.age }}</p>
      </div>
      <div class="grid-table__item">
        <b-button
          variable="info"
          @click="openMapModal(employee.location)"
          size="sm"
        >
          Карта
        </b-button>
      </div>
    </div>
    <b-modal
      header-bg-variant="dark"
      header-text-variant="light"
      title="Местоположение"
      id="employee-location"
      size="xl"
      hide-footer
      centered
    >
      <YandexMap :location="currentLocation" :with-change-location="false" />
    </b-modal>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import YandexMap from "./YandexMap.vue";
import SortItem from "@/assets/icons/SortItem.vue";
import { IEmployee, TLocation } from "@/interfaces";
import store from "@/store";

type SortType =
  | undefined
  | "fullName"
  | "fullName-reverse"
  | "age"
  | "age-reverse";

interface EmployeeWithLevel extends IEmployee {
  level?: number;
}

const fields = [
  {
    key: "fullName",
    label: "ФИО",
    sortable: true,
  },
  {
    key: "age",
    label: "Возраст",
    sortable: true,
  },
  {
    key: "location",
    label: "Локация",
    sortable: false,
  },
];

const sortType = ref<SortType>(undefined);
const currentLocation = ref<TLocation | undefined>(undefined);
const root = getCurrentInstance();
const employees = ref<EmployeeWithLevel[]>([...store.state.employees]);

const onClickSortButton = (fieldName: string) => {
  if (fieldName === "fullName") {
    if (sortType.value === "fullName") {
      sortType.value = "fullName-reverse";
    } else {
      sortType.value = "fullName";
    }
  } else {
    if (sortType.value === "age") {
      sortType.value = "age-reverse";
    } else {
      sortType.value = "age";
    }
  }
};

const openMapModal = (loc: TLocation) => {
  currentLocation.value = loc;
  if (root) {
    root.proxy.$bvModal.show("employee-location");
  }
};

const deepSortEmployees = (sortedEmployees: EmployeeWithLevel[]) => {
  const deepSorted: EmployeeWithLevel[] = [];

  let level = 2;
  const getEmployeesOfEmployer = (
    employerId: string,
    allEmployees: EmployeeWithLevel[],
  ) => {
    const employeesOfEmployer = allEmployees.filter(
      (employee) => employee.employer === employerId,
    );
    employeesOfEmployer.forEach((employee) => {
      employee.level = level;
      level++;
      deepSorted.push(employee);
      getEmployeesOfEmployer(employee.id, allEmployees);
      level--;
    });
  };

  const employers = sortedEmployees.filter((employee) => !employee.employer);

  employers.forEach((employer) => {
    employer.level = 1;
    deepSorted.push(employer);
    getEmployeesOfEmployer(employer.id, sortedEmployees);
  });
  return deepSorted;
};

const handleSortEmployees = (type?: SortType) => {
  let sorted: EmployeeWithLevel[] = [];

  if (!type) {
    sorted = employees.value;
  } else {
    // beginning sort if need
    const key = type.indexOf("fullName") > -1 ? "fullName" : "age";
    const reverse = type.indexOf("reverse") > -1 ? true : false;
    sorted = employees.value.sort((a, b) => {
      if (a[key] > b[key]) {
        return !reverse ? 1 : -1;
      }
      if (a[key] < b[key]) {
        return !reverse ? -1 : 1;
      }
      return 0;
    });
  }

  employees.value = deepSortEmployees(sorted);
};

onMounted(() => {
  handleSortEmployees();
});

watch(sortType, (newSortType) => {
  handleSortEmployees(newSortType);
});

watch(
  () => store.state.employees,
  (newVal) => {
    employees.value = [...newVal];
    handleSortEmployees(sortType.value);
  },
  { deep: true },
);
</script>

<style lang="scss">
.grid-table {
  width: 80vw;

  @include mq(767) {
    width: 100%;
  }

  &__container {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    border-bottom: 1px solid $color-text;

    @include mq(767) {
      grid-template-columns: 3fr 1fr 1fr;
    }
  }

  &__item {
    padding: 5px;
    display: flex;
    align-items: center;
    border-right: 1px solid $color-text;

    &:last-of-type {
      border-right: none;
    }
  }

  &__button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 0;

    @include mq(767) {
      font-size: 12px;
    }
  }

  &__text {
    font-size: 16px;
    margin-bottom: 0;

    @include mq(767) {
      font-size: 12px;
    }
  }
}
</style>
