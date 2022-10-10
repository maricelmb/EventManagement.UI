import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Activity } from "../activity";
import agent from "../../api/agent";

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | null = null;
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
    this.loadingInitial = true;

    try{
      const activities = await agent.Activities.list();

      activities.forEach((activity:Activity) => {
        activity.date = activity.date.split("T")[0]; //Exclude the time which is after the 'T'
        this.activities.push(activity); //mutate --> not adivisable in Redux
      });

      this.loadingInitial = false;
    } catch (error)
    {
      console.log(error);
      this.loadingInitial = false;
    }
  }
 
}
