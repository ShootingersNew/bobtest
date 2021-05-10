<template>
  <div class="editSurvey">
    <v-card>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-row>
                <v-col> <div class="title">Название:</div> </v-col>
                <v-col>
                  <v-text-field
                    solo
                    class="editSurvey__title"
                    clearable
                    v-model="formData.title"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col><div class="title">Категория опроса</div></v-col>
                <v-col
                  ><v-select
                    v-model="formData.category"
                    solo
                    :items="['Первая категория', 'Вторая категория']"
                  ></v-select></v-col></v-row
            ></v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-row class="mt-3"
                ><v-btn x-large min-width="300" @click="saveData"
                  >Сохранить</v-btn
                ></v-row
              >
              <v-row
                ><v-btn class="mt-5" x-large min-width="300" disabled
                  >Сохранить в черновик</v-btn
                ></v-row
              >
            </v-col>
          </v-row>
        </v-form></v-card-text
      >
    </v-card>
    <v-card>
      <v-list class="questionList">
        <v-toolbar height="100" color="pink" dark>
          <v-checkbox
            v-model="selectAll"
            hide-details
            class="mr-5"
          ></v-checkbox>

          <v-toolbar-title>Вопрос</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn class="questionList__add" @click="dialog = true" x-large
            >Добавить вопрос</v-btn
          >

          <v-btn
            class="questionList__delete mr-0 ml-5"
            width="36"
            height="36"
            @click="($event) => removeQuestion()"
            icon
            dark
            fab
          >
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-toolbar>
        <question
          :key="idx"
          v-for="(item, idx) in formData.questions"
          :question.sync="formData.questions[idx]"
          :checkboxes.sync="selected"
          v-on:remove="removeQuestion"
        ></question>
        <v-dialog v-if="dialog" v-model="dialog">
          <v-card min-height="700">
            <v-card-text>
              <edit-question
                :submitFunc="
                  (val) => {
                    dialog = false;
                    addNewQuestion(val);
                  }
                "
              ></edit-question></v-card-text
          ></v-card>
        </v-dialog>
      </v-list>
    </v-card>
  </div>
</template>
<style>
.questionList__add {
  position: relative;
  left: -9px;
}
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Question from "@/components/QuestionList/Question.vue";
import EditQuestion from "@/components/EditQuestion/EditQuestion.vue";
import { QuestionModel } from "@/models/QuestionModel";
import { SurveyFormModel } from "@/models/SurveyFormModel";
@Component({
  name: "EditSurvey",
  components: {
    Question,
    EditQuestion,
  },
})
export default class EditSurvey extends Vue {
  formData = new SurveyFormModel({
    questions: [
      new QuestionModel({ title: "Первый вопрос", id: 0 }),
      new QuestionModel({ title: "Второй вопрос", id: 1 }),
    ],
  });
  saveData(): void {
    alert(JSON.stringify(this.formData));
  }
  selected: number[] = [];
  selectedAllCheckbox = false;
  dialog = false;
  indeterminate = false;

  addNewQuestion(val: QuestionModel): void {
    this.formData.questions.push(
      new QuestionModel({ ...val, id: this.formData.questions.length })
    );
  }

  removeQuestion(id?: number): void {
    if (id !== undefined) {
      this.formData.questions = this.formData.questions.filter((x) => {
        return x.id !== id;
      });
      this.selected.filter((x) => x !== id);
    } else {
      this.formData.questions = this.formData.questions.filter(
        (question) => !this.selected.includes(question.id)
      );
      this.selected = [];
    }
  }
  get selectAll(): boolean {
    return this.selected.length === this.formData.questions.length;
  }
  set selectAll(val: boolean) {
    let selected: number[] = [];
    if (val) {
      this.formData.questions.forEach(function (q) {
        selected.push(q.id);
      });
    }

    this.selected = selected;
  }
}
</script>
