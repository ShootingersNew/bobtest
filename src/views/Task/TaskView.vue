<template>
  <div class="taskView">
    <v-container>
      <h1 class="mr-3">Задание № {{ taskNumber }}</h1>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <slot></slot>
    </v-container>
  </div>
</template>

<script src="./TaskView.ts"></script>
