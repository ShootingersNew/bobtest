<template>
  <task-view task-number="2">
    <v-app-bar background-color="deep-purple accent-4 " prominent>
      <template v-slot:extension>
        <v-tabs centered>
          <v-tab>Новости</v-tab>
          <v-tab to="editsurveys">Опросы</v-tab>
          <v-tab>Материалы</v-tab>
          <v-tab>Сценарий</v-tab>
          <v-tab>Назначение</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <router-view></router-view>
  </task-view>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskView from "../Task/TaskView.vue";
@Component({
  name: "SecondTaskView",
  components: {
    TaskView,
  },
})
export default class SecondTaskView extends Vue {}
</script>
>
