<template>
  <v-app>
    <v-app-bar app color="red" dark>
      <div class="title">
        <router-link class="ml-5" to="/">Домашняя</router-link>
      </div>
      <router-link class="ml-5" to="/second/editsurveys"
        >На второе задание</router-link
      >
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
