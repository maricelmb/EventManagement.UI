import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { Activity } from "../activity";
import agent from "../../api/agent";

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    // makeObservable(this, {
    //   title: observable,
    //   setTitle: action,
    // });

    makeAutoObservable(this);
  }

  //action
  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity: Activity) => {
        activity.date = activity.date.split("T")[0]; //Exclude the time which is after the 'T'
        this.activities.push(activity); //mutate --> not adivisable in Redux
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);      
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(a => a.id === id);
  }

  cancelSelectActivity = () => {
    this.selectedActivity = undefined;
  }

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectActivity();
    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }
}
