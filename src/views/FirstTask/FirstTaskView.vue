<template>
  <task-view task-number="1">
    <edit-question :submit-func="getQuestionContent"></edit-question>
    <div v-if="content" class="mt-5">
      <div class="title">Получен объект</div>
      {{ content }}
    </div>
  </task-view>
</template>
<script src="./FirstTaskView.ts"></script>
