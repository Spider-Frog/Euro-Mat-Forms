import { defineStore } from 'pinia'


export const useAlertsStore = defineStore('alerts', {
  state: () => ({
    data: {}
  }),
  actions: {
    readAll() {
    }
  }
})