<template>
  <task-view task-number="2">
    <v-app-bar background-color="deep-purple accent-4 " prominent>
      <template v-slot:extension>
        <v-tabs centered>
          <v-tab disabled>Новости</v-tab>
          <v-tab to="editsurveys">Опросы</v-tab>
          <v-tab disabled>Материалы</v-tab>
          <v-tab disabled>Сценарий</v-tab>
          <v-tab disabled>Назначение</v-tab>
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
