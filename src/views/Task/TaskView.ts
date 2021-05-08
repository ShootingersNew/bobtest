import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "TaskView",
})
export default class TaskView extends Vue {
  @Prop({ default: 1 }) readonly taskNumber!: number;
}
