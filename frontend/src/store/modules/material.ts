import MaterialModel from '@/models/MaterialModel';
import store from '@/store';
import api from '@/store/services/api';
import { Dictionary } from "vue-router/types/router";
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'material', store, dynamic: true })
class MaterialModule extends VuexModule {

  _materials: Dictionary<MaterialModel[]> = {};

  private _currentMaterial: MaterialModel = { ...this.getNewMaterial };

  @Action
  async fetchMaterials() {
    await api.get('/api/material/')
        .then(response => {
          this.setMaterials(response.data);
        })
        .catch(error => {
          console.log(error);
        });
  }

  get currentMaterial(): MaterialModel {
    return this._currentMaterial;
  }

  get currentMaterialType() {
    return this._currentMaterial.content_type;
  }

  get currentMaterialUrl() {
    if (this.currentMaterialType === 'video') {
      return this._currentMaterial.content;
    }
    return undefined;
  }

  get getNewMaterial(): MaterialModel {
    return {
      id: NaN,
      lesson: NaN,
      name: '',
      content_type: '',
      content: '',
      is_teacher_only: false,
    };
  }

  @Mutation
  setMaterials(payload: Dictionary<MaterialModel[]>) {
    this._materials = payload;
  }

  @Mutation
  setCurrentMaterial(material: MaterialModel) {
    this._currentMaterial = material;
  }

  @Mutation
  changeMaterialVisibility(material: MaterialModel) {
    const curMaterial = this._materials[material.lesson].find(el => el.id === material.id);
    if (curMaterial != undefined) {
      curMaterial.is_teacher_only = material.is_teacher_only;
    }
  }

  @Action
  async patchMaterialVisibility(params: { is_teacher_only: boolean; id: number }): Promise<MaterialModel> {
    let answer = { data: {} };
    await api.patch(`/api/material/${params.id}/`, { ...params })
        .then(response => {
          answer = response;
        })
        .catch(error => {
          console.log(error);
        });
    this.changeMaterialVisibility(answer.data as MaterialModel);
    return answer.data as MaterialModel;
  }

  @Action
  async fetchMaterialById(id: number): Promise<MaterialModel> {
    let answer = { data: {} };
    await api.get(`/api/material/${id}/`)
        .then(response => answer = response)
        .catch(error => {
          console.log(error);
        });
    return answer.data as MaterialModel;
  }

  @Action
  async fetchMaterialsByLessonId(id: number): Promise<MaterialModel[]> {
    if (id in this._materials) {
      return this._materials[id];
    }

    let answer = { data: {} };
    await api.get('/api/material/', { params: { lesson_id: id } })
        .then(response => answer = response)
        .catch(error => {
          console.log(error);
        });
    const result = answer.data as Array<MaterialModel>;
    this.setMaterials({ [id]: result });
    return result;
  }
}

export default getModule(MaterialModule);
