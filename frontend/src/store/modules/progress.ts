import UserProgress from '@/models/UserProgress';
import store from '@/store';
import { Dictionary } from "vue-router/types/router";
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Attendance from "@/models/Attendance";
import api from "@/store/services/api";

@Module({ namespaced: true, name: 'progress', store, dynamic: true })
class ProgressModule extends VuexModule {

  lessonProgress: Dictionary<UserProgress[]> = {};
  courseProgress: Dictionary<UserProgress[]> = {};

  @Mutation
  setProgress(payload: Dictionary<UserProgress[]>) {
    this.lessonProgress = payload;
  }

  @Mutation
  setCourseProgress(payload: Dictionary<UserProgress[]>) {
    this.courseProgress = payload;
  }

  @Action
  async fetchLessonProgressByLessonId(id: number): Promise<UserProgress[]> {
    if (id in this.lessonProgress) {
      return this.lessonProgress[id];
    }

    let answer = { data: {} };
    await api.get('/api/lessonprogress/', { params: { lesson_id: id } })
      .then(response => answer = response)
      .catch(error => {
        console.log(error);
      })
    const result = answer.data as Array<UserProgress>;
    this.setProgress({ [id]: result })
    return result;
  }

  @Action
  async fetchCourseProgressById(id: number): Promise<UserProgress[]> {
    if (id in this.courseProgress) {
      return this.courseProgress[id];
    }
    let answer = { data: {} };
    await api.get('/api/courseprogress/', { params: { course_id: id } })
      .then(response => answer = response)
      .catch(error => {
        console.log(error);
      })
    const result = answer.data as Array<UserProgress>;
    this.setCourseProgress({ [id]: result })
    return result;
  }


  @Action
  async fetchAttendance(id: number): Promise<Dictionary<Attendance[]>>{
    let answer = { data: {} };
    await api.get(`/api/lessonprogress/attendance-by-course/${id}/`)
      .then(response => answer = response)
      .catch(error => {
        console.log(error);
      })
    return answer.data as Dictionary<Attendance[]>;
  }
}


export default getModule(ProgressModule);
