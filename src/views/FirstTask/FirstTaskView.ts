import { Component, Prop, Vue } from "vue-property-decorator";
import TaskView from "../Task/TaskView.vue";
@Component({
  components: {
    TaskView,
  },
})
export default class FirstTaskView extends Vue {}
