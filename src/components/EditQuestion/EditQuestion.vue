<template>
  <v-form class="editQuestion">
    <button @click="removeAnswer(0)"></button>
    <div class="editQuestion__content">
      <v-row no-gutters align="baseline" class="mt-5">
        <v-col class="title mr-3 editQuestion__subtitle" cols="1"
          >Вопрос:</v-col
        >
        <v-text-field
          solo
          class="editQuestion__title"
          v-model="editQuestion.title"
          clearable
        ></v-text-field>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters class="mt-5" align="baseline">
        <v-col class="title mr-3 editQuestion__subtitle" cols="1"
          >Тип вопроса:</v-col
        >
        <v-select
          solo
          :items="editQuestion.types"
          v-model="editQuestion.type"
          item-text="title"
          item-value="id"
          @change="editQuestion.correctAnswers = []"
        ></v-select>
      </v-row>
      <div class="title">Ответы:</div>
      <v-list>
        <v-list-item
          class="editQuestion__answer pl-1"
          :key="idx"
          v-for="(item, idx) in editQuestion.answers"
        >
          <div class="title mr-3">{{ idx + 1 }})</div>
          <v-text-field
            class="editQuestion__answerTitle mb-0"
            hide-details
            solo
            v-model="editQuestion.answers[idx].title"
          ></v-text-field>
          <div class="ml-3 d-flex align-center">
            <div class="editQuestion__checkboxWrapper">
              <div v-if="idx === 0" class="editQuestion__checkboxHeader">
                Верный
              </div>
              <template v-if="editQuestion.type === 'one'">
                <v-radio-group
                  class="mx-5"
                  v-model="editQuestion.correctAnswers[0]"
                >
                  <v-radio color="red accent-2" :value="item.id"></v-radio>
                </v-radio-group>
              </template>
              <template v-else>
                <v-checkbox
                  class="mx-5"
                  v-model="editQuestion.correctAnswers"
                  :value="item.id"
                ></v-checkbox>
              </template>
            </div>
            <v-btn
              class="editQuestion__removeAnswer"
              @click="removeAnswer(item.id)"
              fab
              x-small
              color="grey"
              dark
              depressed
            >
              <v-icon> mdi-minus </v-icon>
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
      <v-btn
        class="editQuestion__addAnswer ml-3"
        @click="addAnswer"
        fab
        dark
        color="red accent-2"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </div>
    <v-row class="editQuestion__bottomPanel mt-3" justify="center">
      <v-btn
        class="editQuestion__submit submit"
        @click="submitForm"
        dark
        width="300px"
        large
        color="red accent-2"
        >Готово</v-btn
      >
    </v-row>
  </v-form>
</template>
<style>
.editQuestion__subtitle {
  width: 100px;
}
.editQuestion__checkboxHeader {
  position: absolute;
  top: -30px;
  color: gray;
}
.editQuestion__checkboxWrapper {
  position: relative;
}
.editQuestion__removeAnswer {
  height: 22px !important;
  width: 22px !important;
}
</style>
<script lang="ts">
import { AnswerModel } from "@/models/AnswerModel";
import { QuestionModel } from "@/models/QuestionModel";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class EditQuestion extends Vue {
  @Prop({
    required: false,
  })
  private question: QuestionModel;

  @Prop({})
  submitFunc?: (obj: QuestionModel) => void;
  editQuestion: QuestionModel = new QuestionModel({
    correctAnswers: [],
    type: "one",
  });

  created(): void {
    this.question &&
      (this.editQuestion = JSON.parse(JSON.stringify(this.question)));
  }

  removeAnswer(id: number): void {
    const filteredAnswers = this.editQuestion.answers
      ?.filter((answer) => answer.id !== id)
      .map((x, idx) => {
        return new AnswerModel({ ...x, id: idx });
      });

    this.editQuestion.answers = filteredAnswers;
    this.editQuestion.correctAnswers = this.editQuestion.correctAnswers?.filter(
      (answer) => answer !== id
    );
  }

  addAnswer(): void {
    this.editQuestion.answers?.push(
      new AnswerModel({
        id: this.editQuestion.answers.length,
        title: "Плейсхолдер",
      })
    );
  }

  submitForm(): void {
    const copiedQuestion = JSON.parse(JSON.stringify(this.editQuestion));
    this.question && this.$emit("update:question", copiedQuestion);
    this.submitFunc && this.submitFunc(copiedQuestion);
  }
}
</script>
