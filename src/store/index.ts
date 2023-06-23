import Vue from "vue";
import Vuex from "vuex";

import { IEmployee } from "@/interfaces";

Vue.use(Vuex);

export interface RootState {
  employees: IEmployee[];
}

export default new Vuex.Store<RootState>({
  state: { employees: [] },
  getters: {
    employeeOptions(state) {
      return state.employees.map((i) => {
        return { value: i.id, text: i.fullName };
      });
    },
  },
  mutations: {
    addEmployee(state, payload: IEmployee) {
      state.employees.push(payload);
    },
    initEmployees(state, payload: IEmployee[]) {
      state.employees = payload;
    },
  },
  actions: {},
  modules: {},
});
