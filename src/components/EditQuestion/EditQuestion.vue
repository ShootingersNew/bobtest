<template>
  <div>
    <v-divider></v-divider>
    <v-text-field
      class="mt-3 mb-3 editQuestion__title"
      v-model="editQuestion.title"
    ></v-text-field>
    <v-divider></v-divider>
    <v-select
      :items="editQuestion.types"
      v-model="editQuestion.type"
      item-text="title"
      item-value="id"
    ></v-select>
    {{ editQuestion }}
    <v-list>
      <v-list-item
        class="editQuestion__answer"
        :key="idx"
        v-for="(item, idx) in editQuestion.answers"
      >
        {{ idx + 1 }})
        <v-text-field
          class="editQuestion__answerTitle"
          v-model="editQuestion.answers[idx].title"
        ></v-text-field>
        <template v-if="editQuestion.type === 'one'">
          <v-radio-group v-model="editQuestion.correctAnswers[0]">
            <v-radio :value="item.id"></v-radio>
          </v-radio-group>
        </template>
        <template v-else>
          <v-checkbox
            v-model="editQuestion.correctAnswers"
            :value="item.id"
          ></v-checkbox>
          <v-btn class="editQuestion__removeAnswer">delete</v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>
<script src="./EditQuestion.ts"></script>
